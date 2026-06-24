import app from './app';
import { resetFactsCollection } from './database/chromadb';
import dotenv from "dotenv";
import { loadKnowledgeBase }
from "./database/knowledgebase";

dotenv.config();

async function startServer() {
    
    await resetFactsCollection();
    /*await loadFactstoChroma();*/
    await loadKnowledgeBase();
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}   

startServer();
process.stdin.resume();