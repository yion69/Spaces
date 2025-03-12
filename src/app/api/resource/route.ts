import { NextRequest, NextResponse } from "next/server";
import connectDb_Notes from "../notes/dbconnect";
import ResourceModel from "@/app/models/resource-model";

export const POST = async (req:NextRequest) => {
    try {

        await connectDb_Notes();
        
        const body = await req.json();
        const { resource_type, resource_author, resource_content, resource_tag } = body;
        
        if(!resource_type || !resource_author || !resource_content || !resource_tag) {

            return NextResponse.json({
                action_completed: false,
                error: `Missing required fields`,
            }, { status: 400 })
        }

        console.log(resource_type, resource_author, resource_content, resource_tag);
        const resource = await new ResourceModel({ 
            resource_author: resource_author, 
            resource_type: resource_type, 
            resource_content: resource_content,
            resource_tag: resource_tag
        });

        const resourceSave = await resource.save();

        return NextResponse.json({
            action_complete: true,
            message: "Resource Added successfully"
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
        const resource = ResourceModel;
        const result = await resource.find();

        return NextResponse.json({
            action: "Resource fetched Successfully",
            action_completed: true,
            body: result
        })

    } catch (error) {
        return NextResponse.json({
            action_completed: false,
            error: error
        },{ status: 505 })
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get("id"); 

        if (!id) {
            return NextResponse.json(
                {
                    action_completed: false,
                    message: "Resource ID is required",
                },
                { status: 400 }
            );
        }

        await connectDb_Notes();

        const result = await ResourceModel.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json(
                {   
                    action_completed: false,
                    message: "Resource not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            action: "Resource deleted successfully",
            action_completed: true,
        });
    } catch (error) {
        return NextResponse.json(
            {
                action_completed: false,
                error: error || "An error occurred",
            },
            { status: 500 }
        );
    }
};