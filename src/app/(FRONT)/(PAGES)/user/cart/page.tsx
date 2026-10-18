"use client"
import React, {useMemo} from 'react';
import Link from "next/link";
import Image from "next/image";
import {ArrowLeft, ShoppingCart, ShoppingBag, Plus, Minus, Trash2} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/(FRONT)/REDUX/store";
import {addMealToCart, removeMealFromCart} from "@/app/(FRONT)/REDUX/cartSlice";

function CartPage() {
    const {cartData} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const totalItems = useMemo(
        () => cartData.reduce((sum, item) => sum + item.quantity, 0),
        [cartData]
    );
    const subtotal = useMemo(
        () => cartData.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
        [cartData]
    );

    const increment = (item: (typeof cartData)[number]) => {
        // strip quantity so the reducer controls it, same payload shape as MealCard
        const {quantity, ...meal} = item;
        dispatch(addMealToCart(meal));
    };

    return (
        <div className="mx-auto mt-8 mb-24 w-[95%] sm:w-[90%]">
            {/* Back button */}
            <Link
                href="/"
                className="mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-card"
            >
                <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true"/>
                <span className="hidden sm:inline">Back to Home</span>
            </Link>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.4}}
            >
                {/* Header */}
                <div className="mb-8 flex items-end justify-between gap-4">
                    <h2 className="flex items-center gap-3 text-2xl font-bold md:text-4xl">
                        <ShoppingCart className="h-7 w-7 text-primary md:h-9 md:w-9"/>
                        Your Cart
                    </h2>
                    {cartData.length > 0 && (
                        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {totalItems} {totalItems === 1 ? "item" : "items"}
                        </span>
                    )}
                </div>

                {cartData.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Items */}
                        <div className="flex flex-col gap-4 lg:col-span-2">
                            <AnimatePresence mode="popLayout">
                                {cartData.map((item) => (
                                    <motion.article
                                        layout
                                        key={item._id}
                                        initial={{opacity: 0, y: 30}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, x: -40}}
                                        transition={{duration: 0.3}}
                                        className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/90 p-4 transition-colors hover:border-primary/35 sm:flex-row"
                                    >
                                        {/* Image */}
                                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
                                            {item.image?.[0] ? (
                                                <Image
                                                    src={item.image[0]}
                                                    alt={item.name}
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover transition-transform duration-300 hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <ShoppingCart className="h-6 w-6 text-muted-foreground"/>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex min-w-0 flex-1 flex-col gap-1 text-center sm:text-left">
                                            <h3 className="line-clamp-1 text-lg font-semibold capitalize text-foreground">
                                                {item.name}
                                            </h3>
                                            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                                {item.category}
                                                {item.size && item.size !== "NA" ? ` · ${item.size}` : ""}
                                            </p>
                                            <p className="text-sm text-muted-foreground tabular-nums">
                                                ${Number(item.price).toFixed(2)} each
                                            </p>
                                        </div>

                                        {/* Quantity controls */}
                                        <div className="flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-1">
                                            <button
                                                onClick={() => dispatch(removeMealFromCart(item._id))}
                                                aria-label={`Decrease ${item.name} quantity`}
                                                className="flex h-7 w-7 items-center justify-center rounded-full text-foreground transition-all hover:bg-white/10 active:scale-90"
                                            >
                                                <Minus size={13}/>
                                            </button>
                                            <span className="min-w-6 text-center text-sm font-bold tabular-nums text-primary">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => increment(item)}
                                                aria-label={`Increase ${item.name} quantity`}
                                                className="flex h-7 w-7 items-center justify-center rounded-full text-foreground transition-all hover:bg-white/10 active:scale-90"
                                            >
                                                <Plus size={13}/>
                                            </button>
                                        </div>

                                        {/* Line total + remove */}
                                        <div className="flex items-center gap-3 sm:w-28 sm:flex-col sm:items-end sm:gap-2">
                                            <span className="text-base font-bold tabular-nums text-primary">
                                                ${(Number(item.price) * item.quantity).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => dispatch(removeMealFromCart(item._id))}
                                                aria-label={`Remove ${item.name}`}
                                                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-red-400"
                                            >
                                                <Trash2 size={13}/>
                                                Remove
                                            </button>
                                        </div>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order summary */}
                        <aside className="h-fit rounded-2xl border border-border bg-card/90 p-6 lg:sticky lg:top-24">
                            <h3 className="mb-5 text-lg font-semibold">Order Summary</h3>

                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Items</span>
                                    <span className="tabular-nums">{totalItems}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="my-1 border-t border-dashed border-border"/>
                                <div className="flex justify-between text-base font-bold">
                                    <span>Total</span>
                                    <span className="tabular-nums text-primary">${subtotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-95"
                            >
                                Proceed to Checkout
                            </button>
                            <Link
                                href="/"
                                className="mt-3 block text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Continue shopping
                            </Link>
                        </aside>
                    </div>
                ) : (
                    /* Empty state */
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.4, delay: 0.1}}
                        className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border py-24 text-center"
                    >
                        <ShoppingCart className="h-12 w-12 text-muted-foreground"/>
                        <div>
                            <p className="text-lg font-semibold">Your cart is empty</p>
                            <p className="text-sm text-muted-foreground">Add some delicious items to get started.</p>
                        </div>
                        <Link
                            href="/"
                            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-95"
                        >
                            <ShoppingBag size={16} strokeWidth={2.2} aria-hidden="true"/>
                            Continue Shopping
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

export default CartPage;
