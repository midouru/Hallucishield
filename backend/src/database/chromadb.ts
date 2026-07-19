import { CloudClient } from "chromadb";
import { debug } from "../utils/logger";

export const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY || "",
  tenant: process.env.CHROMA_TENANT || "718320cb-7fea-4c47-afde-7407f7aa9060",
  database: process.env.CHROMA_DATABASE || "Hallucishield"
});

export async function getFactsCollection() {
    return await client.getOrCreateCollection({
        name: "hallucishield_facts",
        metadata: { "hnsw:space": "cosine" }
    });
}
// chromadb.ts — add this
export async function resetFactsCollection() {
    try {
        await client.deleteCollection({ name: "hallucishield_facts" });
        debug("Old collection deleted.");
    } catch (e) {
        debug("No existing collection to delete, skipping.");
    }
}