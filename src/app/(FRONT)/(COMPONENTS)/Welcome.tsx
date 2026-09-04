"use client";
import React from "react";

function Welcome({ whatStep }: { whatStep: (step: number) => void }) {
    return (
        <div className="relative h-screen w-full text-[#f4ede4] overflow-hidden flex items-center justify-center bg-linear-to-br to-sky-400/40 from-black/60">

            {/* Ambient Background Glow Effects */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-[#f4ede4]/2 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#f1ede4]/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#f2ede2]/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

            <div className="relative z-10 w-full max-w-7xl px-8 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">


                <div className="flex-1 flex items-center justify-center order-2 lg:order-1 ">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#f4ede4]/7 rounded-full blur-3xl scale-110"></div>
                        <img
                            src="/burger.png"
                            alt="food"
                            className="relative w-72 md:w-96 lg:w-md xl:w-xl object-contain sm:mt-18 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                        />
                    </div>
                </div>


                <div className="flex-1 max-w-xl space-y-12   text-center lg:text-left ">

                    <div >
                        <h1 className="text-5xl md:text-8xl lg:text-[110px] font-fukri font-extrabold leading-28  mb-2">
                            Food Rush
                        </h1>
                        <div className="flex items-center  gap-2">
                            <div className="w-20 h-1 bg-red-400 mx-auto lg:mx-0 rounded-full"></div>
                            <p className=" text-lg md:text-xl text-[#8f6f74] fontmedium">
                                Freshness delivered fast.
                            </p>
                        </div>

                    </div>

                    <div className="space-y-6">
                        <p className="text-2xl md:text-3xl font-semibold text-[#f4ede4] leading-snug">
                            Groceries, cooked meals & daily essentials
                        </p>

                        <p className="text-lg md:text-xl text-[#f4ede4]/75 font-light tracking-tight font-mono">
                            Your everyday needs delivered straight to your doorstep — fast, reliable,
                            and always fresh. From pantry staples to hot meals, we bring convenience
                            right to you.
                        </p>
                    </div>

                    <button
                        onClick={() => whatStep(1)}
                        className="bg-teal-400 text-black font-bold text-lg px-12 py-4 rounded-md border-4 shadow-xl outline-4 outline-yellow-500  border-black
                       hover:bg-[#e8e1d8] transition-all duration-300 hover:scale-105
                       hover:shadow-[0_0_30px_rgba(244,237,228,0.4)] cursor-pointer"
                    >
                        Get Started
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Welcome;

