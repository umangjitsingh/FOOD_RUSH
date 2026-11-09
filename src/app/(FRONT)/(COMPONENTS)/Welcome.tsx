"use client";
import { ArrowRight, Clock3, Search, ShoppingBag, Sparkles, Star } from 'lucide-react'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const categories = ['All cravings', 'Bowls', 'Burgers', 'Pizza', 'Desserts']

function Welcome({ whatStep }: { whatStep: (step: number) => void }) {
    const [activeCategory, setActiveCategory] = useState('All cravings');
    const router = useRouter();

    return (
        <main className="relative overflow-hidden bg-background text-foreground">
            <div className="pointer-events-none absolute -right-40 top-8 h-120 w-lg rounded-full bg-primary/12 blur-[130px]" />
            <div className="pointer-events-none absolute bottom-56 left-0 h-120 w-120 rounded-full bg-indigo-500/10 blur-[110px]" />

            <section className="relative mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-12">
                <header className="sticky top-4 z-50 mb-6 sm:mb-8 flex items-center justify-between rounded-2xl border border-white/8 bg-[#07080d]/70 px-4 py-2.5 sm:px-5 sm:py-3 backdrop-blur-2xl">
                    <a href="#top" className="flex items-center gap-2 sm:gap-3" aria-label="Savor home">
                        <span className="grid size-8 sm:size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_10px_28px_-8px_var(--glow)]">
                            <Sparkles size={16}  strokeWidth={2.4} />
                        </span>
                        <span className="font-serif text-lg sm:text-xl tracking-tight">
                            savor<span className="text-primary">.</span>
                        </span>
                    </a>

                    <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                        <a className="transition-colors hover:text-foreground" href="#discover">Discover</a>
                        <a className="transition-colors hover:text-foreground" href="#how-it-works">How it works</a>
                        <a className="transition-colors hover:text-foreground" href="#partners">Partner with us</a>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button className="hidden rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block" onClick={() => router.push('/login')}>
                            Log in
                        </button>
                        <button className="btn-ghost !rounded-full !px-3 sm:!px-4 !py-2 sm:!py-2.5">
                            <ShoppingBag size={14}  /> <span className="hidden sm:inline">Your bag</span>
                        </button>
                    </div>
                </header>

                <div className="relative z-10 grid items-center gap-8 pb-8 lg:min-h-[82vh] lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 md:gap-10 md:pt-8 md:pb-16">
                    <div className="max-w-xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                            <span className="size-1.5 animate-pulse rounded-full bg-primary" /> Curated for your cravings
                        </div>

                        <h1 className="max-w-2xl font-serif text-4xl leading-[0.98] tracking-[-0.045em] text-balance sm:text-5xl md:text-6xl lg:text-[84px]">
                            Your table is <em className="font-normal text-primary">closer</em> than you think.
                        </h1>

                        <p className="mt-5 sm:mt-7 max-w-lg text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">
                            Discover the best local dishes, delivered warm and wonderfully fast. From comfort classics to your next obsession.
                        </p>

                        <div className="mt-6 sm:mt-8">
                            <button className="btn-primary text-sm sm:text-base" onClick={() => whatStep(2)}>
                                <span className="hidden sm:inline">Register and explore</span>
                                <span className="sm:hidden">Get started</span>
                                <ArrowRight size={14}  />
                            </button>
                        </div>

                        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 sm:gap-y-3 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-2"><Clock3 size={15} className="text-primary" /> 30 min average</span>
                            <span className="flex items-center gap-2"><Star size={15} className="fill-primary text-primary" /> 4.9 from locals</span>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-xl lg:ml-auto order-first lg:order-last">
                        <div className="absolute -inset-6 sm:-inset-8 rounded-[48px] bg-primary/10 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[34px] border border-white/10 bg-card p-2 sm:p-3 md:p-4 shadow-2xl shadow-black/50">
                            <div className="relative aspect-[0.94] overflow-hidden rounded-[20px] sm:rounded-[25px] bg-muted">
                                <Image src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop" alt="A warm bowl of spicy ramen with egg and herbs" width={700} height={800} className="absolute inset-0 size-full object-cover" priority />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/10" />

                                <div className="absolute top-3 sm:top-5 left-3 sm:left-5 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-black/40 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-white backdrop-blur-md">
                                    <span className="size-2 rounded-full bg-primary" /> Live near you
                                </div>

                                <div className="absolute inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 flex items-end justify-between gap-2 sm:gap-3 text-white">
                                    <div>
                                        <p className="font-serif text-lg sm:text-2xl">Midnight Ramen</p>
                                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-white/70">Kumo Kitchen · 4.9 ★</p>
                                    </div>
                                    <span className="rounded-full bg-primary px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-primary-foreground">$16.50</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-2 sm:-right-3 -bottom-4 sm:-bottom-5 hidden items-center gap-2 sm:gap-3 rounded-2xl border border-border bg-card/90 px-3 sm:px-4 py-2.5 sm:py-3 shadow-xl backdrop-blur-md sm:flex">
                            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
                                <ShoppingBag size={17} />
                            </span>
                            <div>
                                <p className="text-xs text-muted-foreground">Just delivered</p>
                                <p className="text-sm font-semibold">Dinner is served</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section id="discover" className="relative z-10 border-t border-border/70 py-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Pick a mood</p>
                            <h2 className="mt-1 font-serif text-2xl italic">What are you feeling?</h2>
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
                                        activeCategory === category
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'border-border bg-card text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="relative z-10 grid gap-3 pt-2 pb-10 sm:grid-cols-3">
                    {[
                        ['01', 'Tell us where', 'Add your address and we will show you the best bites nearby.'],
                        ['02', 'Find your favorite', 'Browse menus from independent spots and local icons.'],
                        ['03', 'Make it a moment', 'Track your order and get ready for something delicious.']
                    ].map(([number, title, body]) => (
                        <article key={number} className="rounded-2xl border border-border/70 bg-card/60 p-6 transition-colors hover:border-primary/30">
                            <span className="font-mono text-xs font-bold text-primary">{number}</span>
                            <h3 className="mt-4 font-serif text-xl italic">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                        </article>
                    ))}
                </section>

                <footer id="partners" className="flex flex-col gap-3 border-t border-border/70 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>Made for good meals and better evenings.</span>
                    <span className="flex items-center gap-2">
                        <Search size={15} /> Find your next favorite
                    </span>
                </footer>
            </section>
        </main>
    );
}

export default Welcome;
