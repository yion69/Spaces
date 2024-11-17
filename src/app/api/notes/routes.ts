import NoteModel from "@/app/models/note-model";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "./dbconnect";

export const POST = async (req:NextRequest, res:NextResponse) => {
    try {

        await connectDb();
        
        const body = await req.json();
        const { note_author, note_name, note_content } = body;

        if(!note_name || !note_content || note_author) {
            return NextResponse.json({
                action_completed: false,
                error: "Missing required fields",
            }, { status: 400 })
        }

        const note = await new NoteModel({ 
            note_author: note_author, 
            note_name: note_name, 
            note_content:note_content
        });

        return NextResponse.json({
            action_complete: true,
            message: "Note created successfully"
        },{ status: 200 })

    } catch (error) {
        NextResponse.json({ 
            action_complete: false,
            error: error
        },{ status: 504 })
    }
}