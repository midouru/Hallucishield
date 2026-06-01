import axios from "axios";

export async function generateResponse(prompt:  string){
    try {
        const response = await axios.post(
            "http://localhost:11434/api/generate", 
            {
                model : "tinyllama",
                prompt : prompt,
                stream : false,
                options: {
                    num_ctx: 512,
                    num_predict: 50,
                    temperature: 0
                } 
            }
        );
        return response.data.response;
    }
    catch(error) {
        console.error("Error generating response:", error);
        throw new Error("Failed to generate response");
    }
}
