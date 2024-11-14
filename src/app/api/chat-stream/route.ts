import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

export const POST = async (req:NextRequest) => {
    const { message } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = message;

    const result = await model.generateContent(prompt);

    return result;
}