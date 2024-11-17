import NoteModel from "@/app/models/note-model";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "../dbconnect";

export const POST = async (req:NextRequest) => {
    try {

        const body = await req.json();
        const { _id } = body;

        await connectDb();
        

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