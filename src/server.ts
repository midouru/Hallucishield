import app from './app';
/*import { loadFactEmbeddings } from './knowledge/factembeddings';*/
import { loadFactstoChroma } from './database/loadfacts';

async function startServer() {
    /*await loadFactEmbeddings();*/
    await loadFactstoChroma();
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}   
startServer();
process.stdin.resume();
