"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
    const [orderNumber, setOrderNumber] = useState("");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setOrderNumber(`#ORD-${Math.floor(1000 + Math.random() * 9000)}`);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-500">
                    <CheckCircle size={32} />
                </div>
                <h1 className="text-2xl font-bold mb-2 dark:text-white">Order Confirmed!</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                    Thank you for your purchase. We&apos;ve sent a confirmation email to your inbox.
                </p>

                <div className="bg-slate-50 dark:bg-neutral-900 rounded-xl p-4 mb-8 text-left">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-500">Order Number</span>
                        <span className="font-mono text-blue-400">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Estimated Delivery</span>
                        <span>3-5 Business Days</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link href="/shop" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                        Continue Shopping
                    </Link>
                    <Link href="/profile" className="bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
                        View Order <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
