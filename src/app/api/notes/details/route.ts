import NoteModel from "@/app/models/note-model";
import { NextRequest, NextResponse } from "next/server";
import connectDb_Notes from "../dbconnect";

export const POST = async (req:NextRequest) => {
    try {

        const body = await req.json();
        const { _id } = body;

        await connectDb_Notes();
        

        if(!_id) {
            return NextResponse.json({
                action_completed: false,
                error: `Note ID Error`,
            }, { status: 400 })
        }

        const result = await NoteModel.findById(_id); 
        
        if(!result) {
            return NextResponse.json({
                action_completed: false,
                error: `Note ID not found`,
            }, { status: 404 })
        }

        return NextResponse.json({
            action_complete: true,
            message: "Successfully fetched data",
            body: result
        },{ status: 200 })

    } catch (error) {
        NextResponse.json({ 
            action_complete: false,
            error: error
        },{ status: 504 })
    }
}

export const PATCH = async (req: NextRequest) => {

    const id = req.nextUrl.searchParams.get("id");
    const body = await req.json();
    const { note_content } = body;
    try {
        await connectDb_Notes();

        const updatedBlog = await NoteModel.findByIdAndUpdate(
            id,
            { $set: { note_content }},
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return NextResponse.json(
                { success: false, message: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Note Updated successfully", body: updatedBlog },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to update note", error: error},
            { status: 500 }
        );
    }
};