import { generateGroqResponse }
from "./groqservice";
import { debug }
from "../utils/logger";

export async function judgeClaim(
    claim: string,
    fact: string
): Promise<boolean> {

    const prompt = `
You are an expert factual verification engine.

Your task is to determine whether the claim is supported by the provided evidence.

Rules:

1. Use ONLY the provided evidence.
2. Do NOT use outside knowledge.
3. Semantic equivalence counts as TRUE.
4. Different wording with the same meaning counts as TRUE.
5. Minor wording differences do NOT make a claim false.
6. Return FALSE only if:
   - the evidence contradicts the claim
   - or the evidence does not support the claim.

Claim:
${claim}

Evidence:
${fact}

Think carefully.

Determine whether the evidence SUPPORTS the claim.

Equivalent wording should be considered TRUE.

Return ONLY JSON.

{
  "verified": true,
  "reason": "short explanation"
}

or

{
  "verified": false,
  "reason": "short explanation"
}
`;

    try {

        const response =
            await generateGroqResponse(
                prompt
            );

        if (response === null) {
            throw new Error("Empty response from groq service");
        }

        debug("Judge Response", response);

        const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const parsed = JSON.parse(cleaned);

        return (
            parsed.verified === true
        );

    } catch (error) {

        console.error(
            "Judge Error:",
            error
        );

        return false;
    }
}
