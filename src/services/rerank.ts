import { cosineSimilarity } from "../utils/cosinesimilarity";

function textToVector(text: string): number[] {
    return Array.from(text, char => char.charCodeAt(0));
}

export function rerankFacts(
    claim: string,
    facts: string[]
) {
    const claimVector = textToVector(claim);

    return facts
        .map(fact => ({
            fact,
            score: cosineSimilarity(claimVector, textToVector(fact))
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(item => item.fact);
}