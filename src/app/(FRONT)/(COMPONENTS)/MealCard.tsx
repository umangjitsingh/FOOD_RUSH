"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus, Star } from 'lucide-react';
import { IMeal } from "@/app/(BACK)/models/meal.model";

function MealCard({ meals }: { meals: IMeal[] }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const increment = (id: string) =>
        setQuantities(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    const decrement = (id: string) =>
        setQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) }));

    const qty = (id: string) => quantities[id] ?? 0;

    if (!meals.length) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border py-24">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No items found</p>
            </div>
        );
    }

    return (
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {meals.map((meal) => {
                const id = meal._id?.toString() || '';
                const count = qty(id);
                const img = Array.isArray(meal.image) ? meal.image[0] : meal.image;

                return (
                    <article
                        key={id}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/90 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_50px_-28px_var(--glow)]"
                    >
                        <div className="relative aspect-4/3 w-full overflow-hidden">
                            {img ? (
                                <Image
                                    src={img}
                                    alt={meal.name}
                                    fill
                                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-secondary">
                                    <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                                </div>
                            )}
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />

                            <span className="absolute top-2.5 left-2.5 rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white/80 backdrop-blur-md">
                                {meal.size}
                            </span>
                            <span className="absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-full border border-primary/20 bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-primary backdrop-blur-md">
                                <Star size={9} className="fill-primary text-primary" />
                                4.5
                            </span>
                        </div>

                        <div className="flex flex-1 flex-col gap-3 p-3.5">
                            <div className="flex flex-col gap-0.5">
                                <h3 className="line-clamp-1 text-sm leading-snug font-semibold capitalize text-foreground">
                                    {meal.name}
                                </h3>
                                <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                                    {meal.category}
                                </p>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-base font-bold text-primary tabular-nums">
                                    ${meal.price}
                                </span>

                                {count === 0 ? (
                                    <button
                                        onClick={() => increment(id)}
                                        className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-95"
                                    >
                                        <Plus size={12} />
                                        Add
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-2 py-1">
                                        <button
                                            onClick={() => decrement(id)}
                                            className="flex h-5 w-5 items-center justify-center rounded-full text-foreground transition-all hover:bg-white/10 active:scale-90"
                                        >
                                            <Minus size={11} />
                                        </button>
                                        <span className="min-w-[1.25rem] text-center text-xs font-bold text-primary tabular-nums">
                                            {count}
                                        </span>
                                        <button
                                            onClick={() => increment(id)}
                                            className="flex h-5 w-5 items-center justify-center rounded-full text-foreground transition-all hover:bg-white/10 active:scale-90"
                                        >
                                            <Plus size={11} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}

export default MealCard;
