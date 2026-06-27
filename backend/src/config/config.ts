import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: Number(process.env.PORT) || 3000,

    MODEL:
        process.env.MODEL ||
        "llama-3.3-70b-versatile",

    TOP_K:
        Number(process.env.TOP_K) || 10,

    SIMILARITY_THRESHOLD:
        Number(process.env.SIMILARITY_THRESHOLD) || 0.4,

    MAX_CONTEXT:
        Number(process.env.MAX_CONTEXT) || 10,

    DEBUG:
        process.env.DEBUG === "true",

    GROQ:
        process.env.GROQ || ""
};