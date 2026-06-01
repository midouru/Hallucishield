import { ChromaClient } from "chromadb";

export const chroma = new ChromaClient();

export async function getFactsCollection() {
    return await chroma.getOrCreateCollection({
        name: "hallucishield_facts"
    });
}
