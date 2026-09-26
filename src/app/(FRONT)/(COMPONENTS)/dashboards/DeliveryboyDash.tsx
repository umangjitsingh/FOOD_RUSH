import { Bike, MapPin, Package } from 'lucide-react';

function DeliveryboyDash() {
    return (
        <div className="mx-auto w-[96%] max-w-7xl px-1 py-12 lg:max-w-[1400px]">
            <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">Rider hub</p>
            <h1 className="mt-2 font-serif text-4xl italic">Ready when you are</h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                    { icon: Package, label: 'Assigned drops', value: '0' },
                    { icon: MapPin, label: 'Next stop', value: '—' },
                    { icon: Bike, label: 'Status', value: 'Online' },
                ].map((stat) => (
                    <article key={stat.label} className="surface-card p-6">
                        <stat.icon className="h-5 w-5 text-primary" />
                        <p className="mt-6 text-3xl font-semibold">{stat.value}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default DeliveryboyDash;
