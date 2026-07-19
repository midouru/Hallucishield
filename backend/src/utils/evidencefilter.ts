interface Evidence {
    text: string;
    source?: string;
    distance?: number;
    type?: string;
}

const STOP_WORDS = new Set([
    "the","is","was","were","are","a","an","of","to","in","on","for",
    "and","or","by","with","from","at","as","that","this","it","be",
    "has","have","had","been","who","what","when","where","which"
]);

function extractKeywords(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 2)
        .filter(word => !STOP_WORDS.has(word));
}

export function filterRelevantEvidence(
    claim: string,
    evidencePool: Evidence[],
    topK: number = 5
): Evidence[] {

    const keywords = extractKeywords(claim);

    const ranked = evidencePool
        .map(doc => {

            const docText = doc.text.toLowerCase();

            let score = 0;

            for (const keyword of keywords) {
                if (docText.includes(keyword)) {
                    score++;
                }
            }

            // Bonus if the whole claim appears
            if (docText.includes(claim.toLowerCase())) {
                score += 5;
            }

            return {
                ...doc,
                score
            };
        })
        .sort((a, b) => b.score - a.score);

    return ranked.slice(0, topK);
}