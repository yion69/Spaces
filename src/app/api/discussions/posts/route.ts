import { BlogModel } from "@/app/models/blog-model";
import connectDb_Notes from "../../notes/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get("id");
        
        await connectDb_Notes();
        const blog = BlogModel;
        const result = await blog.findById(id);

        return NextResponse.json({
            action_complete: true,
            message: "Blog Retrieved Successfully",
            body: result
        },{ status: 200})
    } catch (error) {
        return NextResponse.json({ 
            action_complete: false,
            error: error
        },{ status: 505 })
    }
}