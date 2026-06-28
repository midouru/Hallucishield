
import { generateGroqResponse }
from "./groqservice";

export async function extractClaims(
    question: string,
    answer: string
) {

    const prompt = `
You are extracting factual claims.

Question:
${question}

Answer:
${answer}

Convert the answer into complete factual claims.

Example:

Question:
Who founded Amazon?

Answer:
Jeff Bezos

Output:
[
 {
   "claim":"Amazon was founded by Jeff Bezos",
   "type":"founding"
 }
]

Return ONLY JSON.
`;

    try {

        const response =
            await generateGroqResponse(
                prompt
            );

        if (response === null) {
            return [];
        }

        const parsed = JSON.parse(response);

        return Array.isArray(parsed)
            ? parsed
            : [parsed];

    } catch (error) {

        console.error(
            "Claim Extraction Error:",
            error
        );

        return [];
    }
}

