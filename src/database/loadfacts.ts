import facts from "../knowledge/facts.json";
import { getFactsCollection } from "./chromadb";
import { generateEmbeddings } from "../services/embeddingservice";

export async function loadFactstoChroma() {
    const collection = await getFactsCollection();

    for( let i = 0;i<facts.length;i++){
        const fact = facts[i];
        const embedding = await generateEmbeddings(fact.fact);

        await collection.upsert({
            ids : [`facts-${i}`],
            documents: [fact.fact],
            embeddings: [embedding]
        })
    }

    console.log("Facts loaded into ChromaDB successfully.");
}
