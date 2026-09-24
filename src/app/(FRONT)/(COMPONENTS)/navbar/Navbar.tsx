'use client'

import {ChevronDown, Package2, LogOut, PlusCircle, Citrus,} from 'lucide-react'
import React, {useState, useRef, useEffect} from 'react'
import {IUser} from "@/app/(BACK)/models/user.model";
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import {signOut} from "next-auth/react";
import AdminNavbarLink from "./AdminNavbarLink";
import UserSearchBar from "./UserSearchBar";
import UserBag from "./UserBag";
import Logo from "../Logo";
import {createPortal} from "react-dom";
import {motion, AnimatePresence} from "motion/react";

export function Navbar({user}: { user: IUser }) {

    const [modalOpen, setModalOpen] = useState(false)
    const personRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const[blur,setBlur]=useState(false)


    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (personRef.current && !personRef.current.contains(event.target as Node))
                setModalOpen(false);
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler); // ✅ same reference
    }, []);

    const handleSignOutInPortal = async () => {
        console.log("Logout clicked");
        setBlur(true)
        setIsSidebarOpen(false);
        await signOut({callbackUrl: "/login"})
    }

    const sidebarPortal = isSidebarOpen ? createPortal(
        <AnimatePresence>
            <motion.div initial={{ opacity: 0,x:-70 }} animate={{ opacity: 1, x:0 }} exit={{ opacity: 0,x:-70 }} transition={{ type: "spring", stiffness: 400 }}
                        className="fixed top-0 left-0 w-[77%] h-full bg-linear-to-r from-[#7B3711] from-0% via-[#6B4711] via-60%  to-transparent  z-40">
                <div className="px-4 py-24 text-white " >
                    <div className="flex flex-col items-start gap-2 w-full ">
                        <Link href="/admin" className="group flex  items-center gap-2 w-2/4 px-4 py-2 rounded-lg border border-border/50 bg-black/60 text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:shadow-sm">
                            <PlusCircle className="size-5 text-muted-foreground transition-colors group-hover:text-primary"/>
                            <span className="text-base font-medium">Add Meals</span>
                        </Link>
                        <Link href="/admin" className="group flex items-center gap-2 px-4 py-2 w-2/4  rounded-lg border border-border/50 bg-black/60 text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:shadow-sm">
                            <Citrus className="size-5 text-muted-foreground transition-colors group-hover:text-primary"/>
                            <span className="text-base font-medium">View Meals</span>
                        </Link>
                        <Link href="/admin" className="group flex items-center gap-2 px-4 py-2 w-2/4  rounded-lg border border-border/50 bg-black/60 text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:shadow-sm">
                            <Package2 className="size-5 text-muted-foreground transition-colors group-hover:text-primary"/>
                            <span className="text-base font-medium">View Orders</span>
                        </Link>
                    </div>
                    <button
                        className="mt-6 flex items-center justify-center gap-2 w-2/4 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-linear-to-r from-black/90 to-black border border-red-400/30 shadow-lg shadow-red-900/20 transition-all duration-300 hover:from-red-500 hover:to-red-600 hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-0.5 active:scale-95"
                        onClick={handleSignOutInPortal}>
                        <LogOut className="size-4"/>
                        Logout
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null;


    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl  ">
            <div
                className="mx-auto flex h-20 w-full max-w-7xl xl:max-w-350 2xl:max-w-[2280px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">

                <Logo/>

                {/* Desktop search - always visible, relative */}
                {user?.role === "user" && <UserSearchBar/>}
                {user.role === "admin" &&
                    <AdminNavbarLink isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>}

                {!blur &&  <div className="flex items-center gap-2 sm:gap-3 relative"
                               aria-label="Open profile menu"
                               ref={personRef}
                               onClick={() => setModalOpen(!modalOpen)}>


                    <button
                        className="group flex items-center gap-2  rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-left transition-all hover:border-primary/30 hover:shadow-sm"
                        aria-label="Open profile menu">
                        {user.image ? <Image src={user?.image} width={32} height={32}
                                             className="grid size-8 place-items-center rounded-full" alt=""/> : <span
                            className="grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">{user.name.slice(0, 1).toUpperCase()}</span>}
                        <span
                            className="hidden text-sm font-medium sm:block max-w-40 truncate ">{user.name.length > 20 ? user.name.slice(0, 20) + "..." : user.name}</span>
                        <ChevronDown className="hidden size-4 text-muted-foreground sm:block" aria-hidden="true"/>
                    </button>
                    {user?.role === "user" && <UserBag/>}

                    {modalOpen && <Modal isOpen={modalOpen} setModalOpen={setModalOpen} user={user}/>}

                </div>}


            </div>
            {sidebarPortal}
        </header>
    )
}


const Modal = ({isOpen, user, setModalOpen}: {
    isOpen: boolean,
    user: IUser,
    setModalOpen: (isOpen: boolean) => void
}) => {


    const handleSignOut = async () => {
        setModalOpen(false)
        console.log("Logout clicked")
        await signOut({callbackUrl: "/login"})
    }
    return (


        <div className={clsx(
            "absolute right-0 top-16 w-72 rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 z-50 transition-all duration-300 ease-out",
            {
                "opacity-100 translate-y-0 scale-100": isOpen,
                "opacity-0 -translate-y-2 scale-95 pointer-events-none": !isOpen,
            }
        )}
        >
            <div className="flex flex-col gap-1 p-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                    {user.image ? <Image src={user?.image} width={40} height={40}
                                         className="size-10 rounded-full border-2 border-border/50 shadow-sm" alt=""/> :
                        <span
                            className="size-10 flex items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-primary/5 text-sm font-bold text-primary border-2 border-border/50 shadow-sm">{user.name.slice(0, 1).toUpperCase()}</span>}

                    <div className="flex flex-col">
                        <span
                            className="text-sm font-semibold text-foreground">{user.name.length > 16 ? user.name.slice(0, 16) + '...' : user.name}</span>
                        <span className="text-[11px] text-muted-foreground uppercase font-medium">{user.role}</span>
                    </div>
                </div>

                {user?.role === "user" &&
                    <div className="pt-2">
                        <Link href={""}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent/70 hover:text-foreground"
                              onClick={() => setModalOpen(false)}>
                            <Package2 className="size-4"/>
                            My Orders
                        </Link>
                    </div>}
                <button
                    className="z-50 mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-all hover:bg-accent/70 "
                    onClick={handleSignOut}>
                    <LogOut className="size-4"/>
                    Logout
                </button>
            </div>
        </div>


    );
};

export default Navbar
