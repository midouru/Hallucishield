import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ
});

export async function explainClaim(
    claim: string,
    evidence: string,
    verified: boolean
): Promise<string> {

    const prompt = `
Claim:
${claim}

Evidence:
${evidence}

Verification Result:
${verified ? "TRUE" : "FALSE"}

Explain in 1-2 sentences why this claim was marked ${verified ? "TRUE" : "FALSE"}.
`;

    const response =
        await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

    return (
        response.choices[0].message.content ??
        "No explanation generated."
    );
}