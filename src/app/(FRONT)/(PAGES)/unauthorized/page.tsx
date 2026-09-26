import Link from 'next/link';
import { ShieldOff } from 'lucide-react';

async function Unauthorized() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid size-14 place-items-center rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive">
                <ShieldOff />
            </span>
            <h1 className="font-serif text-4xl italic">Access denied</h1>
            <p className="max-w-md text-sm text-muted-foreground">You don&apos;t have permission to view this page.</p>
            <Link href="/" className="btn-primary mt-2">Back home</Link>
        </div>
    );
}

export default Unauthorized;
