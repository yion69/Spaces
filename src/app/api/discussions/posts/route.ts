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

export const PATCH = async (req: NextRequest) => {

    const id = req.nextUrl.searchParams.get("id");

    try {
        await connectDb_Notes();

        const { comment_author, comment_content, comment_time } = await req.json();

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            { $push: { blog_comments: {
                comment_author: comment_author, comment_content: comment_content, comment_time: comment_time
            } } },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return NextResponse.json(
                { success: false, message: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Comment added successfully", body: updatedBlog },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to add comment", error: error},
            { status: 500 }
        );
    }
};

export const PUT = async (req: NextRequest) => {

    const id = req.nextUrl.searchParams.get("id");

    const incrementBy = 1;
    try {
        await connectDb_Notes();

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            { $inc: { blog_upvotes: incrementBy }},
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return NextResponse.json(
                { success: false, message: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Like added successfully", body: updatedBlog },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to add like", error: error},
            { status: 500 }
        );
    }
};