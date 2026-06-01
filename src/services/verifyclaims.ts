import { generateEmbeddings } from './embeddingservice';
import { cosineSimilarity } from '../utils/cosinesimilarity';
import { getEmbeddedFacts } from '../knowledge/factembeddings';
 
export async function verifyclaims(claims: any[]) {
    if (!Array.isArray(claims) || claims.length === 0) {
        return [];
    }
 
    const embeddedFacts = getEmbeddedFacts(); // fetch once, outside the loop
 
    // Generate all claim embeddings in parallel instead of one-by-one
    const claimEmbeddings = await Promise.all(
        claims.map((claimObj) => generateEmbeddings(claimObj.claim))
    );
 
    return claimEmbeddings.map((claimEmbedding, i) => {
        const claimObj = claims[i];
 
        let bestMatch = null;
        let highestSimilarity = -1;
 
        for (const factItem of embeddedFacts) {
            const similarity = cosineSimilarity(claimEmbedding, factItem.embedding);
            if (similarity > highestSimilarity) {
                highestSimilarity = similarity;
                bestMatch = factItem;
            }
        }
 
        return {
            claim: claimObj.claim,
            type: claimObj.type,
            verified: highestSimilarity > 0.75,
            confidence: Number(highestSimilarity.toFixed(2)),
            matchedFact: bestMatch,
        };
    });
}
