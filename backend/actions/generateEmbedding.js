import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateEmbedding = async (skills) => {
    try {
        if(!skills || (Array.isArray(skills) && skills.length === 0)){
            return [];
        }
        const text = Array.isArray(skills)? skills.join(", "): skills;
        if(!text.trim()) {
            return [];
        }
        const response = await ai.models.embedContent({
            model: "gemini-embedding-001",
            contents: text,
        });

        return response.embeddings[0].values;
    }catch (error) {
        console.log("Embedding error:", error);
        return [];
    }
};
