import React from 'react';
import {auth} from "@/auth";


async function Unauthorized() {
    const session=await auth();
    if(session?.user?.role !== "admin"){
        return <div className="text-center text-2xl font-bold py-10 bg-red-600 text-gray-100 h-screen w-screen flex items-center justify-center ">Sorry you are not authorized to access this page</div>;
    }
    return (
        <div className="text-center text-2xl font-bold py-10 bg-background text-gray-100 h-screen w-screen flex items-center justify-center ">Sorry you are not authorized to access this page</div>
    );
}

export default Unauthorized;