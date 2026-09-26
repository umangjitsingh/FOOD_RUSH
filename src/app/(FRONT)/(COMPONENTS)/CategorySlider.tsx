// "use client"
// import React, {useEffect, useRef, useState} from 'react';
// import { Pizza, Salad, Wine, Utensils, Drumstick, Cookie, Cake, ChevronLeft, ChevronRight } from "lucide-react";
// import { motion } from "framer-motion";
//
// const categories: { name: string; icon: React.ReactNode; color: string }[] = [
//     { name: "Salads",        icon: <Salad className="h-6 w-6"/>,                     color: "bg-[#AE8463]" },
//     { name: "Indian",        icon: <Drumstick  className="h-6 w-6"/>, color: "bg-[#C29C6F]" },
//     { name: "Hakka-Chinese", icon: <Utensils className="h-6 w-6" />,  color: "bg-[#8C6146]" },
//     { name: "Pizza & Pasta", icon: <Pizza className="h-6 w-6"/>,                     color: "bg-[#7B6EA0]" },
//     { name: "Snacks",        icon: <Cookie className="h-6 w-6" />,    color: "bg-[#8C6146]" },
//     { name: "Desserts",      icon: <Cake className="h-6 w-6" />,      color: "bg-[#40332A]" },
//     { name: "Beverages",     icon: <Wine className="h-6 w-6" />,      color: "bg-[#C29C6F]" },
//     { name: "Other",         icon: <Salad className="h-6 w-6" />,     color: "bg-[#AE8463]" },
// ];
//
// function CategorySlider() {
//     const scrollRef = useRef<HTMLDivElement>(null);
//     const[showLeftBtn,setShowLeftBtn]=useState<Boolean>(false);
//     const[showRightBtn,setShowRightBtn]=useState<Boolean>(true)
//
//     const scroll = (btn: 'left' | 'right') => {
//         let moveValue;
//         const scrollAmount = 200;
//
//         if (btn === 'left') {
//             moveValue = -scrollAmount;
//         } else {
//             moveValue = scrollAmount;
//         }
//
//         if (scrollRef.current) {
//             scrollRef.current.scrollBy({
//                 left: moveValue,
//                 behavior: 'smooth'
//             });
//         }
//
//
//     };
//
//     const showHideBtn=()=>{
//         if(!scrollRef.current)return;
//         const{scrollLeft,clientWidth,scrollWidth}=scrollRef.current;
//
//         setShowLeftBtn(scrollLeft>0);
//         setShowRightBtn((scrollLeft+clientWidth) < (scrollWidth-7));
//     }
// useEffect(()=>{
//   scrollRef.current?.addEventListener('scroll',showHideBtn);
//   return ()=>{
//     scrollRef.current?.removeEventListener('scroll',showHideBtn);
//   }
// },[])
//     return (
//         <motion.div className="flex flex-col items-center w-[98%]  pt-18 pb-12 mx-auto"
//                     initial={{ y: 40,opacity:0 }} whileInView={{ opacity: 1,y:0 }}  transition={{ duration: 0.6 }} viewport={{once:false,amount:0.5}}>
//             <h2 className="text-2xl font-bold mb-4 md:text-3xl text-center text-white">Shop By Category</h2>
//             <div className="relative w-full">
//                 {showLeftBtn &&  <button
//                     onClick={() => scroll('left')}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm shadow-[0_0_12px_rgba(0,0,0,0.7)]">
//                     <ChevronLeft className="h-6 w-6" />
//                 </button>}
//                 <div
//                     ref={scrollRef}
//                     className="flex gap-3 overflow-x-auto px-12 pb-2 scrollbar-hide scroll-smooth bg-pink-400/4 relative">
//
//                 {categories.map((category, index) => (
//                     <div
//                         key={index}
//                         className={`
//                             shrink-0 flex flex-col items-center justify-center gap-1.5
//                             w-30 h-28 rounded-2xl cursor-pointer
//                             transition-all duration-200
//                             hover:scale-105 hover:brightness-110
//                             active:scale-95
//                             ${category.color}`}>
//                         <div className="text-white/90">
//                             {category.icon}
//                         </div>
//                         <span className="text-sm font-medium text-white text-center leading-tight whitespace-nowrap">
//                             {category.name}
//                         </span>
//                     </div>
//                 ))}
//                 </div>
//                 <div className="absolute left-0 top-0 bg-linear-to-r from-black via-black/50 to-transparent h-full w-16 pointer-events-none z-5"/>
//                 <div className="absolute right-0 top-0 bg-linear-to-l from-black via-black/50 to-transparent h-full w-16 pointer-events-none z-5"/>
//
//                 {showRightBtn &&  <button
//                     onClick={() => scroll('right')}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm shadow-[0_0_12px_rgba(0,0,0,0.7)]">
//                     <ChevronRight className="h-6 w-6" />
//                 </button>}
//
//             </div>
//         </motion.div>
//     );
// }
//
// export default CategorySlider;
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Pizza, Salad, Wine, Utensils, Drumstick, Cookie, Cake, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const categories: { name: string; icon: React.ReactNode }[] = [
    { name: "Salads",        icon: <Salad className="h-5 w-5" /> },
    { name: "Indian",        icon: <Drumstick className="h-5 w-5" /> },
    { name: "Hakka-Chinese", icon: <Utensils className="h-5 w-5" /> },
    { name: "Pizza & Pasta", icon: <Pizza className="h-5 w-5" /> },
    { name: "Snacks",        icon: <Cookie className="h-5 w-5" /> },
    { name: "Desserts",      icon: <Cake className="h-5 w-5" /> },
    { name: "Beverages",     icon: <Wine className="h-5 w-5" /> },
    { name: "Other",         icon: <Salad className="h-5 w-5" /> },
];

export default function CategorySlider() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);
    const [active, setActive] = useState<number | null>(null);

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -220 : 220, behavior: 'smooth' });
    };

    const updateBtns = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth - 6);
    };

    useEffect(() => {
        const el = scrollRef.current;
        el?.addEventListener('scroll', updateBtns);
        return () => el?.removeEventListener('scroll', updateBtns);
    }, []);

    return (
        <motion.div
            className="w-[96%] mx-auto py-14"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: false, amount: 0.4 }}>

            {/* Section header */}
            <div className="flex items-end justify-between mb-8 px-1">
                <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-1.5"
                       style={{ color: 'var(--muted-foreground)' }}>
                        What are you craving
                    </p>
                    <h2 className="text-2xl md:text-3xl font-serif italic font-normal leading-tight"
                        style={{ color: 'var(--foreground)' }}>
                        Shop by category
                    </h2>
                </div>
                {/* Desktop scroll arrows */}
                <div className="hidden sm:flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!showLeft}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
                        style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!showRight}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
                        style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div className="relative">
                {/* Mobile scroll buttons */}
                {showLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                )}

                {/* Left fade */}
                {showLeft && (
                    <div className="absolute left-0 top-0 h-full w-16 pointer-events-none z-[5]"
                         style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
                )}

                {/* Scrollable track */}
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 px-1">
                    {categories.map((cat, i) => {
                        const isActive = active === i;
                        return (
                            <button
                                key={i}
                                onClick={() => setActive(isActive ? null : i)}
                                className="shrink-0 flex flex-col items-center justify-center gap-2.5 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:outline-none"
                                style={{
                                    width: '112px',
                                    height: '104px',
                                    background: isActive ? 'var(--primary)' : 'var(--card)',
                                    border: isActive
                                        ? '1px solid var(--primary)'
                                        : '1px solid var(--border)',
                                    boxShadow: isActive
                                        ? '0 0 0 3px color-mix(in oklch, var(--primary) 20%, transparent)'
                                        : 'none',
                                }}>
                                {/* Icon */}
                                <span style={{ color: isActive ? 'var(--primary-foreground)' : 'var(--primary)' }}>
                                    {cat.icon}
                                </span>
                                {/* Label */}
                                <span
                                    className="text-xs font-medium text-center leading-tight px-2 whitespace-nowrap"
                                    style={{ color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)' }}>
                                    {cat.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Right fade */}
                {showRight && (
                    <div className="absolute right-0 top-0 h-full w-16 pointer-events-none z-[5]"
                         style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />
                )}

                {showRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}