"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    signup: (name: string, email: string) => void;
    logout: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addOrder: (order: any) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email: string) => {
        // Mock Login
        const mockUser = {
            name: email.split("@")[0], // Use part of email as name if not known
            email: email,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop" // default avatar
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        router.back(); // Return to previous page
    };

    const signup = (name: string, email: string) => {
        // Mock Signup
        const mockUser = {
            name: name,
            email: email,
            avatar: "https://github.com/shadcn.png"
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        router.push("/"); // Go to home after signup
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addOrder = (order: any) => {
        console.log("Mock Order Added:", order);
        // In a real app, this would send to backend
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, addOrder, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
