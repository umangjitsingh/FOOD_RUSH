"use client"
import React, {JSX, useState} from 'react';
import {UserShield, Bike, User, ArrowRight} from "lucide-react";
import clsx from "clsx";
import axios from "axios";


interface Role {
    value: string;
    icon: JSX.Element;
}

const ROLES: Role[] = [
    { value: 'admin', icon: <UserShield/> },
    { value: 'user', icon: <User/> },
    { value: 'delivery boy', icon: <Bike/> },
];

function EditRoleMobile() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [mobile, setMobile] = useState("");

    const handleEdit =async (e: React.MouseEvent) => {
        e.preventDefault();
        try{
            const response=await axios.post("/api/user/edit-role-mobile", {role: selectedRole, mobile: mobile});
            console.log(response.data);
            window.location.href = "/";

        }catch(e){
            console.log(e)
        }
    };

    return (
        <div className="overflow-hidden bg-background text-foreground w-full min-h-screen">
            <section className="relative mx-auto max-w-360 px-5 py-5 sm:px-8 lg:px-12 scroll-mt-20">
                {/* Background blobs */}
                <div
                    className="pointer-events-none absolute -right-20 top-8 h-120 w-lg rounded-full bg-primary/10 blur-[130px]"/>
                <div
                    className="pointer-events-none absolute bottom-6 left-0 h-120 w-120 rounded-full bg-primary/4 blur-[110px]"/>

                <div className="flex items-center justify-center h-screen w-full">
                    <div
                        className="w-full max-w-xl bg-border hover:bg-linear-to-br hover:from-primary/10 hover:to-primary/40 h-140 transition-all flex items-center justify-center p-px rounded-2xl">
                        <div className="bg-black h-full w-full z-90 rounded-2xl p-4">
                            <div className="w-full h-28 flex flex-col items-center justify-center">
                                <h1 className="max-w-2xl font-serif text-4xl font-bold leading-[0.98] tracking-snug text-balance sm:text-5xl lg:text-[58px] pt-8">Select
                                    Your Role</h1>
                                <p className="text-lg font-medium lowercase tracking-tight text-muted-foreground/60 pt-1.5">Choose <span
                                    className="italic font-extrabold text-lg text-primary/90 uppercase">Your Path.</span>
                                </p>
                            </div>

                            <div className="w-full flex flex-col items-center pt-12 px-0 sm:px-20">
                                <div className="flex gap-2 items-center p-2 justify-center w-full ">
                                    {ROLES.map((r:Role)=>{
                                        return <div key={r.value} className={clsx("flex flex-col items-center justify-center bg-foreground/10 border border-primary/60 text-primary/60 rounded-lg  cursor-pointer  h-34 w-34",
                                        selectedRole === r.value && "bg-primary/20 text-primary/90")}
                                        onClick={()=>setSelectedRole(r.value)}>
                                            <p className="h-8 w-8 flex items-center justify-center">{r.icon}</p>
                                            <p className="text-sm font-medium leading-1">{r.value}</p>
                                        </div>
                                        }
                                    )}

                                </div>
                            </div>

                            <div className="flex flex-col items-center  z-20 relative">
                                <label htmlFor="mobile" className="text-base  font-bold text-white/60  mt-10">Enter
                                    your Mobile number</label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    placeholder="eg. 000-000-0000"
                                    className="w-full max-w-xs sm:max-w-sm px-4 py-3 rounded-md border border-primary/60 focus:ring-2 focus:ring-amber-600 focus:outline-none text-primary/60 bg-foreground/10"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                                <button
                                    onClick={(e) => handleEdit(e)}
                                    disabled={!selectedRole || mobile.length <= 9 || mobile.length > 10}
                                    className={`${!selectedRole || mobile.length <= 9 || mobile.length > 10 ? "opacity-40" : "opacity-90"}  py-3 w-1/3 max-w-xs sm:max-w-sm text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-all bg-primary mt-4 rounded-md cursor-pointer flex items-center justify-center gap-2`}
                                >
                                      Go to Home<ArrowRight className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EditRoleMobile;