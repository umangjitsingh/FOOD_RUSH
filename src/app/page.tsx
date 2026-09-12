import connectDb from "@/app/(BACK)/config/db";
import User from "@/app/(BACK)/models/user.model";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import EditRoleMobile from "@/app/(FRONT)/(COMPONENTS)/EditRoleMobile";
import Navbar from "@/app/(FRONT)/(COMPONENTS)/Navbar";

export default async function Home() {

    await connectDb();
    const session = await auth();


    const user = await User.findOne({email: session?.user?.email as string}).lean();
    if (!user) {
        return redirect("/login");
    }

    const plainUser = JSON.parse(JSON.stringify(user));
    const INCOMPLETE = (!plainUser.role || !plainUser.mobile);
    if (INCOMPLETE) {
        return <EditRoleMobile/>
    }

    return (
        <>
            <Navbar user={plainUser}/>
        </>
    );
}
