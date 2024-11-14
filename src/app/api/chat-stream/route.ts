import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

export const POST = async (req:NextRequest) => {
    const { message, session_id } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);

    return result
}