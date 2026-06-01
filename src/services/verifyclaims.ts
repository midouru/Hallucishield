import { generateEmbeddings } from "./embeddingservice";
import { getFactsCollection } from "../database/chromadb";

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

            const claimEmbedding =
                await generateEmbeddings(
                    claimObj.claim
                );

            const queryResult =
                await collection.query({
                    queryEmbeddings: [
                        claimEmbedding
                    ],
                    nResults: 1
                });

            const matchedFact =
                queryResult.documents?.[0]?.[0] || null;

            const distance =
                queryResult.distances?.[0]?.[0] ?? 1;

            const confidence =
                Number(
                    (1 - distance).toFixed(2)
                );

            return {
                claim: claimObj.claim,

                type: claimObj.type,

                verified: confidence > 0.75,

                confidence,

                matchedFact,

                auditTrail: {
                    verificationMethod:
                        "chromadb_vector_search",

                    threshold: 0.75,

                    timestamp:
                        new Date().toISOString()
                }
            };
        })
    );

    return results.filter(Boolean);
}
