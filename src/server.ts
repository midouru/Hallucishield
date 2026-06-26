import app from './app';
import { resetFactsCollection } from './database/chromadb';
import dotenv from "dotenv";
import { loadKnowledgeBase }
from "./database/knowledgebase";
import {config} from "./config/config";

dotenv.config();

async function startServer() {
    
    await resetFactsCollection();
    /*await loadFactstoChroma();*/
    await loadKnowledgeBase();
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
}   

startServer();
process.stdin.resume();