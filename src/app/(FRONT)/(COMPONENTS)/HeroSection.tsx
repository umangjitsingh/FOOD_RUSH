"use client"
import { useEffect, useRef, useState } from 'react';
import { LeafyGreen, Drone, ShieldCheck, ArrowUpRight, Star } from 'lucide-react';
import Image from 'next/image';

const slides = [
    {
        id: 1,
        eyebrow: "Farm to table",
        word1: "HONEST",
        word2: "FOOD.",
        sub: "Fresh, local, and made with care — delivered to your door.",
        badge: "Chef's Kitchen",
        icon: <LeafyGreen className="w-4 h-4" />,
        image: "https://images.unsplash.com/photo-1662192513841-c890cc6ff3f9?q=80&w=776&auto=format&fit=crop",
        stat: { n: "98%", label: "Fresh rated" },
        tag: "Seasonal menu",
    },
    {
        id: 2,
        eyebrow: "Speed matters",
        word1: "FAST.",
        word2: "HOT.",
        sub: "Under 30 minutes, tracked in real time, every single order.",
        badge: "30-min Delivery",
        icon: <Drone className="w-4 h-4" />,
        image: "https://images.unsplash.com/photo-1659367736714-e3f0344a6266?q=80&w=1287&auto=format&fit=crop",
        stat: { n: "28 min", label: "Avg. delivery" },
        tag: "Live tracking",
    },
    {
        id: 3,
        eyebrow: "No compromises",
        word1: "CLEAN.",
        word2: "SEALED.",
        sub: "Inspected, hygienically packed and sealed before it leaves.",
        badge: "Quality First",
        icon: <ShieldCheck className="w-4 h-4" />,
        image: "https://images.unsplash.com/photo-1553395266-51c63ddf3d8e?q=80&w=1064&auto=format&fit=crop",
        stat: { n: "4.9", label: "Avg. rating" },
        tag: "Hygiene certified",
    },
];

const avatars = [
    { label: "JM", bg: "#AE8463" },
    { label: "AL", bg: "#C29C6F" },
    { label: "SK", bg: "#8C6146" },
];

export default function HeroSection() {
    const [cur, setCur] = useState(0);
    const [out, setOut] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const go = (i: number) => {
        if (i === cur || out) return;
        setOut(true);
        setTimeout(() => { setCur(i); setOut(false); }, 420);
    };

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setOut(true);
            setTimeout(() => {
                setCur(p => (p + 1) % slides.length);
                setOut(false);
            }, 420);
        }, 7000);
    };

    useEffect(() => {
        startTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, []);

    const s = slides[cur];

    return (
        <section
            className="relative mx-auto mt-5 h-[78vh] w-[96%] max-w-7xl overflow-hidden rounded-3xl border border-white/8 lg:max-w-[1400px]"
            style={{ background: 'var(--background)' }}>

            {/* Full-bleed bg image, very dim */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={s.image} alt="" fill sizes="100vw" priority
                    className={`object-cover transition-all duration-700 ${out ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'}`}
                    style={{ filter: 'brightness(0.18) saturate(0.7)' }}
                />
            </div>

            {/* Primary glow blobs */}
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
                 style={{ background: 'var(--primary)', opacity: 0.07, filter: 'blur(100px)' }} />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
                 style={{ background: 'var(--primary)', opacity: 0.04, filter: 'blur(120px)' }} />

            {/* Inset border */}
            <div className="absolute inset-0 z-0 rounded-2xl pointer-events-none"
                 style={{ boxShadow: 'inset 0 0 0 1px var(--border)' }} />

            {/* ── TOP BAR ── */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 pt-8">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-400 ${out ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'}`}
                     style={{ background: 'var(--accent)', border: '1px solid var(--border)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
                    <span className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: 'var(--primary)' }}>
                        {s.badge}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>{String(cur + 1).padStart(2, '0')}</span>
                    <span className="text-xs mx-0.5" style={{ color: 'var(--border)' }}>/</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--border)' }}>{String(slides.length).padStart(2, '0')}</span>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-10">

                {/* Eyebrow */}
                <p className={`text-[11px] tracking-[0.22em] uppercase mb-5 font-medium transition-all duration-500 ${out ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
                   style={{ color: 'var(--muted-foreground)' }}>
                    {s.eyebrow}
                </p>

                {/* Giant headline */}
                <div className={`transition-all duration-500 delay-[40ms] ${out ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
                    <h1 className="font-serif italic font-normal leading-[0.87] select-none"
                        style={{ fontSize: 'clamp(4.5rem, 12vw, 10rem)', letterSpacing: '-0.025em', color: 'var(--foreground)' }}>
                        {s.word1}
                    </h1>
                    <h1 className="font-serif italic font-normal leading-[0.87] select-none"
                        style={{ fontSize: 'clamp(4.5rem, 12vw, 10rem)', letterSpacing: '-0.025em', color: 'var(--primary)' }}>
                        {s.word2}
                    </h1>
                </div>

                {/* Rule */}
                <div className={`mt-6 w-10 h-px transition-all duration-500 delay-75 ${out ? 'opacity-0' : 'opacity-100'}`}
                     style={{ background: 'var(--primary)', opacity: 0.45 }} />

                {/* Bottom row */}
                <div className={`mt-7 flex items-end justify-between gap-6 transition-all duration-500 delay-100 ${out ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

                    {/* Left */}
                    <div className="flex flex-col gap-5">
                        <p className="text-sm leading-relaxed max-w-[26ch]" style={{ color: 'var(--muted-foreground)' }}>
                            {s.sub}
                        </p>
                        <div className="flex items-center gap-4">
                            <button
                                className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                                Order now
                                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                            <button className="text-xs font-medium transition-colors duration-200 hover:opacity-70"
                                    style={{ color: 'var(--muted-foreground)' }}>
                                Browse menu →
                            </button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="hidden sm:flex flex-col items-end gap-5">
                        <div className="text-right">
                            <p className="text-3xl font-bold leading-none tabular-nums" style={{ color: 'var(--foreground)' }}>
                                {s.stat.n}
                            </p>
                            <p className="text-[11px] mt-1 tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
                                {s.stat.label}
                            </p>
                        </div>

                        <div className="w-6 h-px" style={{ background: 'var(--border)' }} />

                        <div className="flex flex-col items-end gap-2">
                            <div className="flex">
                                {avatars.map((a, i) => (
                                    <span key={a.label}
                                          style={{
                                              backgroundColor: a.bg,
                                              marginLeft: i === 0 ? 0 : '-7px',
                                              zIndex: avatars.length - i,
                                              border: '2px solid var(--background)',
                                          }}
                                          className="relative w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                                        {a.label}
                                    </span>
                                ))}
                                <span
                                    className="relative w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold"
                                    style={{ marginLeft: '-7px', background: 'var(--secondary)', color: 'var(--muted-foreground)', border: '2px solid var(--background)', zIndex: 0 }}>
                                    +2k
                                </span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} style={{ fill: 'var(--primary)', color: 'var(--primary)' }} />
                                ))}
                                <span className="text-[10px] ml-1.5" style={{ color: 'var(--muted-foreground)' }}>2,000+ orders</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {slides.map((_, i) => (
                        <button key={i}
                                onClick={() => { go(i); startTimer(); }}
                                aria-label={`Slide ${i + 1}`}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    height: '3px',
                                    width: i === cur ? '28px' : '6px',
                                    background: i === cur ? 'var(--primary)' : 'var(--border)',
                                }} />
                    ))}
                </div>
            </div>

            {/* ── RIGHT IMAGE CARD (desktop) ── */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block z-10 w-[33%]">
                <div className={`relative rounded-2xl overflow-hidden transition-all duration-600 ${out ? 'opacity-0 scale-[0.96] translate-y-3' : 'opacity-100 scale-100 translate-y-0'}`}
                     style={{ height: '60vh', border: '1px solid var(--border)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
                    <Image src={s.image} alt={s.word1} fill sizes="33vw" priority
                           className="object-cover" style={{ filter: 'brightness(0.88) saturate(1.1)' }} />
                    <div className="absolute inset-0"
                         style={{ background: 'linear-gradient(to top, var(--background) 0%, transparent 45%)' }} />

                    {/* Tag */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
                         style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--primary)', backdropFilter: 'blur(8px)' }}>
                        {s.icon}
                        {s.tag}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs leading-snug" style={{ color: 'var(--muted-foreground)' }}>{s.sub}</p>
                    </div>
                </div>
            </div>

        </section>
    );
}



