"use client"
import React, { JSX, useState } from 'react';
import { UserShield, Bike, User, ArrowRight } from "lucide-react";
import clsx from "clsx";
import axios from "axios";
import { useSession } from "next-auth/react";
import AuthShell from "./AuthShell";

interface Role {
    value: string;
    icon: JSX.Element;
    label: string;
}

const ROLES: Role[] = [
    { value: 'admin', label: 'Admin', icon: <UserShield className="h-6 w-6" /> },
    { value: 'user', label: 'Diner', icon: <User className="h-6 w-6" /> },
    { value: 'delivery boy', label: 'Rider', icon: <Bike className="h-6 w-6" /> },
];

function EditRoleMobile() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [mobile, setMobile] = useState("");
    const { update } = useSession();

    const handleEdit = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/user/edit-role-mobile", { role: selectedRole, mobile: mobile });
            await update({ role: selectedRole })
            window.location.href = "/";
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <AuthShell title="Almost there" subtitle="Choose your path to continue.">
            <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => (
                    <button
                        key={r.value}
                        type="button"
                        className={clsx(
                            "flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border transition-all",
                            selectedRole === r.value
                                ? "border-primary bg-primary/15 text-primary shadow-[0_0_0_3px_rgb(240_180_41_/_18%)]"
                                : "border-border bg-muted/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        )}
                        onClick={() => setSelectedRole(r.value)}
                    >
                        {r.icon}
                        <span className="text-xs font-medium">{r.label}</span>
                    </button>
                ))}
            </div>

            <label htmlFor="mobile" className="mt-8 mb-2 block text-sm font-medium text-muted-foreground">Mobile number</label>
            <input
                type="tel"
                id="mobile"
                placeholder="0000000000"
                className="input-field !pl-4"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <button
                onClick={handleEdit}
                disabled={!selectedRole || mobile.length <= 9 || mobile.length > 10}
                className="btn-primary mt-5 w-full disabled:opacity-40"
            >
                Go to home <ArrowRight className="h-4 w-4" />
            </button>
        </AuthShell>
    );
}

export default EditRoleMobile;
