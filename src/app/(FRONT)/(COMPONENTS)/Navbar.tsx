"use client"
import React from 'react';
import {Search, ShoppingBag, Sparkles} from "lucide-react";
import {useRouter} from "next/navigation";
import {IUser} from "@/app/(BACK)/models/user.model";

function Navbar({user}: { user: IUser }) {

    const router = useRouter();
    console.log("user--->",user)
    return (

        <main className=" overflow-hidden bg-background text-foreground">

            {/* REAL TOP ANCHOR */}

            <section className="relative mx-auto max-w-360 px-5 py-5 sm:px-8 lg:px-12 scroll-mt-20">


                {/* Background blobs */}
                <div
                    className="pointer-events-none absolute -right-40 top-8 h-120 w-lg rounded-full bg-primary/10 blur-[130px]"/>
                <div
                    className="pointer-events-none absolute bottom-56 left-0 h-120 w-120 rounded-full bg-primary/5 blur-[110px]"/>

                {/* Header */}
                <header id="top"
                        className="sticky top-0 z-50 backdrop-blur-md bg-background/80 flex items-center justify-between border-b border-border/70 pt-5 pb-5 px-5 sm:px-8 lg:px-12 ">
                    <a href="#top" className="flex items-center gap-3" aria-label="Savor home">
                        <span
                            className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15">
                            <Sparkles size={19} strokeWidth={2.4}/>
                        </span>
                        <span className="font-serif text-xl font-bold tracking-tight">
                            savor<span className="text-primary">.</span>
                        </span>
                    </a>

                    <form className=" w-full max-w-xs sm:max-w-md relative ">
                        <Search  className="text-primary/80 w-5 h-5 absolute top-1/2 -translate-y-1/2 left-4 "/>
                        <input type="text" placeholder="Search"
                               className="cursor-pointer w-full px-10 rounded-2xl py-2 placeholder:text-primary/80 border border-primary/10 focus:outline-none text-primary/80 bg-foreground/4"/>

                    </form>


                    <div className="flex items-center gap-2 sm:gap-3 ">

                        <div className="flex items-center justify-center bg-teal-800 rounded-full w-10 h-10 hover:bg-teal-700 transition-all cursor-pointer hover:scale-105">
                            <p className="text-sm font-medium text-primary">{user.name.slice(0,1).toUpperCase()}</p>
                        </div>

                        <button
                            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5">
                            <ShoppingBag size={16}/> <span className="hidden sm:inline">Your bag</span>
                        </button>
                    </div>
                </header>
            </section>
        </main>
    );
}

export default Navbar;