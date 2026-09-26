"use client"
import React, { SyntheticEvent, useState } from 'react';
import { User, Mail, Lock, ArrowRight, EyeClosed, Eye, Loader2 } from "lucide-react";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthShell from "./AuthShell";

function GoogleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 14 14">
            <g fill="none">
                <path fill="#f49f0d" d="M11.36 5.83H7.87a.51.51 0 0 0-.51.52v1.41a.51.51 0 0 0 .51.51h2.29a2.75 2.75 0 0 1-3 2.79c-2.24 0-3.32-1.9-3.32-4.06S5 2.94 7.16 2.94a4.07 4.07 0 0 1 2.64.86a.49.49 0 0 0 .72-.22l.63-1.44a.51.51 0 0 0-.15-.63a7.07 7.07 0 0 0-3.8-1C3.56.5 1.08 3.33 1.08 7s2.49 6.5 6.08 6.5s5.76-2.56 5.76-6c0-1.1-.44-1.67-1.56-1.67" />
                <path stroke="#df4a0a" strokeLinecap="round" strokeLinejoin="round" d="M11.36 5.83H7.87a.51.51 0 0 0-.51.52v1.41a.51.51 0 0 0 .51.51h2.29a2.75 2.75 0 0 1-3 2.79c-2.24 0-3.32-1.9-3.32-4.06S5 2.94 7.16 2.94a4.07 4.07 0 0 1 2.64.86a.49.49 0 0 0 .72-.22l.63-1.44a.51.51 0 0 0-.15-.63a7.07 7.07 0 0 0-3.8-1C3.56.5 1.08 3.33 1.08 7s2.49 6.5 6.08 6.5s5.76-2.56 5.76-6c0-1.1-.44-1.67-1.56-1.67" />
            </g>
        </svg>
    );
}

function RegisterForm({ whatStep }: { whatStep: (step: number) => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/register", { name, email, password });
            if (response.status === 201) {
                router.push("/login");
            }
            setLoading(false);
        } catch (e: any) {
            setError(e.response?.data?.message || "Registration failed");
            setLoading(false);
        }
    }
    const isValid = name && email && password;

    return (
        <AuthShell
            title="Create account"
            subtitle={<>Join <span className="font-serif italic text-primary">savor.</span> now</>}
        >
            <button type="button" className="mb-6 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => whatStep(1)}>
                ← Back
            </button>
            <form className="flex flex-col gap-3">
                <div className="relative">
                    <User className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input className="input-field" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="relative">
                    <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <button type="button" className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                    </button>
                    <input type={showPassword ? "text" : "password"} className="input-field pr-12" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button
                    disabled={!isValid}
                    className={clsx("btn-primary mt-2 w-full", !isValid && "cursor-not-allowed opacity-40")}
                    onClick={handleRegister}
                >
                    {loading ? <Loader2 size={17} className="animate-spin" /> : <span>Register now</span>}
                    <ArrowRight size={16} />
                </button>

                <div className="my-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="h-px flex-1 bg-border" />
                    or
                    <div className="h-px flex-1 bg-border" />
                </div>

                <button type="button" className="btn-ghost w-full" onClick={() => signIn("google")}>
                    <GoogleIcon />
                    Continue with Google
                </button>

                <p className="pt-2 text-center text-sm text-muted-foreground">
                    Already have an account?
                    <span className="cursor-pointer text-primary" onClick={() => router.push("/login")}> Login</span>
                </p>
                {error && <p className="text-center text-sm font-medium text-destructive">{error}</p>}
            </form>
        </AuthShell>
    );
}

export default RegisterForm;
