import connectDb from "@/app/(BACK)/config/db";
import User from "@/app/(BACK)/models/user.model";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import EditRoleMobile from "@/app/(FRONT)/(COMPONENTS)/EditRoleMobile";

export default async function Home() {

    await connectDb();
    const session = await auth();
    // console.log("session--->", session)
    const user = await User.findOne({ email: session?.user?.email as string });
    if(!user){
        return redirect("/login");
    }

    const INCOMPLETE = (!user.role || !user.mobile );
    if(INCOMPLETE){
        return <EditRoleMobile  />
    }

    return (
        <div
            className="flex flex-col flex-1 items-center justify-center  font-sans   text-primary bg-linear-to-br from-primary-foreground to-background min-h-screen">
            <h1>
                authenticated users only
            </h1>
        </div>
    );
}
