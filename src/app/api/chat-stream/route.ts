import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

export const POST = async (req:NextRequest) => {
    
    const { message, session_id } = await req.json();

    try {
    
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const prompt = message;
    
        const result = await model.generateContent(prompt);
    
        return NextResponse.json({ 
            session: session_id, 
            message: result.response.text(), 
            metadata: result.response.usageMetadata
        });


    } catch (error) {
        console.error("ERROR:",error);

        return NextResponse.json(
            { session: session_id, error: error || "An unknown error occurred"},
            { status: 500}
        )
    }
}  