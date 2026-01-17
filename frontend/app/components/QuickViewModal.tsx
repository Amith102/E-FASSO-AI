"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shirt, ShoppingBag, Star } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: string | number;
    image: string;
    images?: string[];
    sizes?: string[];
    description?: string;
}

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onTryOn: (product: Product) => void;
    onAddToCart: (product: Product) => void;
}

export default function QuickViewModal({ isOpen, onClose, product, onTryOn, onAddToCart }: QuickViewModalProps) {
    // Gallery State
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setActiveImageIndex(0);
            setSelectedSize(product.sizes?.[0] || "");
        }
    }, [product]);

    if (!isOpen || !product) return null;

    // Use images array if available, fallback to single image
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productImages = product.images || [product.image];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Left: Interactive Image Gallery */}
                        <div className="w-full md:w-1/2 bg-black/50 relative flex flex-col">
                            {/* Main Image */}
                            <div className="relative flex-1 overflow-hidden h-64 md:h-auto group">
                                <img
                                    src={productImages[activeImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = "https://placehold.co/800x1000/1a1a1a/FFF?text=Image+Unavailable";
                                    }}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                            </div>

                            {/* Thumbnail Strip */}
                            {productImages.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto bg-neutral-950/50 backdrop-blur border-t border-white/5">
                                    {productImages.map((img: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === idx ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Product Details & Size Selector */}
                        <div className="w-full md:w-1/2 flex flex-col h-[50vh] md:h-auto">
                            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-600/20">
                                        {product.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-sm font-bold">{product.rating}</span>
                                    </div>
                                </div>

                                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                                    {product.name}
                                </h2>
                                <p className="text-2xl font-mono text-white mb-4">₹{product.price}</p>

                                <p className="text-neutral-400 leading-relaxed text-sm mb-6">
                                    {product.description || "Experience the future of fashion. Perfectly tailored for a modern lifestyle."}
                                </p>

                                {/* Size Selector */}
                                {product.sizes && (
                                    <div className="mb-8">
                                        <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-widest mb-3">Select Size</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.sizes.map((size: string) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all border ${selectedSize === size
                                                        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-110'
                                                        : 'bg-neutral-800 text-neutral-400 border-white/5 hover:border-white/30 hover:text-white'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions (Fixed Bottom) */}
                            <div className="p-6 md:p-8 border-t border-white/10 bg-neutral-900/50 backdrop-blur-md">
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => onTryOn(product)}
                                        className="col-span-1 bg-neutral-800 hover:bg-neutral-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10 group"
                                    >
                                        <Shirt size={20} className="group-hover:rotate-12 transition-transform" />
                                        Visualize
                                    </button>
                                    <button
                                        onClick={() => onAddToCart(product)}
                                        className="col-span-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]"
                                    >
                                        <ShoppingBag size={20} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
