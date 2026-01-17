"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shirt, SlidersHorizontal, ShoppingBag, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import ShopFilters from '../components/ShopFilters';
import QuickViewModal from '../components/QuickViewModal';

type SortOption = "featured" | "price-low" | "price-high" | "newest";

export default function ShopPage() {
    const { addToCart } = useCart();
    const router = useRouter();

    // Filter States
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Pagination State
    const [visibleCount, setVisibleCount] = useState(12);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Quick View State
    const [quickViewProduct, setQuickViewProduct] = useState<typeof PRODUCTS[0] | null>(null);

    // Reset visible count when filters change
    useEffect(() => {
        setVisibleCount(12);
    }, [activeCategory, searchQuery, priceRange, sortBy]);

    // Derived Logic
    const allFilteredProducts = useMemo(() => {
        let result = [...PRODUCTS];

        // 1. Filter by Category
        if (activeCategory !== "All") {
            result = result.filter(p => p.category === activeCategory);
        }

        // 2. Filter by Search
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // 3. Filter by Price
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // 4. Sort
        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "newest") {
            result.sort((a, b) => b.id - a.id); // Mock "newest" by ID
        }

        return result;
    }, [activeCategory, searchQuery, priceRange, sortBy]);

    const visibleProducts = allFilteredProducts.slice(0, visibleCount);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + 12, allFilteredProducts.length));
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [allFilteredProducts.length, visibleCount]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTryOn = (product: any) => {
        localStorage.setItem('virtualTryOnProduct', JSON.stringify(product));
        router.push('/upload');
    };

    const openQuickView = (product: typeof PRODUCTS[0]) => {
        setQuickViewProduct(product);
    };

    const closeQuickView = () => {
        setQuickViewProduct(null);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30 font-sans">
            <Navbar />

            {/* Header / Hero Small */}
            <div className="pt-32 pb-12 px-6 border-b border-white/5 bg-gradient-to-b from-neutral-900 to-neutral-950">
                <div className="container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Shop Collection
                    </h1>
                    <p className="text-neutral-400 max-w-xl text-lg">
                        Discover our latest arrivals tailored for your style. Use our AI Virtual Try-On to find your perfect fit.
                    </p>
                </div>
            </div>

            <main className="container max-w-7xl mx-auto px-6 py-12">

                {/* Header Section with Filters (Top Bar Style) */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <p className="text-neutral-500 text-sm">
                            Showing <span className="text-white font-bold">{visibleProducts.length}</span> of <span className="text-white font-bold">{allFilteredProducts.length}</span> results
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            className="flex items-center gap-2 bg-neutral-900 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                        >
                            <SlidersHorizontal size={16} />
                            Filters
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-500 hidden md:inline">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="bg-neutral-900 border border-white/10 rounded-lg py-2 px-3 text-sm focus:outline-none hover:border-white/20 transition-colors cursor-pointer"
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Filters Drawer */}
                <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end`}>
                    <div className="w-full max-w-sm bg-neutral-900 h-full p-6 overflow-y-auto border-l border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><SlidersHorizontal size={20} /></button>
                        </div>
                        <ShopFilters
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                        <button
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="w-full mt-6 bg-blue-600 py-3 rounded-lg font-bold"
                        >
                            Show Results
                        </button>
                    </div>
                </div>

                {/* Full Width Product Grid (4 Columns) - Futuristic Staggered Entrance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
                    <AnimatePresence mode='popLayout'>
                        {visibleProducts.map((product, index) => {
                            // Generate a stable random match score based on ID
                            const matchScore = 85 + (product.id % 14);

                            return (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05, ease: "backOut" }}
                                    className="group w-full flex flex-col relative"
                                >
                                    {/* Holographic Card Container */}
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-blue-500/50 shadow-lg group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">

                                        {/* Futuristic Grid/Scanline Overlay (Subtle) */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 opacity-0 group-hover:opacity-20 pointer-events-none bg-[length:100%_4px,3px_100%]" />

                                        {/* Image */}
                                        <div className="absolute inset-0 bg-neutral-900/50 animate-pulse" />
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 relative z-0 opacity-90 group-hover:opacity-100"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = "https://placehold.co/600x800/1a1a1a/FFF?text=Image+Unavailable";
                                            }}
                                        />

                                        {/* AI Match Badge (Floating) */}
                                        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                                            <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulseShadow" />
                                                <span className="text-[10px] font-bold text-green-400 tracking-wider">
                                                    {matchScore}% MATCH
                                                </span>
                                            </div>
                                        </div>

                                        {/* Rating Badge (Glass) */}
                                        <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold border border-white/10 text-white">
                                            <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                            {product.rating}
                                        </div>

                                        {/* Quick Actions (Slide Up) */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 flex gap-3 justify-center items-end">
                                            <button
                                                onClick={() => openQuickView(product)}
                                                className="bg-neutral-900/80 backend-blur text-white border border-white/20 p-3.5 rounded-full hover:scale-110 hover:bg-white hover:text-black transition-all shadow-lg flex items-center justify-center"
                                                title="Quick View"
                                            >
                                                <Eye size={22} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => handleTryOn(product)}
                                                className="bg-white text-black p-3.5 rounded-full hover:scale-110 hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center"
                                                title="Virtual Try On"
                                            >
                                                <Shirt size={22} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-neutral-900 text-white border border-white/20 p-3.5 rounded-full hover:scale-110 hover:border-white transition-all shadow-lg flex items-center justify-center"
                                                title="Add to Cart"
                                            >
                                                <ShoppingBag size={22} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Futuristic Details Card */}
                                    <div className="mt-4 px-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1">{product.category}</p>
                                                <h3 className="font-bold text-white text-base leading-tight group-hover:text-blue-400 transition-colors w-full truncate">{product.name}</h3>
                                            </div>
                                            <p className="font-mono font-bold text-lg text-white tracking-tight">₹{product.price}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Quick View Modal Portal */}
                <QuickViewModal
                    isOpen={!!quickViewProduct}
                    onClose={closeQuickView}
                    product={quickViewProduct}
                    onTryOn={(p) => { closeQuickView(); handleTryOn(p); }}
                    onAddToCart={(p) => { closeQuickView(); addToCart(p); }}
                />

                {/* Empty State */}
                {allFilteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-neutral-500 border border-dashed border-white/10 rounded-2xl bg-white/5 mx-auto max-w-lg mt-8">
                        <ShoppingBag size={48} className="mb-4 opacity-30" />
                        <p className="text-xl font-medium">No products found</p>
                        <p className="text-sm mt-2 opacity-60">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); setPriceRange([0, 500]); }}
                            className="mt-6 text-blue-400 hover:underline text-sm font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Load More Trigger */}
                {visibleProducts.length < allFilteredProducts.length && (
                    <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-8">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </main>
        </div>
    );
}
