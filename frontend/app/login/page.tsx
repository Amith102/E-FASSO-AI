"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock validation: Just ensure fields aren't empty
        if (email && password) {
            login(email);
        } else {
            alert("Please enter both email and password.");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-blue-500/30">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20 flex justify-center items-center">
                <div className="bg-neutral-900 border border-white/5 p-8 rounded-2xl w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-neutral-400 text-sm mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="demo@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-neutral-400 text-sm mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="••••••••"
                            />
                            <div className="text-right mt-1">
                                <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot password?</a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-2 transition-all"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-neutral-500 text-sm">
                        Don&apos;t have an account? <Link href="/signup" className="text-white hover:text-blue-400 font-medium">Sign up</Link>
                    </div>
                    <div className="mt-4 p-3 bg-blue-900/10 text-blue-400 text-xs rounded-lg text-center border border-blue-500/10">
                        <p><strong>Demo Mode:</strong> Use any email and password to log in.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
