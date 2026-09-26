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
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
            <div className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[140px]" />
            <button
                className="absolute top-5 right-5 flex items-center gap-2 rounded-full border border-red-500/25 px-4 py-2 text-sm font-medium text-red-300 transition-all hover:bg-red-500/15"
                onClick={handleSignOut}>
                <LogOut size={16}/>
                Logout
            </button>

            <div className="glow-ring relative w-full max-w-lg rounded-3xl p-px">
                <div className="surface-card relative overflow-hidden rounded-[23px] px-6 py-10 sm:px-10">
                    <div className="mb-8 text-center">
                        <h1 className="font-serif text-4xl italic sm:text-5xl">Add meal</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Create the next <span className="text-primary">delicious</span> listing.</p>
                    </div>

                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="relative">
                            <Utensils className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                            <input
                                type="text"
                                id="name"
                                placeholder="Meal name (e.g., Grilled Chicken)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Tag className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                                <select
                                    name="category"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="input-field appearance-none"
                                >
                                    <option value="">Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative flex-1">
                                <select
                                    name="size"
                                    id="size"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="input-field appearance-none !pl-4"
                                >
                                    <option value="">Size</option>
                                    {["Small", "Medium", "Large"].map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="relative">
                            <DollarSign className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                            <input
                                type="text"
                                id="price"
                                placeholder="Price (e.g., 6.99)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <div className="relative">
                            <PlusCircle className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                            <input type="file" id="image" onChange={handleImageChange} className="hidden" multiple />
                            <label htmlFor="image" className="input-field flex cursor-pointer items-center">
                                <span className="text-muted-foreground">{imageFiles.length > 0 ? `${imageFiles.length} file(s) selected` : "Choose images"}</span>
                            </label>
                        </div>
                        {imageArr.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {imageArr.map((i) => (
                                    <Image key={i} src={i} alt="Preview" width={72} height={72} className="h-16 w-16 rounded-xl object-cover" />
                                ))}
                            </div>
                        )}

                        <button type="submit" className="btn-primary mt-3 w-full" disabled={loading}>
                            {loading ? <Loader className="h-5 w-5 animate-spin"/> : <>Add meal <Check size={17}/></>}
                        </button>
                    </form>

                    <Link href="/" className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary">
                        <ArrowLeft size={16}/>
                        Back to dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default addMeal;