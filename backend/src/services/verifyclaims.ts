import { generateEmbeddings } from "./embeddingservice";
import { getFactsCollection } from "../database/chromadb";
import { cosineSimilarity } from "../utils/cosinesimilarity";
import { judgeClaim } from "./judgeclaims";
import { rerankFacts } from "./rerank";
import { normalizeClaim } from "./groqservice";
import { config } from "../config/config";
import { debug } from "../utils/logger";

export async function verifyclaims(claims: any[]) {

    if (!Array.isArray(claims) || claims.length === 0) {
        return [];
    }

    const collection = await getFactsCollection();

    const results = await Promise.all(

        claims.map(async (claimObj) => {

            if (
                !claimObj ||
                typeof claimObj.claim !== "string"
            ) {
                return null;
            }

            const normalizedClaim =
                await normalizeClaim(
                claimObj.claim
            );

           debug("Claim Normalization",{
            original: claimObj.claim,
            normalized: normalizedClaim
            });;

            // STEP 1: Generate embedding
            const claimEmbedding =
                await generateEmbeddings(
                    normalizedClaim
                );

            // STEP 2: Retrieve similar facts
            const queryResult =
                await collection.query({
                    queryEmbeddings: [
                        claimEmbedding
                    ],
                    nResults: config.TOP_K,
                });

            const docs =
                queryResult.documents?.[0] ?? [];

            const distances =
                queryResult.distances?.[0] ?? [];
            const metadatas = queryResult.metadatas?.[0] ?? [];

            // DEBUG
            console.log(
                docs.map((fact, i) => ({
                    fact,
                    source: metadatas[i]?.source,
                    distance: distances[i]
                }))
            );

            // STEP 3: Keep only highly relevant facts
            const filteredFacts =
                docs.filter((fact, index) => {

                    const distance =
                        distances[index];

                    return (
                        fact &&
                        typeof fact === "string" &&
                        typeof distance === "number" &&
                        distance < config.SIMILARITY_THRESHOLD
                    );

                }) as string[];

            if (filteredFacts.length === 0) {

                return {

                    claim: claimObj.claim,
                    type: claimObj.type,

                    verified: false,

                    confidence: 0,

                    evidence: null,

                    matchedFact: [],

                    auditTrail: {
                        verificationMethod:
                            "chromadb_vector_search",

                        rejectionReason:
                            "No relevant evidence found",

                        timestamp:
                            new Date().toISOString()
                    }
                };
            }
            const topFacts =
            rerankFacts(
                normalizedClaim,
                filteredFacts
            );
            // STEP 3.5: Attach sources to evidence

            const evidenceObjects =
                topFacts.map(fact => {

                const index =
                    docs.indexOf(fact);

                return {

                    fact,

                    source:
                     metadatas[index]?.source ??
                        "unknown"
                };
            });

            // STEP 4: Build evidence
            const evidence =
                topFacts.join("\n");

            const similarities =
                await Promise.all(
                    topFacts.map(async fact => {

                const emb =
                    await generateEmbeddings(fact);

                return cosineSimilarity(
                    claimEmbedding,
                    emb
                );

            })
    );

const similarity =
    Math.max(...similarities);

            // STEP 6: Judge claim
            const verified =
            await judgeClaim(
                normalizedClaim,
                evidence
            );
           

            // STEP 7: Return result
            return {

                claim: claimObj.claim,
                normalizedClaim: normalizedClaim,

                type: claimObj.type,

                verified,

                confidence:
                    verified
                        ? Number(similarity.toFixed(2))
                        : 0,

                evidence : evidenceObjects,

                

                matchedFact:
                    evidenceObjects,

                auditTrail: {
                    verificationMethod:
                        "chromadb_vector_search + llm_judge",

                    threshold: config.SIMILARITY_THRESHOLD,

                    timestamp:
                        new Date().toISOString()
                }
            };
        })
    );

    return results.filter(Boolean);
}