"use client"
import React, {useEffect, useRef, useState} from 'react';
import { Pizza, Salad, Wine, Utensils, Drumstick, Cookie, Cake, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const categories: { name: string; icon: React.ReactNode; color: string }[] = [
    { name: "Salads",        icon: <Salad className="h-6 w-6"/>,                     color: "bg-[#AE8463]" },
    { name: "Indian",        icon: <Drumstick  className="h-6 w-6"/>, color: "bg-[#C29C6F]" },
    { name: "Hakka-Chinese", icon: <Utensils className="h-6 w-6" />,  color: "bg-[#8C6146]" },
    { name: "Pizza & Pasta", icon: <Pizza className="h-6 w-6"/>,                     color: "bg-[#7B6EA0]" },
    { name: "Snacks",        icon: <Cookie className="h-6 w-6" />,    color: "bg-[#8C6146]" },
    { name: "Desserts",      icon: <Cake className="h-6 w-6" />,      color: "bg-[#40332A]" },
    { name: "Beverages",     icon: <Wine className="h-6 w-6" />,      color: "bg-[#C29C6F]" },
    { name: "Other",         icon: <Salad className="h-6 w-6" />,     color: "bg-[#AE8463]" },
];

function CategorySlider() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const[showLeftBtn,setShowLeftBtn]=useState<Boolean>(false);
    const[showRightBtn,setShowRightBtn]=useState<Boolean>(true)

    const scroll = (btn: 'left' | 'right') => {
        let moveValue;
        const scrollAmount = 200;

        if (btn === 'left') {
            moveValue = -scrollAmount;
        } else {
            moveValue = scrollAmount;
        }

        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: moveValue,
                behavior: 'smooth'
            });
        }


    };

    const showHideBtn=()=>{
        if(!scrollRef.current)return;
        const{scrollLeft,clientWidth,scrollWidth}=scrollRef.current;

        setShowLeftBtn(scrollLeft>0);
        setShowRightBtn((scrollLeft+clientWidth) < (scrollWidth-7));
    }
useEffect(()=>{
  scrollRef.current?.addEventListener('scroll',showHideBtn);
  return ()=>{
    scrollRef.current?.removeEventListener('scroll',showHideBtn);
  }
},[])
    return (
        <motion.div className="flex flex-col items-center w-[98%]  pt-18 pb-12 mx-auto"
                    initial={{ y: 40,opacity:0 }} whileInView={{ opacity: 1,y:0 }}  transition={{ duration: 0.6 }} viewport={{once:false,amount:0.5}}>
            <h2 className="text-2xl font-bold mb-4 md:text-3xl text-center text-white">Shop By Category</h2>
            <div className="relative w-full">
                {showLeftBtn &&  <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm shadow-[0_0_12px_rgba(0,0,0,0.7)]">
                    <ChevronLeft className="h-6 w-6" />
                </button>}
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto px-12 pb-2 scrollbar-hide scroll-smooth bg-pink-400/4 relative">

                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`
                            shrink-0 flex flex-col items-center justify-center gap-1.5
                            w-30 h-28 rounded-2xl cursor-pointer
                            transition-all duration-200
                            hover:scale-105 hover:brightness-110
                            active:scale-95
                            ${category.color}`}>
                        <div className="text-white/90">
                            {category.icon}
                        </div>
                        <span className="text-sm font-medium text-white text-center leading-tight whitespace-nowrap">
                            {category.name}
                        </span>
                    </div>
                ))}
                </div>
                <div className="absolute left-0 top-0 bg-linear-to-r from-black via-black/50 to-transparent h-full w-16 pointer-events-none z-5"/>
                <div className="absolute right-0 top-0 bg-linear-to-l from-black via-black/50 to-transparent h-full w-16 pointer-events-none z-5"/>

                {showRightBtn &&  <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm shadow-[0_0_12px_rgba(0,0,0,0.7)]">
                    <ChevronRight className="h-6 w-6" />
                </button>}

            </div>
        </motion.div>
    );
}

export default CategorySlider;
