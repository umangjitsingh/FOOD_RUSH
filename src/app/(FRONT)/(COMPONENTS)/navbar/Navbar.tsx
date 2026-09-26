'use client'

import { ChevronDown, Package2, LogOut, PlusCircle, Citrus } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { IUser } from "@/app/(BACK)/models/user.model";
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import AdminNavbarLink from "./AdminNavbarLink";
import UserSearchBar from "./UserSearchBar";
import UserBag from "./UserBag";
import Logo from "../Logo";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

export function Navbar({ user }: { user: IUser }) {
    const [modalOpen, setModalOpen] = useState(false)
    const personRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [blur, setBlur] = useState(false)

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (personRef.current && !personRef.current.contains(event.target as Node))
                setModalOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSignOutInPortal = async () => {
        setBlur(true)
        setIsSidebarOpen(false);
        await signOut({ callbackUrl: "/login" })
    }

    const sidebarPortal = isSidebarOpen ? createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: -70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -70 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="fixed top-0 left-0 z-40 h-full w-[78%] max-w-sm border-r border-border bg-[#0c0e16]/95 backdrop-blur-2xl"
            >
                <div className="px-5 py-24 text-white">
                    <div className="flex w-full flex-col items-start gap-2">
                        <Link href="/admin/add-meal" className="group flex w-full items-center gap-2 rounded-xl border border-border/50 bg-card px-4 py-3 text-foreground transition-all hover:border-primary/50 hover:bg-primary/10">
                            <PlusCircle className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                            <span className="text-base font-medium">Add Meals</span>
                        </Link>
                        <Link href="/" className="group flex w-full items-center gap-2 rounded-xl border border-border/50 bg-card px-4 py-3 text-foreground transition-all hover:border-primary/50 hover:bg-primary/10">
                            <Citrus className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                            <span className="text-base font-medium">View Meals</span>
                        </Link>
                        <Link href="/" className="group flex w-full items-center gap-2 rounded-xl border border-border/50 bg-card px-4 py-3 text-foreground transition-all hover:border-primary/50 hover:bg-primary/10">
                            <Package2 className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                            <span className="text-base font-medium">View Orders</span>
                        </Link>
                    </div>
                    <button
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition-all hover:bg-red-500 hover:text-white active:scale-95"
                        onClick={handleSignOutInPortal}
                    >
                        <LogOut className="size-4" />
                        Logout
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null;

    return (
        <header className="sticky top-0 z-50 border-b border-white/6 bg-[#07080d]/70 backdrop-blur-2xl">
            <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:max-w-[1400px] lg:px-10">
                <Logo />
                {user?.role === "user" && <UserSearchBar />}
                {user.role === "admin" &&
                    <AdminNavbarLink isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}

                {!blur && (
                    <div
                        className="relative flex items-center gap-2 sm:gap-3"
                        aria-label="Open profile menu"
                        ref={personRef}
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        <button
                            className="group flex items-center gap-2 rounded-full border border-border bg-card/80 py-1.5 pr-3 pl-1.5 text-left transition-all hover:border-primary/35 hover:shadow-[0_0_24px_-10px_var(--glow)]"
                            aria-label="Open profile menu"
                        >
                            {user.image ? (
                                <Image src={user?.image} width={32} height={32} className="size-8 rounded-full object-cover" alt="" />
                            ) : (
                                <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                                    {user.name.slice(0, 1).toUpperCase()}
                                </span>
                            )}
                            <span className="hidden max-w-40 truncate text-sm font-medium sm:block">
                                {user.name.length > 20 ? user.name.slice(0, 20) + "..." : user.name}
                            </span>
                            <ChevronDown className="hidden size-4 text-muted-foreground sm:block" aria-hidden="true" />
                        </button>
                        {user?.role === "user" && <UserBag />}
                        {modalOpen && <Modal isOpen={modalOpen} setModalOpen={setModalOpen} user={user} />}
                    </div>
                )}
            </div>
            {sidebarPortal}
        </header>
    )
}

const Modal = ({ isOpen, user, setModalOpen }: {
    isOpen: boolean,
    user: IUser,
    setModalOpen: (isOpen: boolean) => void
}) => {
    const handleSignOut = async () => {
        setModalOpen(false)
        await signOut({ callbackUrl: "/login" })
    }
    return (
        <div className={clsx(
            "absolute top-16 right-0 z-50 w-72 rounded-2xl border border-border/70 bg-popover/95 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-300 ease-out",
            {
                "scale-100 translate-y-0 opacity-100": isOpen,
                "pointer-events-none -translate-y-2 scale-95 opacity-0": !isOpen,
            }
        )}>
            <div className="flex flex-col gap-1 p-4">
                <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                    {user.image ? (
                        <Image src={user?.image} width={40} height={40} className="size-10 rounded-full border border-border object-cover" alt="" />
                    ) : (
                        <span className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-sm font-bold text-primary">
                            {user.name.slice(0, 1).toUpperCase()}
                        </span>
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">
                            {user.name.length > 16 ? user.name.slice(0, 16) + '...' : user.name}
                        </span>
                        <span className="text-[11px] font-medium tracking-wider text-primary uppercase">{user.role}</span>
                    </div>
                </div>

                {user?.role === "user" && (
                    <div className="pt-2">
                        <Link
                            href=""
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
                            onClick={() => setModalOpen(false)}
                        >
                            <Package2 className="size-4" />
                            My Orders
                        </Link>
                    </div>
                )}
                <button
                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-all hover:bg-red-500/10"
                    onClick={handleSignOut}
                >
                    <LogOut className="size-4" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar
