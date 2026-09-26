import Link from 'next/link';
import { Sparkles } from 'lucide-react';

function Logo() {
    return (
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Savor home">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_10px_28px_-8px_var(--glow)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <Sparkles size={18} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className="font-serif text-[1.45rem] tracking-[-0.04em]">
                savor<span className="text-primary">.</span>
            </span>
        </Link>
    );
}

export default Logo;
