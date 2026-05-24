import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const getSkillsFromDescription = async (description) => {
    try {
        const prompt = `
            You are a skill extraction AI.
            Extract technical and professional skills from the following job description.

            Return ONLY a valid JSON array.
            Example: ["React", "Node.js", "MongoDB"]
            Do not return explanation or markdown.

            Job Description: ${description}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text;
        let skills = [];

        try {
            skills = JSON.parse(text);
            if (!Array.isArray(skills)) {
                skills = [];
            }
        }catch {
            skills = [];
        }

        return skills;

    }catch (error) {
        console.log("Skill extraction error:", error);
        return [];
    }
};