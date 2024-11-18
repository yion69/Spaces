import NoteModel from "@/app/models/note-model";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "./dbconnect";
import { json } from "stream/consumers";

export const POST = async (req:NextRequest) => {
    try {

        await connectDb();
        
        const body = await req.json();
        const { note_author, note_name, note_content } = body;
        
        if(!note_name || !note_content || !note_author) {

            return NextResponse.json({
                action_completed: false,
                error: `Missing required fields`,
            }, { status: 400 })
        }

        const note = await new NoteModel({ 
            note_author: note_author, 
            note_name: note_name, 
            note_content:note_content
        });

        const noteSave = await note.save();

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

export const GET = async () => {
    try {
        await connectDb();
        const note = NoteModel;
        const result = await note.find();

        return NextResponse.json({
            action: "fetch all note",
            action_completed: true,
            body: result
        })

    } catch (error) {
        return NextResponse.json({
            action: "fetch all note",
            action_completed: false,
            error: error
        },{ status: 505 })
    }
}