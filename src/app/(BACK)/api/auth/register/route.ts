import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/app/(BACK)/config/db";
import User from "@/app/(BACK)/models/user.model";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
    try {
await connectDb();
const {name,email,password}=await req.json();
if(!name || !email || !password){
    return NextResponse.json({message: "Missing required fields"}, {status: 400});
}

let user=await User.findOne({email});
 if(user){
     return NextResponse.json({message: "User already exists"}, {status: 400});
 }

 if(password.length<6){
     return NextResponse.json({message: "Password must be at least 6 characters long"}, {status: 400});
        }
 const hashedPassword=await bcrypt.hash(password,10);

 user=await User.create({name,email,password:hashedPassword});

return NextResponse.json({message: "Successfully registered",user},{status: 200});
    } catch (err) {
return NextResponse.json({message: "Failed to register"}, {status: 500});
    }
}