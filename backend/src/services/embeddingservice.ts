import axios from "axios";

export async function generateEmbeddings(text: string): Promise<number[]> {
    const apiKey = process.env.JINA_API_KEY;
    if (!apiKey) {
        throw new Error("JINA_API_KEY is not set in environment variables.");
    }

    try {
        const response = await axios.post(
            "https://api.jina.ai/v1/embeddings",
            {
                model: "jina-embeddings-v3",
                task: "retrieval.passage",
                embedding_type: "float",
                input: [text]
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const embedding = response.data.data?.[0]?.embedding;

        if (!embedding || embedding.length === 0) {
            throw new Error("Empty embedding returned from Jina.");
        }

        return embedding;
    } catch (err: any) {
        console.error(
            "Jina Embedding Error:",
            err.response?.data || err.message
        );
        throw err;
    }
}