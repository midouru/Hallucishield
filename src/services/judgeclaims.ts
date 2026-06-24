import { generateGroqResponse }
from "./groqservice";

export async function judgeClaim(
    claim: string,
    fact: string
): Promise<boolean> {

    const prompt = `
You are a strict fact checker.

Verify the claim ONLY using the provided evidence.

Rules:

- Use only the evidence.
- No external knowledge.
- No assumptions.
- No inference beyond what is explicitly stated.
- Partial matches are false.

Claim:
${claim}

Evidence:
${fact}

Return ONLY JSON:

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

        console.log(
            "JUDGE RESPONSE:",
            response
        );

        const parsed =
            JSON.parse(response);

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
