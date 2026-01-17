"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, ShieldCheck, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, addOrder } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) router.push('/login');
        if (cartItems.length === 0) router.push('/cart');
    }, [user, cartItems, router]);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API Processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create Order Object
        const newOrder = {
            id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            total: cartTotal,
            status: "Processing",
            items: cartItems.map(item => item.name)
        };

        // Save to History & Clear Cart
        addOrder(newOrder);
        clearCart();

        setLoading(false);
        router.push('/order-success');
    };

    if (!user || cartItems.length === 0) return null;

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-blue-500/30">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Forms */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Shipping Address */}
                        <section className="bg-neutral-900 border border-white/5 p-6 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-2 bg-blue-600/10 rounded-lg text-blue-500"><Truck size={20} /></span>
                                <h2 className="text-xl font-bold">Shipping Information</h2>
                            </div>
                            <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-neutral-400 mb-2">Full Name</label>
                                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500" placeholder="John Doe" defaultValue={user.name} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-neutral-400 mb-2">Address</label>
                                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500" placeholder="123 Fashion St" />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">City</label>
                                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500" placeholder="New York" />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Zip Code</label>
                                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500" placeholder="10001" />
                                </div>
                            </form>
                        </section>

                        {/* Payment Details */}
                        <section className="bg-neutral-900 border border-white/5 p-6 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-2 bg-green-600/10 rounded-lg text-green-500"><CreditCard size={20} /></span>
                                <h2 className="text-xl font-bold">Payment Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-neutral-400 mb-2">Card Number</label>
                                    <input required type="text" maxLength={19} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Expiry Date</label>
                                    <input required type="text" maxLength={5} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">CVC</label>
                                    <input required type="password" maxLength={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-blue-500" placeholder="123" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500">
                                <ShieldCheck size={14} />
                                <span>Payments are secure and encrypted. (Mock Mode)</span>
                            </div>
                        </section>
                    </div>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="bg-neutral-900 border border-white/5 p-6 rounded-2xl sticky top-32">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 bg-neutral-800 rounded bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-neutral-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span>${item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-2">
                                <div className="flex justify-between text-neutral-400">
                                    <span>Subtotal</span>
                                    <span>${cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-xl text-white pt-2 border-t border-white/10 mt-2">
                                    <span>Total</span>
                                    <span>${cartTotal}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
