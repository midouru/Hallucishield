import axios from  "axios";
export async function generateEmbeddings(text: string) {
    const response = await axios.post("http://localhost:11434/api/embeddings", {
        model: 'nomic-embed-text',
        prompt: text
    });

    const embedding = response.data.embedding;

    if (!embedding || embedding.length === 0) {
        throw new Error(`Embedding returned empty for: "${text}"`);
    }

    return embedding;
}