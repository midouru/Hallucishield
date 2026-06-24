import { ChromaClient } from "chromadb";

export const chroma = new ChromaClient();

export async function getFactsCollection() {
    return await chroma.getOrCreateCollection({
        name: "hallucishield_facts",
        metadata: { "hnsw:space": "cosine" }
    });
}
// chromadb.ts — add this
export async function resetFactsCollection() {
    try {
        await chroma.deleteCollection({ name: "hallucishield_facts" });
        console.log("Old collection deleted.");
    } catch (e) {
        console.log("No existing collection to delete, skipping.");
    }
}