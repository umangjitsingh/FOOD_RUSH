import React from 'react';
import {ShoppingBag} from 'lucide-react';
import Link from "next/link";

function UserBag() {
    return (
        <Link href="/user/cart"
            className="relative flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--glow)] transition-transform hover:-translate-y-0.5"
            aria-label="Open your bag">
            <ShoppingBag size={18} strokeWidth={2.2} aria-hidden="true"/>
            <span
                className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-2 ring-background">2</span>
        </Link>
    );
}

export default UserBag;