import { getFactsCollection } from "../database/chromadb";
import { generateEmbeddings } from "./embeddingservice";
import { config } from "../config/config";
import { debug } from "../utils/logger";

export async function retrieveContext(query: string) {

    const collection = await getFactsCollection();

    const queryEmbedding =
        await generateEmbeddings(query);

    const results =
        await collection.query({

            queryEmbeddings: [
                queryEmbedding
            ],

            nResults:
                config.TOP_K
        });

    const docs =
        results.documents?.[0] ?? [];

    const metadatas =
        results.metadatas?.[0] ?? [];

    const distances =
        results.distances?.[0] ?? [];

    const retrievedDocs =
        docs.map((doc, i) => ({

            // ⭐ document text
            text: doc,

            // ⭐ original source file
            source:
                metadatas[i]?.source ?? "local",

            // ⭐ vector distance
            distance:
                distances[i] ?? 1,

            type: "local"
        }));

    debug("RAG QUERY", query);

    debug("RETRIEVED DOCUMENTS", retrievedDocs);

    return retrievedDocs;
}