"use client"
import React, {Fragment, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import Link from "next/link";
import {
    ArrowLeft,
    MapPin,
    Phone,
    User2,
    Home,
    Building,
    Bookmark,
    Building2,
    Search,
    CreditCard,
    CreditCardIcon, Footprints
} from "lucide-react";
import {useSession} from "next-auth/react";
import dynamic from 'next/dynamic';
import {useSelector} from "react-redux";
import {RootState} from "@/app/(FRONT)/REDUX/store";


const MapView = dynamic(() => import("@/app/(FRONT)/(COMPONENTS)/MapView"), {
    ssr: false,
    loading: () => <div className="w-full h-96 flex items-center justify-center text-muted-foreground">Loading map...</div>
});

type Position = [number, number];

// Turn a Nominatim response into the form fields
function parseAddress(data: any) {
    const a = data?.address ?? {};
    return {
        city: a.city || a.town || a.village || a.suburb || a.county || "",
        state: a.state || "",
        pincode: a.postcode || "",
        fullAddress: data?.display_name || "",
    };
}

async function reverseGeocode([lat, lon]: Position) {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lon}`
    );
    if (!res.ok) throw new Error("Reverse geocoding failed");
    return parseAddress(await res.json());
}

async function forwardGeocode(query: string) {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=1&q=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error("Search failed");
    const results = await res.json();
    if (!results.length) return null;
    const r = results[0];
    return {position: [parseFloat(r.lat), parseFloat(r.lon)] as Position, address: parseAddress(r)};
}

function Checkout() {
    const {data: userData} = useSession();
    const { subTotal, deliverFee, total} = useSelector((state: RootState) => state.cart);

    const [paymentMethod,setPaymentMethod]=useState("cod")

    const [addressDetails, setAddressDetails] = useState({
        mobile: "",
        city: "",
        state: "",
        pincode: "",
        fullAddress: "",
    });
    const [position, setPosition] = useState<Position | null>(null);
    const [accuracy, setAccuracy] = useState<number | undefined>(undefined);
    const [searchText, setSearchText] = useState("");
    const [searching, setSearching] = useState(false);

    // Fill address fields from a position (used after geolocation and after dragging the pin)
    const fillAddressFrom = async (pos: Position) => {
        try {
            const address = await reverseGeocode(pos);
            setAddressDetails((prev) => ({...prev, ...address}));
        } catch (err) {
            console.error(err);
        }
    };

    // Called when the user drags the pin
    const handlePositionChange = (pos: Position) => {
        setPosition(pos);
        setAccuracy(undefined); // the user has corrected it, so the uncertainty circle no longer applies
        fillAddressFrom(pos);
    };

    // Called by the Search button
    const handleSearch = async () => {
        if (!searchText.trim()) return;
        setSearching(true);
        try {
            const result = await forwardGeocode(searchText);
            if (!result) {
                alert("Location not found. Try a different search.");
                return;
            }
            setPosition(result.position);
            setAccuracy(undefined);
            setAddressDetails((prev) => ({...prev, ...result.address}));
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    useEffect(() => {
        const fallback: Position = [40.7128, -74.0060]; // New York

        if (!navigator.geolocation) {
            setPosition(fallback);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const {latitude, longitude, accuracy} = pos.coords;
                const p: Position = [latitude, longitude];
                setPosition(p);
                setAccuracy(accuracy);
                fillAddressFrom(p);
            },
            (error) => {
                console.error("Geolocation error:", error);
                setPosition(fallback);
            },
            {enableHighAccuracy: true, maximumAge: 0, timeout: 10000}
        );
    }, []);

    return (
        <div className="mx-auto mt-8 mb-24 w-[95%] sm:w-[90%] lg:w-[85%] xl:w-[80%]">

            <Link href="/user/cart"
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-card hover:shadow-md">
                <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true"/>
                <span className="hidden sm:inline">Back to Cart</span>
            </Link>

            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4}}>

                <div className="mb-8 flex items-end justify-between gap-4">
                    <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight md:text-4xl">
                        Checkout
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{opacity: 0, x: -10, y: -10}}
                        animate={{opacity: 1, x: 0, y: 0}}
                        transition={{duration: 0.8}}
                        className="rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-lg shadow-primary/5 border border-border/50 p-6 md:p-8">

                        <h2 className="flex items-center gap-3 text-xl font-semibold md:text-2xl mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <MapPin className="h-5 w-5"/>
                            </div>
                            Delivery Details
                        </h2>

                        <div className="space-y-4">
                            <div className="relative">
                                <User2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
                                <input type="text" placeholder="Name" value={userData?.user?.name || ""} readOnly
                                       className="w-full rounded-xl border border-border/50 bg-muted/30 py-3 pl-11 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 capitalize transition-all"/>
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
                                <input type="text" placeholder="Phone" value={addressDetails.mobile}
                                       onChange={(e) => setAddressDetails({...addressDetails, mobile: e.target.value})}
                                       className="w-full rounded-xl border border-border/50 bg-background py-3 pl-11 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
                            </div>

                            <div className="relative">
                                <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
                                <input type="text" placeholder="Full address" value={addressDetails.fullAddress}
                                       onChange={(e) => setAddressDetails({...addressDetails, fullAddress: e.target.value})}
                                       className="w-full rounded-xl border border-border/50 bg-background py-3 pl-11 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                                    <input type="text" placeholder="City" value={addressDetails.city}
                                           onChange={(e) => setAddressDetails({...addressDetails, city: e.target.value})}
                                           className="w-full rounded-xl border border-border/50 bg-background py-3 pl-10 pr-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
                                </div>

                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                                    <input type="text" placeholder="State" value={addressDetails.state}
                                           onChange={(e) => setAddressDetails({...addressDetails, state: e.target.value})}
                                           className="w-full rounded-xl border border-border/50 bg-background py-3 pl-10 pr-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
                                </div>

                                <div className="relative">
                                    <Bookmark className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                                    <input type="text" placeholder="Pincode" value={addressDetails.pincode}
                                           onChange={(e) => setAddressDetails({...addressDetails, pincode: e.target.value})}
                                           className="w-full rounded-xl border border-border/50 bg-background py-3 pl-10 pr-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
                                </div>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
                                <input type="text" placeholder="Search city or area..."
                                       value={searchText}
                                       onChange={(e) => setSearchText(e.target.value)}
                                       onKeyDown={(e) => {
                                           if (e.key === "Enter") {
                                               e.preventDefault();
                                               handleSearch();
                                           }
                                           }}
                                           className="w-full rounded-xl border border-border/50 bg-background py-3 pl-11 pr-28 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    disabled={searching}
                                    className="absolute right-1.5 top-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {searching ? "Searching..." : "Search"}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, x: -10, y: -10}}
                        animate={{opacity: 1, x: 0, y: 0}}
                        transition={{duration: 0.8}}
                        className="rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-lg shadow-primary/5 border border-border/50 p-6 md:p-8">

                        <h2 className="flex items-center gap-3 text-xl font-semibold md:text-2xl mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <CreditCard className="h-5 w-5"/>
                            </div>
                            Payment Method
                        </h2>

                        <div className="space-y-3 mb-6">
                          <button 
                              className={`relative w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5 ${paymentMethod === 'stripe' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border/50 bg-background'}`}
                              onClick={() => setPaymentMethod('stripe')}>
                              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${paymentMethod === 'stripe' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                  <CreditCardIcon size={20}/>
                              </div>
                              <div>
                                  <p className="font-medium">Pay Online</p>
                                  <p className="text-xs text-muted-foreground">Secure payment via Stripe</p>
                              </div>
                          </button>
                            <button 
                                className={`relative w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5 ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border/50 bg-background'}`}
                                onClick={() => setPaymentMethod('cod')}>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${paymentMethod === 'cod' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                    <Footprints size={20}/>
                                </div>
                                <div>
                                    <p className="font-medium">Pay On Delivery</p>
                                    <p className="text-xs text-muted-foreground">Cash when you receive</p>
                                </div>
                            </button>

                            <div className="rounded-xl bg-muted/30 p-4">
                                <div className="flex flex-col gap-3 text-sm">

                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="tabular-nums font-medium">${subTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Delivery Fee</span>
                                        <span className="tabular-nums font-medium">${deliverFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Taxes (13%)</span>
                                        <span className="tabular-nums font-medium">${((subTotal+deliverFee)*0.13).toFixed(2)}</span>
                                    </div>
                                    <div className="my-2 border-t border-border/50"/>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="tabular-nums text-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/user/cart/checkout"
                                  className="mt-6 block w-full rounded-xl bg-primary px-6 py-4 text-center text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
                            >
                                Place Order
                            </Link>


                        </div>
                    </motion.div>


                </div>

                <div className="relative mt-8 h-[450px] rounded-2xl overflow-hidden border border-border/50 shadow-lg shadow-primary/5">
                    <MapView position={position} accuracy={accuracy} onPositionChange={handlePositionChange}/>
                </div>


            </motion.div>
        </div>
    );
}

export default Checkout;