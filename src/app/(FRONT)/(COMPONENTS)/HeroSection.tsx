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
        sub: "Fresh. Local. Yours.",
        accent: "#C8965A",
        badge: "Chef's Kitchen",
        icon: <LeafyGreen className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1662192513841-c890cc6ff3f9?q=80&w=776&auto=format&fit=crop",
        stat: { n: "98%", label: "Fresh rated" },
        tag: "Seasonal menu",
    },
    {
        id: 2,
        eyebrow: "Speed matters",
        word1: "FAST.",
        word2: "HOT.",
        sub: "Under 30 min, guaranteed.",
        accent: "#C85A5A",
        badge: "30-min Delivery",
        icon: <Drone className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1659367736714-e3f0344a6266?q=80&w=1287&auto=format&fit=crop",
        stat: { n: "28 min", label: "Avg. delivery" },
        tag: "Live tracking",
    },
    {
        id: 3,
        eyebrow: "No compromises",
        word1: "CLEAN.",
        word2: "SEALED.",
        sub: "Every order inspected.",
        accent: "#5A8AC8",
        badge: "Quality First",
        icon: <ShieldCheck className="w-5 h-5" />,
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
        setTimeout(() => { setCur(i); setOut(false); }, 450);
    };

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setOut(true);
            setTimeout(() => {
                setCur(p => (p + 1) % slides.length);
                setOut(false);
            }, 450);
        }, 7000);
    };

    useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

    const s = slides[cur];

    return (
        <section
            className="w-[96%] mx-auto mt-24 rounded-2xl overflow-hidden relative"
            style={{ height: '82vh', background: '#080808' }}>

            {/* ── FULL BG IMAGE, heavily dimmed ── */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={s.image} alt="" fill sizes="100vw" priority
                    className={`object-cover transition-all duration-700 ${out ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'}`}
                    style={{ filter: 'brightness(0.13) saturate(0.6)' }}
                />
            </div>

            {/* ── ACCENT GLOW top-right ── */}
            <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none z-0 transition-all duration-1000"
                 style={{ background: s.accent, opacity: 0.07, filter: 'blur(90px)' }} />

            {/* ── THIN TOP BAR ── */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 pt-8">
                <div className={`flex items-center gap-2 transition-all duration-400 ${out ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />
                    <span className="text-[11px] tracking-[0.2em] uppercase font-medium"
                          style={{ color: s.accent }}>
                        {s.badge}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-white/20 text-xs font-mono">{String(cur + 1).padStart(2,'0')}</span>
                    <span className="text-white/10 text-xs">/</span>
                    <span className="text-white/10 text-xs font-mono">{String(slides.length).padStart(2,'0')}</span>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-10">

                {/* Eyebrow */}
                <p className={`text-xs tracking-[0.25em] uppercase mb-4 transition-all duration-500 ${out ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
                   style={{ color: `${s.accent}99` }}>
                    {s.eyebrow}
                </p>

                {/* GIANT HEADLINE — the whole design */}
                <div className={`transition-all duration-500 delay-[50ms] ${out ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}`}>
                    <h1
                        className="font-serif italic font-normal leading-[0.88] text-white/90 select-none"
                        style={{ fontSize: 'clamp(5rem, 13vw, 10.5rem)', letterSpacing: '-0.02em' }}>
                        {s.word1}
                    </h1>
                    <h1
                        className="font-serif italic font-normal leading-[0.88] select-none"
                        style={{
                            fontSize: 'clamp(5rem, 13vw, 10.5rem)',
                            letterSpacing: '-0.02em',
                            color: s.accent,
                            WebkitTextStroke: `1px ${s.accent}`,
                        }}>
                        {s.word2}
                    </h1>
                </div>

                {/* Bottom row */}
                <div className={`mt-10 flex items-end justify-between gap-4 transition-all duration-500 delay-100 ${out ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

                    {/* Left: sub + CTA */}
                    <div className="flex flex-col gap-5">
                        <p className="text-white/40 text-sm leading-relaxed max-w-[22ch]">{s.sub}</p>
                        <div className="flex items-center gap-4">
                            <button
                                className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
                                style={{ background: s.accent }}>
                                Order now
                                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                            <button className="text-xs text-white/25 hover:text-white/50 transition-colors tracking-wide">
                                Browse menu
                            </button>
                        </div>
                    </div>

                    {/* Right: social proof + stat */}
                    <div className="hidden sm:flex flex-col items-end gap-4">

                        {/* Stat */}
                        <div className="text-right">
                            <p className="text-3xl font-bold text-white/90 leading-none tabular-nums">{s.stat.n}</p>
                            <p className="text-[11px] text-white/25 mt-1 tracking-wide">{s.stat.label}</p>
                        </div>

                        {/* Divider */}
                        <div className="w-8 h-px bg-white/10" />

                        {/* Avatars + stars */}
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex">
                                {avatars.map((a, i) => (
                                    <span key={a.label}
                                          style={{ backgroundColor: a.bg, marginLeft: i === 0 ? 0 : '-7px', zIndex: avatars.length - i }}
                                          className="relative w-7 h-7 rounded-full border-2 border-[#080808] flex items-center justify-center text-[9px] font-bold text-white">
                                        {a.label}
                                    </span>
                                ))}
                                <span
                                    className="relative w-7 h-7 rounded-full border-2 border-[#080808] flex items-center justify-center text-[8px] font-bold text-white"
                                    style={{ marginLeft: '-7px', background: '#1a1a1a', zIndex: 0 }}>
                                    +2k
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} style={{ fill: s.accent, color: s.accent }} />
                                ))}
                                <span className="text-[10px] text-white/25 ml-1">2,000+ orders</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE DOTS ── */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {slides.map((sl, i) => (
                        <button key={i}
                                onClick={() => { go(i); startTimer(); }}
                                aria-label={`Slide ${i + 1}`}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    height: '3px',
                                    width: i === cur ? '32px' : '6px',
                                    background: i === cur ? s.accent : 'rgba(255,255,255,0.15)',
                                }} />
                    ))}
                </div>
            </div>

            {/* ── FOOD IMAGE INSET (right side, desktop) ── */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block z-10 w-[34%]">
                <div className={`relative rounded-2xl overflow-hidden transition-all duration-600 ${out ? 'opacity-0 scale-[0.96] translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}
                     style={{
                         height: '58vh',
                         boxShadow: `0 0 0 1px ${s.accent}18, 0 40px 80px rgba(0,0,0,0.7)`,
                     }}>
                    <Image
                        src={s.image} alt={s.word1}
                        fill sizes="34vw" priority
                        className="object-cover"
                        style={{ filter: 'brightness(0.9) saturate(1.1)' }}
                    />
                    {/* Inner vignette */}
                    <div className="absolute inset-0"
                         style={{ background: `linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 50%)` }} />

                    {/* Tag chip */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium backdrop-blur-md border border-white/10"
                         style={{ background: 'rgba(8,8,8,0.65)', color: s.accent }}>
                        <span style={{ color: s.accent }}>{s.icon}</span>
                        {s.tag}
                    </div>

                    {/* Bottom label */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white/60 text-xs tracking-wide">{s.sub}</p>
                    </div>
                </div>
            </div>

        </section>
    );
}



