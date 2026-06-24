import { getFactsCollection } from '../database/chromadb';
import { generateEmbeddings } from './embeddingservice';


export async function retrieveContext(
    query: string,
){
    const collection = await getFactsCollection();

    const queryEmbedding = await generateEmbeddings(query);

    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: 20,

    })

    const metadata =
    results.metadatas?.[0] ?? [];
    console.log("QUERY:", query);
    console.log(
    results.documents?.[0]?.map((doc, i) => ({
        doc,
        source: metadata[i]?.source,
        distance: results.distances?.[0]?.[i],
    }))
)
    return results.documents?.[0] || [];
}