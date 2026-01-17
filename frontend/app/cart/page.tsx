"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const handleCheckout = () => {
        alert("Proceeding to checkout setup...");
        // Future integration: Redirect to checkout page or stripe session
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-blue-500/30">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border border-white/10 rounded-2xl bg-white/5">
                        <p className="text-xl text-neutral-400 mb-6">Your cart is empty.</p>
                        <Link
                            href="/shop"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex gap-6 bg-neutral-900 border border-white/5 p-4 rounded-xl items-center"
                                    >
                                        <div className="w-24 h-24 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                            <p className="text-neutral-400 text-sm mb-2">₹{item.price}</p>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3">
                                            <span className="font-bold text-xl">₹{item.price * item.quantity}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-900/20 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-neutral-900 border border-white/5 p-8 rounded-2xl h-fit sticky top-32">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="flex justify-between mb-4 text-neutral-400">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between mb-8 text-neutral-400">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <div className="border-t border-white/10 pt-4 mb-8 flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span>${cartTotal}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                            >
                                Checkout <ArrowRight size={18} />
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full mt-4 text-sm text-neutral-500 hover:text-white transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
