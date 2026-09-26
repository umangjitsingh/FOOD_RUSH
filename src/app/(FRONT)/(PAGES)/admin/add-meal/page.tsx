"use client"
import React from 'react';
import {ArrowLeft, PlusCircle, Utensils, Tag, DollarSign, Check, Loader, LogOut} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {signOut} from "next-auth/react";


const categories: string[] = ["Salads", "Indian", "Hakka-Chinese", "Pizza & Pasta", "Snacks & Biscuits", "Desserts", "Beverages", "Other"];

function addMeal() {
    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [size, setSize] = React.useState("");
    const [imageFiles, setImageFiles] = React.useState<File[]>([]);
    const [imageArr, setImageArr] = React.useState<string[]>([]);
    const [price, setPrice] = React.useState<string>("");

    const [loading, setLoading] = React.useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const newFiles = Array.from(files);

        if (imageFiles.length + newFiles.length > 4) {
            alert("Maximum 4 images allowed");
            return;
        }

        setImageFiles(prev => [...prev, ...newFiles]);
        setImageArr(prev => [...prev, ...newFiles.map(f => URL.createObjectURL(f))]);

    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category);
            formData.append("size", size);
            formData.append("price", String(price));



            // Append each image under the same key "images"
            imageFiles.forEach(file => formData.append("images", file));
            const response = await axios.post("/api/admin/add-meal", formData);
            console.log("response from add-meal  --->", response.data);
            setLoading(false);
            alert("Meal added successfully!");
            setName("");
            setCategory("");
            setSize("");
            setPrice("");

            setImageFiles([]);
            setImageArr([]);

        } catch (error: any) {
            console.error("Error adding meal:", error);
            if (error?.response?.data) {
                alert(`Error: ${error.response.data.message || error.message}`);
            } else {
                alert("Failed to add meal");
            }
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut({callbackUrl: "/login"})
    }
    return (
        <div className="overflow-hidden bg-background text-foreground w-full min-h-screen">

            {/* REAL TOP ANCHOR */}

            <section className="relative mx-auto max-w-360 px-5 py-5 sm:px-8 lg:px-12 scroll-mt-20">
                {/* Background blobs */}
                <div
                    className="pointer-events-none absolute -right-20 top-8 h-120 w-lg rounded-full bg-primary/10 blur-[130px]"/>
                <div
                    className="pointer-events-none absolute bottom-6 left-0 h-120 w-120 rounded-full bg-primary/4 blur-[110px]"/>

                <div className="flex items-center justify-center h-screen w-full">
                    <div
                        className="w-full max-w-xl bg-border hover:bg-linear-to-br hover:from-primary/10 hover:to-primary/40 h-auto transition-all flex items-center justify-center p-px rounded-2xl">
                        <div className="bg-black h-full w-full z-90 rounded-2xl p-8">
                            {/* Header */}
                            <div className="w-full flex flex-col items-center justify-center mb-8">
                                <h1 className="max-w-2xl font-serif text-4xl font-bold leading-[0.98] tracking-snug text-balance sm:text-5xl lg:text-[58px] pt-4">Add
                                    Meal</h1>
                                <p className="text-lg font-medium lowercase tracking-tight text-muted-foreground/60 pt-1.5">create <span
                                    className="italic font-extrabold text-lg text-primary/90 uppercase">delicious.</span> menu
                                </p>
                            </div>

                            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                                <div className="w-full px-8 space-y-5">

                                    {/* Name Input */}
                                    <div className="relative z-90">
                                        <Utensils
                                            className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Meal name (e.g., Grilled Chicken)"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full border-2 border-border pl-12 py-3 rounded-md placeholder:text-muted-foreground bg-background"
                                        />
                                    </div>

                                    {/* Category & Size Row */}
                                    <div className="flex gap-4">
                                        <div className="relative z-90 flex-1">
                                            <Tag
                                                className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
                                            <select
                                                name="category"
                                                id="category"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full border-2 border-border pl-12 py-3 rounded-md placeholder:text-muted-foreground bg-background appearance-none cursor-pointer"
                                            >
                                                <option value="">Category</option>
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="relative z-90 flex-1">
                                            <select
                                                name="size"
                                                id="size"
                                                value={size}
                                                onChange={(e) => setSize(e.target.value)}
                                                className="w-full border-2 border-border px-4 py-3 rounded-md placeholder:text-muted-foreground bg-background appearance-none cursor-pointer"
                                            >
                                                <option value="">Size</option>
                                                {["Small", "Medium", "Large"].map((size) => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Price Input */}
                                    <div className="relative z-90">
                                        <DollarSign
                                            className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
                                        <input
                                            type="text"
                                            id="price"
                                            placeholder="Price (e.g., 6.99)"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full border-2 border-border pl-12 py-3 rounded-md placeholder:text-muted-foreground bg-background"
                                        />
                                    </div>



                                    <div className="relative z-90">
                                        <PlusCircle
                                            className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={(e) => handleImageChange(e)}
                                            className="hidden"
                                            multiple
                                        />
                                        <label
                                            htmlFor="image"
                                            className="w-full border-2 border-border pl-12 py-3 rounded-md placeholder:text-muted-foreground bg-background flex items-center cursor-pointer"
                                        >
                                            <span className="text-muted-foreground">{imageFiles.length > 0 ? `${imageFiles.length} file(s) selected` : "Choose file"}</span>
                                        </label>
                                    </div>
                                    <div className="mt-4 flex items-center gap-1">
                                        {imageArr.length > 0 && imageArr.map((i) => (

                                                <Image key={i} src={i} alt="Preview" width={80} height={80}
                                                       className="rounded-md"  />

                                                 )
                                        )
                                        }
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-8 flex items-center w-full px-8">
                                    <button
                                        type="submit"
                                        className="w-full flex shrink-0 items-center justify-center gap-4 rounded-md bg-primary px-3 py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] sm:px-5"
                                        disabled={loading}
                                    >
                                       {loading ? <Loader className="animate-spin w-5 h-5"/> : <> <span> Meal</span> <Check size={17}/> </>}

                                    </button>
                                </div>
                            </form>

                            {/* Back Link */}
                            <div className="mt-6 flex items-center justify-center">
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <ArrowLeft size={16}/>
                                    <span>Back to Dashboard</span>
                                </Link>
                            </div>
                        </div>
                        <button
                            className="absolute top-4 right-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-400 bg-transparent border border-red-500/30 transition-all duration-300 hover:bg-red-950/50 hover:border-red-500/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-900/20 active:scale-95"
                            onClick={handleSignOut}>
                            <LogOut size={16}/>
                            Logout
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default addMeal;