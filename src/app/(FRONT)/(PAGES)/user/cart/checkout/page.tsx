"use client"
import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import Link from "next/link";
import {ArrowLeft, MapPin, Phone, User2, Home, Building, Bookmark, Building2, Search} from "lucide-react";
import {useSession} from "next-auth/react";
import dynamic from 'next/dynamic';

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
        <div className="mx-auto mt-8 mb-24 w-[95%] sm:w-[90%]">

            <Link href="/user/cart"
                  className="mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-card">
                <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true"/>
                <span className="hidden sm:inline">Back to Cart</span>
            </Link>

            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4}}>

                <div className="mb-4 flex items-end justify-between gap-4 ml-2">
                    <h2 className="flex items-center gap-3 text-2xl font-serif md:text-3xl">
                        Checkout Now
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{opacity: 0, x: -10, y: -10}}
                        animate={{opacity: 1, x: 0, y: 0}}
                        transition={{duration: 0.8}}
                        className="rounded-lg bg-card/60 shadow-amber-400/10 shadow-xs hover:shadow-sm transition-colors p-6 border border-border duration-300">

                        <h2 className="flex items-center gap-2 text-xl font-medium md:text-2xl mb-4">
                            <MapPin className="h-8 w-9 text-white bg-primary/20 rounded-full p-2"/> Delivery Details
                        </h2>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 relative w-full rounded-md border border-border">
                                <User2 className="absolute top-2.5 left-2.5 text-primary/40" size={17}/>
                                <input type="text" placeholder="Name" value={userData?.user?.name || ""} readOnly
                                       className="p-2 ml-7 outline-none capitalize"/>
                            </div>

                            <div className="flex items-center gap-2 relative w-full rounded-md border border-border">
                                <Phone className="absolute top-2.5 left-2.5 text-primary/40" size={17}/>
                                <input type="text" placeholder="Phone" value={addressDetails.mobile}
                                       onChange={(e) => setAddressDetails({...addressDetails, mobile: e.target.value})}
                                       className="p-2 ml-7 outline-none"/>
                            </div>

                            <div className="flex items-center gap-2 relative w-full rounded-md border border-border">
                                <Home className="absolute top-2.5 left-2.5 text-primary/40" size={17}/>
                                <input type="text" placeholder="Full address" value={addressDetails.fullAddress}
                                       onChange={(e) => setAddressDetails({...addressDetails, fullAddress: e.target.value})}
                                       className="p-2 ml-7 outline-none"/>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="relative rounded-md border border-border">
                                    <Building className="absolute top-2.5 left-2.5 text-primary/40" size={17}/>
                                    <input type="text" placeholder="City" value={addressDetails.city}
                                           onChange={(e) => setAddressDetails({...addressDetails, city: e.target.value})}
                                           className="p-2 ml-7 outline-none"/>
                                </div>

                                <div className="relative rounded-md border border-border">
                                    <Building2 className="absolute top-2.5 left-2.5 text-primary/40" size={17}/>
                                    <input type="text" placeholder="State" value={addressDetails.state}
                                           onChange={(e) => setAddressDetails({...addressDetails, state: e.target.value})}
                                           className="p-2 ml-7 outline-none"/>
                                </div>

                                <div className="relative rounded-md border border-border">
                                    <Bookmark className="absolute top-2.5 left-2.5 text-primary/40" size={17}/>
                                    <input type="text" placeholder="Pincode" value={addressDetails.pincode}
                                           onChange={(e) => setAddressDetails({...addressDetails, pincode: e.target.value})}
                                           className="p-2 ml-7 outline-none"/>
                                </div>
                            </div>

                            <div>
                                <div className="relative rounded-md border border-border">
                                    <Search className="absolute top-2.5 left-2.5 text-primary/40" size={17}/>
                                    <input type="text" placeholder="Search city or area ...."
                                           value={searchText}
                                           onChange={(e) => setSearchText(e.target.value)}
                                           onKeyDown={(e) => {
                                               if (e.key === "Enter") {
                                                   e.preventDefault();
                                                   handleSearch();
                                               }
                                           }}
                                           className="p-2 ml-7 outline-none"/>
                                    <button
                                        type="button"
                                        onClick={handleSearch}
                                        disabled={searching}
                                        className="bg-primary/40 px-7 py-1 rounded-sm border border-border absolute right-1 top-0.75 hover:bg-primary/50 disabled:opacity-50">
                                        {searching ? "Searching..." : "Search"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div></div>
                </div>

                <div className="relative mt-6 h-96 rounded-xl overflow-hidden border border-border shadow-inner">
                    <MapView position={position} accuracy={accuracy} onPositionChange={handlePositionChange}/>
                </div>
            </motion.div>
        </div>
    );
}

export default Checkout;