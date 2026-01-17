"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface ShopFiltersProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
}

export default function ShopFilters({
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange
}: ShopFiltersProps) {
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);

    return (
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

            {/* Categories */}
            <div className="border-t border-white/10 pt-6">
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">Categories</h3>
                    <ChevronDown size={16} className={`text-neutral-500 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryOpen && (
                    <div className="space-y-2">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-lg transition-all ${activeCategory === category
                                    ? "bg-blue-600/10 text-blue-400 font-medium"
                                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span>{category}</span>
                                {activeCategory === category && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range */}
            <div className="border-t border-white/10 pt-6">
                <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">Price Range</h3>
                    <ChevronDown size={16} className={`text-neutral-500 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
                </button>

                {isPriceOpen && (
                    <div className="bg-neutral-900 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
                            <span>₹{priceRange[0]}</span>
                            <span>₹{priceRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                        />
                        <div className="flex gap-2 mt-4">
                            <div className="flex-1">
                                <label className="text-xs text-neutral-500 block mb-1">Min</label>
                                <input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Math.max(0, parseInt(e.target.value) || 0), priceRange[1]])}
                                    className="w-full bg-neutral-950 border border-white/10 rounded px-2 py-1 text-sm text-neutral-300 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-neutral-500 block mb-1">Max</label>
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                                    className="w-full bg-neutral-950 border border-white/10 rounded px-2 py-1 text-sm text-neutral-300 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
