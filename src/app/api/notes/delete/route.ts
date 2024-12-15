import NoteModel from "@/app/models/note-model";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "../dbconnect";

export const POST = async (req:NextRequest) => {
    try {
        await connectDb();
        
        const body = await req.json();
        const { _id } = body;

        if(!_id) { return NextResponse.json({ action_completed: false, error: "ID not found"},{ status: 400 })};

        const result = await NoteModel.deleteOne({ _id: _id});
        
        if ( result.deletedCount === 0 ) {
            return NextResponse.json({
                action_complete: false,
                error: "ID not found in the database"
            },{ status: 404 })
        }

        return NextResponse.json({
            action_complete: true,
            message: "Successfully Deleted"
        })
    
    } catch (error) {
        return NextResponse.json({
            action_complete: false,
            error: error
        })
    }
}