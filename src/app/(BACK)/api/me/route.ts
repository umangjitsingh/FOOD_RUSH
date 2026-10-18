import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import connectDb from "@/app/(BACK)/config/db";
import User from "@/app/(BACK)/models/user.model";

export const GET = async (req: NextRequest) => {
    try{
       await connectDb();
        const mySession = await auth();
        console.log("mySession--->", mySession);

        if(!mySession || !mySession.user){
            return  NextResponse.json({message:"Unauthorized"}, {status: 400});
        }

        const user=await User.findOne({email: mySession.user.email});
        if(!user){
            return  NextResponse.json({message:"User not found"}, {status: 400});
        }

        return  NextResponse.json({user}, {status: 200});

    }catch (e) {
        console.log("e--->", e);
        return  NextResponse.json({message:"Internal Server Error"}, {status: 500});
    }
}