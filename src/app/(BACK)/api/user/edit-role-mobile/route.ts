import connectDb from "@/app/(BACK)/config/db";
import {NextRequest, NextResponse} from "next/server";
import User from "@/app/(BACK)/models/user.model";
import {auth} from "@/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const session = await auth();
        const {role, mobile} = await req.json();

        const user = await User.findOneAndUpdate({email: session?.user?.email as string}, {role, mobile}, {new: true});
        if (!user) {
            return new Response("User not found", {status: 404});
        }
        return NextResponse.json({user, status: 200})
    } catch (e: any) {
        return NextResponse.json({message: `Error editing role/mobile${e.message}`, status: 400})
    }
}