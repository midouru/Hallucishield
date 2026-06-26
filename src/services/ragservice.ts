import { getFactsCollection } from '../database/chromadb';
import { generateEmbeddings } from './embeddingservice';
import { config } from '../config/config';
import { debug } from '../utils/logger';

export async function retrieveContext(
    query: string,
){
    const collection = await getFactsCollection();

    const queryEmbedding = await generateEmbeddings(query);

    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: config.TOP_K,

    })


    debug("RAG Query", query);

    debug("Retrieved Documents",
        results.documents?.[0]?.map((doc,i)=>({
            doc,
            source: results.metadatas?.[0]?.[i]?.source,
            distance: results.distances?.[0]?.[i]
        })));

    return results.documents?.[0] || [];
}