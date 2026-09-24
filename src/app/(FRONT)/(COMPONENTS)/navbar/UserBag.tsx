import React from 'react';
import {ShoppingBag} from 'lucide-react';

function UserBag() {
    return (
        <button
            className="relative flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)] transition-transform hover:-translate-y-0.5"
            aria-label="Open your bag">
            <ShoppingBag size={18} strokeWidth={2.2} aria-hidden="true"/>
            <span
                className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-2 ring-background">2</span>
        </button>
    );
}

export default UserBag;