import React, {useMemo, useState, useEffect} from 'react';
import {ShoppingBag} from 'lucide-react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/app/(FRONT)/REDUX/store";

function UserBag() {
    const [isMounted, setIsMounted] = useState(false);
    const {cartData} = useSelector((state: RootState) => state.cart);
    const itemCount = useMemo(() => cartData.reduce((sum, item) => sum + item.quantity, 0), [cartData]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="relative flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--glow)]">
                <ShoppingBag size={18} strokeWidth={2.2} aria-hidden="true"/>
            </div>
        );
    }

    return (
        <Link href="/user/cart"
            className="relative flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--glow)] transition-transform hover:-translate-y-0.5"
            aria-label="Open your bag">
            <ShoppingBag size={18} strokeWidth={2.2} aria-hidden="true"/>
            {itemCount > 0 && (
                <span
                    className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-2 ring-background">
                    {itemCount}
                </span>
            )}
        </Link>
    );
}

export default UserBag;