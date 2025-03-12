import { NextRequest, NextResponse } from "next/server";
import connectDb_Notes from "../notes/dbconnect";
import { BlogModel } from "@/app/models/blog-model";

export const POST = async (req:NextRequest) => {
    try {

        await connectDb_Notes();
        
        const body = await req.json();
        const { 
            req_author,
            req_title,
            req_content,
            req_tag,
            req_upvotes,
            req_comments
         } = body.blog_data;

        if(!req_author || !req_title || !req_content || !req_tag || !req_upvotes || !req_comments) {
            return NextResponse.json({
                action_completed: false,
                error: `Missing required fields`,
            }, { status: 400 })
        }

        const blog = await new BlogModel({
            blog_author: req_author,
            blog_title: req_title,
            blog_content: req_content,
            blog_tag: req_tag,
            blog_upvotes: req_upvotes,
            blog_comments: req_comments
        })

        const blogSave = await blog.save();

        return NextResponse.json({
            action_complete: true,
            message: "Blog created successfully"
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
        await connectDb_Notes();
        const blog = BlogModel;
        const result = await blog.find();

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