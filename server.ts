import app from './app';
import { loadFactEmbeddings } from './knowledge/factembeddings';

async function startServer() {
    await loadFactEmbeddings();
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}   
startServer();
process.stdin.resume();