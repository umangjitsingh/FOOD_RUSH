import { ClipboardList, Truck, Sparkles } from 'lucide-react';

function AdminDash() {
    return (
        <div className="mx-auto w-[96%] max-w-7xl px-1 py-12 lg:max-w-[1400px]">
            <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">Kitchen console</p>
            <h1 className="mt-2 font-serif text-4xl italic">Tonight&apos;s service</h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                    { icon: Sparkles, label: 'Live meals', value: '—' },
                    { icon: ClipboardList, label: 'Open orders', value: '—' },
                    { icon: Truck, label: 'Out for delivery', value: '—' },
                ].map((stat) => (
                    <article key={stat.label} className="surface-card p-6">
                        <stat.icon className="h-5 w-5 text-primary" />
                        <p className="mt-6 text-3xl font-semibold tabular-nums">{stat.value}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default AdminDash;
