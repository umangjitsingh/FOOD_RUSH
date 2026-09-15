"use client"
import { useEffect, useState } from 'react';
import { LeafyGreen, Drone, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const avatars = [
    { label: "JIM", bg: "#AE8463", left: "left-0" },
    { label: "ALI", bg: "#C29C6F", left: "left-8" },
    { label: "SAM", bg: "#8C6146", left: "left-16" },
    { label: "+2k", bg: "#40332A", left: "left-24" },
];

const slides = [
    {
        id: 1,
        icon: <LeafyGreen className="w-12 h-12  text-green-500 bg-black/20" />,
        badge: "Farm to Door",
        tagline1: "Good food",
        tagline2: "finds you.",
        subtitle: "Farm-fresh, locally-sourced groceries delivered to your doorstep — straight from the people who grow them.",
        buttonText: "Shop Now",
        accent: "text-green-500",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        icon: <Drone className="w-12 h-12  text-blue-400 bg-black/20" />,
        badge: "30-min Delivery",
        tagline1: "Order now,",
        tagline2: "eat soon.",
        subtitle: "Hot, fresh, and on time — every order is tracked in real time and delivered to your door in under 30 minutes.",
        buttonText: "Order Now",
        accent: "text-blue-400",
        image: "https://images.unsplash.com/photo-1584799580661-53b7c6b99430?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        badge2: "24/7",
    },
    {
        id: 3,
        icon: <ShieldCheck className="w-12 h-12  text-purple-600 bg-black/20" />,
        badge: "Quality Checked",
        tagline1: "Great quality,",
        tagline2: "guaranteed.",
        subtitle: "Every product is inspected, hygienically packed, and sealed before it leaves our hands — so you can shop with confidence.",
        buttonText: "Get Started",
        accent: "text-purple-400",
        image: "https://images.unsplash.com/photo-1700937192759-2a86c88128cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU4fHxiZXN0JTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
];

function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            goToSlide((prev:number) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (indexOrUpdater:any) => {
        setAnimating(true);
        setTimeout(() => {
            setCurrentSlide(indexOrUpdater);
            setAnimating(false);
        }, 300);
    };

    const slide = slides[currentSlide];

    return (
        <section className="w-[96%] mx-auto mt-24 h-[82vh] rounded-2xl overflow-hidden relative shadow-2xl flex">

            {/* Ambient glow blobs */}
            <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px] z-0" />
            <div className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-primary/5 blur-[100px] z-0" />

            {/* ── LEFT PANEL ── */}
            <div className="relative z-10 flex flex-col justify-between w-full sm:w-1/2 h-full px-8 py-10">

                {/* Badge */}
                <div className={`flex items-center gap-2 transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_6px_2px_rgba(250,204,21,0.5)]" />
                    <span className={`text-xs font-semibold tracking-wide uppercase ${slide.accent}`}>
                        {slide.badge}
                        {slide.badge2 && (
                            <span className="ml-2 inline-block text-[10px] px-2 py-0.5 bg-white/10 rounded-md animate-pulse">
                                {slide.badge2}
                            </span>
                        )}
                    </span>
                </div>

                {/* Headline + subtitle */}
                <div className={`flex flex-col gap-5 transition-all duration-300 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <div>
                        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-serif font-normal text-foreground leading-tight">
                            {slide.tagline1}
                        </h1>
                        <h1 className={`text-5xl sm:text-6xl xl:text-7xl font-serif font-normal leading-tight ${slide.accent}`}>
                            <em>{slide.tagline2}</em>
                        </h1>
                    </div>
                    <p className="text-base text-white/50 max-w-sm leading-relaxed">
                        {slide.subtitle}
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-8">
                    <button className="group flex items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary hover:gap-3">
                        <ShoppingBag size={15} />
                        <span>{slide.buttonText}</span>
                        <ArrowRight size={14} className="opacity-0 -ml-1 group-hover:opacity-100 transition-all duration-300" />
                    </button>

                    {/* Social proof */}
                    <div className="flex items-center gap-12">
                        <div className="relative h-10 w-36 shrink-0">
                            {avatars.map((a) => (
                                <span
                                    key={a.label}
                                    style={{ backgroundColor: a.bg }}
                                    className={`absolute ${a.left} top-0 flex items-center justify-center w-9 h-9 rounded-full border-[3px] border-background text-[10px] font-bold font-mono text-white shadow-md`}
                                >
                                    {a.label}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-white/80 tracking-wide">⭐️⭐️⭐️⭐️⭐️</span>
                            <span className="text-xs text-white/40 mt-0.5">Loved by 2,000+ neighbors</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RIGHT PANEL (image) ── */}
            <div className="relative hidden sm:block sm:w-1/2 h-full overflow-hidden">
                <Image
                    src={slide.image}
                    alt={slide.tagline1}
                    fill
                    priority
                    className={`object-cover transition-all duration-700 ${animating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                />
                {/* left-to-right fade so image blends into left panel */}
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/10 to-transparent" />

                {/* slide icon floating on image */}
                <div className={`absolute bottom-8 right-8 p-4 bg-background/20 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 ${animating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                    {slide.icon}
                </div>
            </div>

            {/* ── SLIDE DOTS ── */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default HeroSection;
