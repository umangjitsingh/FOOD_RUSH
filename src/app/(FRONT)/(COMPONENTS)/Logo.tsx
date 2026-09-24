import React from 'react';
import Link from 'next/link';
import {Sparkles} from 'lucide-react';

function Logo() {
    return (
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Savor home">
                      <span
                          className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)] transition-transform duration-200 group-hover:-rotate-6">
                        <Sparkles size={18} strokeWidth={2.5} aria-hidden="true"/>
                      </span>
            <span className="font-serif text-[1.35rem] font-bold tracking-[-0.04em]">
                        savor<span className="text-primary">.</span>
                      </span>
        </Link>
    );
}

export default Logo;