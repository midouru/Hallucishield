import express from 'express';
import { generateResponse } from '../services/ollamaservice';
import { extractClaims } from '../services/claimextracter';
import { verifyclaims } from '../services/verifyclaims';
 
const router = express.Router();
 
router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;
 
        const llmresponse = await generateResponse(prompt);
        const claims = await extractClaims(llmresponse);
        const verifiedclaims = await verifyclaims(claims);
 
        res.json({
            success: true,
            response: llmresponse,
            claims: verifiedclaims
        });
    } catch (error: any) 
    {

        console.error("Generate Route Error:", error);

        res.status(500).json
        ({

            success: false,

            error: error?.message ||
                "Unknown server error",

            timestamp: new Date().toISOString()
        });
    }
});
 
export default router;
