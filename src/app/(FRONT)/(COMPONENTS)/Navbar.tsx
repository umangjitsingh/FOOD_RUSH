
'use client'

import { Search, ShoppingBag, Sparkles, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import {IUser} from "@/app/(BACK)/models/user.model";
import Image from 'next/image';




export function Navbar({ user }: { user: IUser }) {
    const [query, setQuery] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-5 sm:px-8 lg:px-10">
                <a href="#top" className="group flex shrink-0 items-center gap-3" aria-label="Savor home">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)] transition-transform duration-200 group-hover:-rotate-6">
            <Sparkles size={18} strokeWidth={2.5} aria-hidden="true" />
          </span>
                    <span className="font-serif text-[1.35rem] font-bold tracking-[-0.04em]">
            savor<span className="text-primary">.</span>
          </span>
                </a>



                <form className="relative mx-auto hidden w-full max-w-md md:block" role="search" onSubmit={(event) => event.preventDefault()}>
                    <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <label className="sr-only" htmlFor="site-search">Search recipes</label>
                    <input
                        id="site-search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="search"
                        placeholder="Search recipes, ingredients..."
                        className="h-11 w-full rounded-full border border-border bg-muted/45 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/80 focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10"
                    />
                    <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground xl:block">⌘ K</kbd>
                </form>

                <div className="ml-auto flex items-center gap-2 sm:gap-3 " onClick={() => setModalOpen(true)}>


                    <button className="group flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-left transition-all hover:border-primary/30 hover:shadow-sm" aria-label="Open profile menu">
                        {user.image ? <Image src={user?.image} width={32} height={32} className="grid size-8 place-items-center rounded-full" alt="" /> : <span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">{user.name.slice(0, 1).toUpperCase()}</span> }
                        <span className="hidden text-sm font-semibold sm:block">{   user.name.length > 14 ? user.name.slice(0, 14) + '...' : user.name }</span>
                        <ChevronDown className="hidden size-4 text-muted-foreground sm:block" aria-hidden="true" />
                    </button>
                    <button className="relative flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)] transition-transform hover:-translate-y-0.5" aria-label="Open your bag">
                        <ShoppingBag size={18} strokeWidth={2.2} aria-hidden="true" />
                        <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-2 ring-background">2</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
