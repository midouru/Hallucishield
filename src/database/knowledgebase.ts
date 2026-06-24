import fs from "fs";
import path from "path";
import {getFactsCollection} from "./chromadb";

import {generateEmbeddings} from "../services/embeddingservice";

export async function loadKnowledgeBase() {
    const collection = await getFactsCollection();
    const knowledgePath =  path.join(process.cwd(), "src","knowledgebase");
    const files = fs.readdirSync(knowledgePath);


    let idCounter = 0;
    for(const file of files){
        const filePath = path.join(knowledgePath, file);

        const content = fs.readFileSync(
            filePath,
            "utf-8"
        );

        const chunks = content.split("\n").map(line => line.trim()).filter(Boolean);

        for(const chunk of chunks){
            const embedding = await generateEmbeddings(chunk);

            await collection.add({
                ids: [String(idCounter++)],
                documents: [chunk],
                embeddings: [embedding],
                metadatas: [{
                    source: file
                }]
            });

            console.log("Loaded:", chunk);
        }
    }
    console.log("Knowledge base loaded successfully.");
}
