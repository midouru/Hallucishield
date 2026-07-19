import { judgeClaim } from "./judgeclaims";
import { normalizeClaim } from "./groqservice";
import { config } from "../config/config";
import { debug } from "../utils/logger";
import { retrieveHybrid } from "../retrieval/hybridretrieval";
import { cleanEvidence } from "../utils/evidencecleaner";
import { filterRelevantEvidence } from "../utils/evidencefilter";

export async function verifyclaims(claims: any[], evidencepool: any[]) {

    if (!Array.isArray(claims) || claims.length === 0) {
        return [];
    }

   

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

           /* // STEP 1: Generate embedding
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
            const metadatas = queryResult.metadatas?.[0] ?? [];*/
            // ⭐ CHANGED - Retrieve evidence from BOTH Chroma + Web
const evidenceCandidates = filterRelevantEvidence(
    normalizedClaim,
    evidencepool,
    5
);

// ⭐ CHANGED - Rank evidence
// For now we prefer web evidence first.
// Later we'll replace this with semantic reranking.
const rankedEvidence = [...evidenceCandidates].sort((a, b) => {

    if (a.type !== b.type) {

        if (a.type === "web") return -1;

        if (b.type === "web") return 1;
    }

    return (a.distance ?? 0) - (b.distance ?? 0);

});

// ⭐ CHANGED - Keep only the best evidence
const topEvidence = rankedEvidence.slice(0, 5);
const cleanedEvidence = topEvidence.map(doc => ({
    ...doc,
    text: cleanEvidence(doc.text)
})).filter(doc => doc.text.length > 40);

// ⭐ CHANGED - Debug
debug(
    "TOP EVIDENCE",
    cleanedEvidence.map(doc => ({
        source: doc.source,
        type: doc.type,
        preview: doc.text.substring(0, 120)
    }))
);

// ⭐ CHANGED - Build evidence string for judge
const evidence = cleanedEvidence
    .map(doc => doc.text)
    .join("\n\n");

// ⭐ CHANGED - Objects returned to frontend
const evidenceObjects = cleanedEvidence.map(doc => ({
    fact: doc.text,
    source: doc.source,
    type: doc.type
})).filter(e => e.fact.length > 40);

// ⭐ Dynamic confidence based on retrieval distance



            // STEP 6: Judge claim
            const verified = await judgeClaim(normalizedClaim, evidence);
            // Calculate confidence here
let confidence = 80;

if (!verified) {
    confidence = 0;
} else if (topEvidence.some(e => e.type === "web")) {
    confidence = 92;
} else if ((topEvidence[0]?.distance ?? 1) < 0.15) {
    confidence = 95;
} else {
    confidence = 80;
}
            let finalEvidence = evidenceObjects;

            if (!verified) {

                finalEvidence = evidenceObjects.filter(e =>
                e.fact.toLowerCase().includes(
                 normalizedClaim.split(" ")[0].toLowerCase()
                )
            );          

            if (finalEvidence.length === 0) {
                finalEvidence = [{
                    fact: "No supporting evidence found.",
                    source: "HalluciShield",
                    type: "system"
            }];
        }
    }
           

            // STEP 7: Return result
            return {

                claim: claimObj.claim,
                normalizedClaim: normalizedClaim,

                type: claimObj.type,

                verified,

                confidence: verified ? confidence: 0,

                evidence : evidenceObjects,
                
                

                matchedFact:
                    finalEvidence,

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