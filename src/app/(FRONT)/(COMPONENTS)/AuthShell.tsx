import type { ReactNode } from 'react';
import Logo from './Logo';

export default function AuthShell({
    children,
    title,
    subtitle,
}: {
    children: ReactNode;
    title: string;
    subtitle?: ReactNode;
}) {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
            <div className="pointer-events-none absolute -right-24 top-0 h-112 w-md rounded-full bg-primary/15 blur-[140px]" />
            <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-[24rem] rounded-full bg-indigo-500/15 blur-[130px]" />

            <div className="mb-8">
                <Logo />
            </div>

            <div className="glow-ring relative w-full max-w-lg rounded-3xl p-px">
                <div className="surface-card relative overflow-hidden rounded-[23px] px-6 py-10 sm:px-10">
                    <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                    <div className="mb-8 text-center">
                        <h1 className="font-serif text-4xl italic tracking-tight sm:text-5xl">{title}</h1>
                        {subtitle && (
                            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </main>
    );
}
