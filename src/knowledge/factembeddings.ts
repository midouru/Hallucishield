import facts from "./facts.json";
import { generateEmbeddings } from "../services/embeddingservice";

let embeddedFacts: any[] = [];

export async function loadFactEmbeddings() {
    embeddedFacts = await Promise.all(
        facts.map(async (factitem: any) => ({
            ...factitem,
            embedding: await generateEmbeddings(factitem.fact)
        }))
    );

    console.log("Fact embeddings loaded successfully.");
}

export function getEmbeddedFacts() {
    return embeddedFacts;
}