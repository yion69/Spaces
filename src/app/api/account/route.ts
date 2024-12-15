import { NextRequest, NextResponse } from "next/server";
import connectDb from "../notes/dbconnect";
import UserModel from "@/app/models/user-model";
import bcrypt from "bcrypt";

export const POST = async (req:NextRequest) => {
    try {

        await connectDb();
        
        const body = await req.json();
        const { user_data } = body;
        
        if(!user_data) {

            return NextResponse.json({
                action_completed: false,
                error: `Missing required fields`,
            }, { status: 400 })
        }

        // Hash the current password for bcrypt comparasion
        const hashedPassword = await bcrypt.hash(user_data.password, 10);

        const user = await new UserModel({
            user_username: user_data.username,
            user_email: user_data.email,
            user_password: hashedPassword,
            user_avatar: user_data.avatar           
        });

        const userSave = await user.save();

        return NextResponse.json({
            action_complete: true,
            message: "Account created successfully"
        },{ status: 200 })

    } catch (error) {
        NextResponse.json({ 
            action_complete: false,
            error: error
        },{ status: 504 })
    }
}

export const GET = async (req:NextRequest) => {
 
    try{
        await connectDb();
        const queryParams = req.nextUrl.searchParams;
        const user_email = queryParams.get("email");
        
        const result = await UserModel.findOne({ user_email: user_email }).exec();

        if(!result) { return NextResponse.json({ action_completed: false, error: "user not found", email:user_email})};

        return NextResponse.json({
            action_completed: true,
            body: result
        })

    } catch(error) {
        return NextResponse.json({
            error: error,
            action_completed: false,
        })
    }



}