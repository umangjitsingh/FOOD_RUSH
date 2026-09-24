import React, {useState} from 'react';
import {Search,  X} from 'lucide-react';


function UserSearchBar() {
    const [searchOpen, setSearchOpen] = useState(false)
    const [query, setQuery] = useState('');
    return (
        <div className="flex-1 hidden md:block px-4  2xl:ml-28">
            <form className="relative w-full max-w-md xl:max-w-xl 2xl:max-w-4xl"
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
                <kbd
                    className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground xl:block">
                    ⌘ K
                </kbd>
            </form>

            {/* Mobile search toggle button */}
            <button
                className="md:hidden cursor-pointer hover:bg-foreground/12 bg-foreground/10 h-11 w-11 rounded-full border border-border flex items-center justify-center hover:border-primary/30 hover:shadow-sm"
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
                    <div className="relative ">
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
                        <button onClick={() => setSearchOpen(false)}><X
                            className="size-5 absolute right-4 top-1/2 -translate-y-1/2"/></button>
                    </div>
                </form>


            )}
        </div>
    );
}

export default UserSearchBar;