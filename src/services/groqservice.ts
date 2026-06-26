import Groq from "groq-sdk";
import dotenv from "dotenv";
import { config } from "../config/config";

dotenv.config();
const groq = new Groq({
    apiKey: config.GROQ
});

export async function generateGroqResponse(
    prompt: string
) {
    const completion =
        await groq.chat.completions.create({
            model: config.MODEL,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

    return completion.choices[0].message.content;
}

export async function normalizeClaim(
    claim: string
): Promise<string> {

    const completion =
        await groq.chat.completions.create({

        model: config.MODEL,

        temperature: 0,

        messages: [

            {
                role: "system",

                content: `
You are an AI claim normalization engine.

Your task is to rewrite factual claims into a canonical form for semantic retrieval.

Rules:

- Preserve meaning exactly.
- Do not add or remove facts.
- Use active voice whenever possible.
- Normalize ownership into:
  "X is owned by Y"

- Normalize acquisitions into:
  "Company acquired Company"

- Normalize products into:
  "Company developed Product"

- Keep dates and numbers unchanged.

Return ONLY the normalized claim.
`
            },

            {
                role: "user",

                content: claim
            }

        ]

    });

    return completion
        .choices[0]
        .message
        .content!
        .trim();
}