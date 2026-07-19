import { retrieveLocal } from "./localretrieval";
import { retrieveWeb } from "./webretrieval";

export async function retrieveHybrid(query: string) {

    const [localDocs, webDocs] = await Promise.all([
        retrieveLocal(query),
        retrieveWeb(query)
    ]);
    
    console.log("LOCAL DOCS");
    console.log(localDocs);

    console.log("WEB DOCS");
    console.log(webDocs);

    return [
        ...localDocs,
        ...webDocs
    ];
}
