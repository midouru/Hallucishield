import axios from 'axios';

export async function extractClaims(text: string){
     const extractionPrompt =
        `Extract factual claims from the text below. Return ONLY a JSON array, no markdown, no explanation. Each item: {"claim":"...","type":"event"}. If none, return [].
        Text: ${text}`;
    try{
        const response = await axios.post(
            'http://localhost:11434/api/generate',
            {   
                model : "tinyllama",
                prompt : extractionPrompt,
                stream : false,
                format : "json",
                options: {
                    num_ctx: 512,
                    num_predict: 50,
                    temperature: 0
                }
            }
        )
        const rawclaims =  response.data.response;
        const cleanedclaims = rawclaims
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        
        try {
            let parsed = JSON.parse(cleanedclaims);
            if (typeof parsed === 'string'){
                parsed = JSON.parse(parsed);
            }
            if (!Array.isArray(parsed)) 
            {
                parsed = [parsed];
            }
            return parsed.filter(
                (item: any) => item && typeof item.claim === 'string' && item.claim.trim() !== ''
            );
        } catch (parseError) {
            console.error("JSON parse error : ", parseError);
            return {
                raw : cleanedclaims
            }; // Return raw string if JSON parsing fails
        }
    } catch (error) {
        console.error('Error extracting claims:', error);
        throw new Error('Failed to extract claims');
    }
}