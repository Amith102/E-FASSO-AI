"use client";

import Link from 'next/link';
import { useLayoutEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();

    useLayoutEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const nav = document.querySelector('nav');
            const currentScrollY = window.scrollY;

            // 1. Style Logic (Transparency/Background)
            // Only switch to light/glass theme when past the Hero section
            const heroHeight = window.innerHeight - 80;

            if (currentScrollY > heroHeight) {
                nav?.classList.add('bg-white/80', 'dark:bg-black/90', 'shadow-sm', 'border-b', 'border-black/5', 'dark:border-white/10', 'text-neutral-900', 'dark:text-white');
                nav?.classList.remove('bg-transparent', 'text-white');
            } else {
                nav?.classList.remove('bg-white/80', 'dark:bg-black/90', 'shadow-sm', 'border-b', 'border-black/5', 'dark:border-white/10', 'text-neutral-900', 'dark:text-white');
                nav?.classList.add('bg-transparent', 'text-white');
            }

            // 2. Hide/Show Logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling DOWN -> Hide
                nav?.classList.add('-translate-y-full');
            } else {
                // Scrolling UP -> Show
                nav?.classList.remove('-translate-y-full');
            }

            lastScrollY = currentScrollY;
        };

        handleScroll(); // Initial check
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed w-full z-50 top-0 p-6 flex justify-between items-center transition-all duration-300 text-white bg-transparent">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
                E-FASSO.AI
            </Link>

            <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
                <Link href="#" className="hover:text-white transition-colors">Technology</Link>
                <Link href="#" className="hover:text-white transition-colors">About</Link>
                <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>

            <div className="flex gap-4 items-center">
                <Link href="/shop" className="text-white hover:text-blue-400 font-medium transition-colors flex items-center gap-2">
                    Shop
                </Link>

                <Link href="/cart" className="relative p-2 text-white hover:text-blue-400 transition-colors">
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full text-[10px] flex items-center justify-center font-bold text-white">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {user ? (
                    <div className="relative group">
                        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-white">{user.name}</p>
                                <span className="text-xs text-neutral-400 block">View Profile</span>
                            </div>
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-9 h-9 rounded-full border border-white/20"
                            />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform scale-95 group-hover:scale-100">
                            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                My Profile
                            </Link>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link href="/login" className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                        Login
                    </Link>
                )}

                <Link href="/upload" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors hidden sm:block">
                    Launch App
                </Link>
                <ThemeToggle />
            </div>
        </nav>
    );
}
