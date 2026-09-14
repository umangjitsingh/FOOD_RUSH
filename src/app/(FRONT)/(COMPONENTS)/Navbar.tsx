'use client'

import {Search, ShoppingBag, Sparkles, ChevronDown, Package2, LogOut, X} from 'lucide-react'
import {useState, useRef, useEffect} from 'react'
import {IUser} from "@/app/(BACK)/models/user.model";
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import {signOut} from "next-auth/react";

export function Navbar({user}: { user: IUser }) {

    const [modalOpen, setModalOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [query, setQuery] = useState('');
    const personRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (personRef.current && !personRef.current.contains(event.target as Node))
                setModalOpen(false);
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler); // ✅ same reference
    }, []);


    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-5 sm:px-8 lg:px-10">
                <a href="#top" className="group flex shrink-0 items-center gap-3" aria-label="Savor home">
          <span
              className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)] transition-transform duration-200 group-hover:-rotate-6">
            <Sparkles size={18} strokeWidth={2.5} aria-hidden="true"/>
          </span>
                    <span className="font-serif text-[1.35rem] font-bold tracking-[-0.04em]">
            savor<span className="text-primary">.</span>
          </span>
                </a>


                {/* Desktop search - always visible, relative */}
                <form className="relative mx-auto hidden w-full max-w-md md:block"
                      onSubmit={(event) => event.preventDefault()}>
                    <Search
                        className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"/>
                    <label className="sr-only" htmlFor="desktop-search">Search recipes</label>
                    <input
                        id="desktop-search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="search"
                        placeholder="Search recipes, ingredients..."
                        className="h-11 w-full rounded-full border border-border bg-muted/45 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/80 focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10"
                    />
                    <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground xl:block">
                        ⌘ K
                    </kbd>
                </form>

                {/* Mobile search toggle button */}
                <button className="md:hidden cursor-pointer hover:bg-foreground/12 bg-foreground/10 h-11 w-11 rounded-full border border-border flex items-center justify-center hover:border-primary/30 hover:shadow-sm"
                    onClick={() => setSearchOpen(!searchOpen)}
                    aria-label="Toggle search"
                >
                    <Search className="text-muted-foreground size-5"/>
                </button>

                {/* Mobile search - absolute, toggled */}
                {searchOpen && (

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="md:hidden absolute left-0 top-full w-full px-4 py-3 bg-background/95 backdrop-blur-xl border-b border-border z-50"
                        >
                            <div className="relative " >
                                <Search
                                    className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground"
                                    aria-hidden="true"/>
                                <label className="sr-only" htmlFor="mobile-search">Search recipes</label>
                                <input
                                    id="mobile-search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    type="text"
                                    placeholder="Search recipes, ingredients..."
                                    autoFocus
                                    className="h-11 w-full rounded-full border border-border bg-muted/45 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/80 focus:border-primary/27 focus:bg-background focus:ring-2 focus:ring-primary/10"
                                />
                                <button onClick={() => setSearchOpen(false)}><X className="size-5 absolute right-4 top-1/2 -translate-y-1/2"/></button>
                            </div>
                        </form>




                )}



                <div className="ml-auto flex items-center gap-2 sm:gap-3 relative"
                     aria-label="Open profile menu"
                     ref={personRef}
                     onClick={() => setModalOpen(!modalOpen)}>


                    <button
                        className="group flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-left transition-all hover:border-primary/30 hover:shadow-sm"
                        aria-label="Open profile menu">
                        {user.image ? <Image src={user?.image} width={32} height={32}
                                             className="grid size-8 place-items-center rounded-full" alt=""/> : <span
                            className="grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">{user.name.slice(0, 1).toUpperCase()}</span>}
                        <span
                            className="hidden text-sm font-semibold sm:block">{user.name.length > 14 ? user.name.slice(0, 14) + '...' : user.name}</span>
                        <ChevronDown className="hidden size-4 text-muted-foreground sm:block" aria-hidden="true"/>
                    </button>
                    <button
                        className="relative flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)] transition-transform hover:-translate-y-0.5"
                        aria-label="Open your bag">
                        <ShoppingBag size={18} strokeWidth={2.2} aria-hidden="true"/>
                        <span
                            className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-2 ring-background">2</span>
                    </button>
                </div>
                {modalOpen && <Modal isOpen={modalOpen} setModalOpen={setModalOpen} user={user}/>}
            </div>
        </header>
    )
}


const Modal = ({isOpen, user,setModalOpen}: { isOpen: boolean, user: IUser, setModalOpen: (isOpen: boolean) => void }) => {
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
                                         className="size-10 rounded-full border-2 border-border/50 shadow-sm" alt=""/> : <span
                        className="size-10 flex items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-primary/5 text-sm font-bold text-primary border-2 border-border/50 shadow-sm">{user.name.slice(0, 1).toUpperCase()}</span>}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{user.name.length > 22 ? user.name.slice(0, 22) + '...' : user.name}</span>
                        <span className="text-xs text-muted-foreground">Welcome back</span>
                    </div>
                </div>
                <div className="pt-2">
                    <Link href={""} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent/70 hover:text-foreground" onClick={() => setModalOpen(false)}>
                        <Package2 className="size-4"/>
                        My Orders
                    </Link>
                </div>
                <button className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-all hover:bg-accent/70 " onClick={() => {
                    setModalOpen(false)
                  void signOut({callbackUrl: "/"})
                } } >
                   <LogOut className="size-4"/>
                    Logout
                </button>
            </div>
        </div>


    );
};

export default Navbar
