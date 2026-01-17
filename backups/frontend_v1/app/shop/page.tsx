"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Filter, ArrowRight, Star, Shirt } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle'; // Assuming this component exists in ../components/ThemeToggle

// Mock Data for Products
const PRODUCTS = [
    {
        id: 1,
        name: "Classic Navy Suit",
        price: 299,
        category: "Men",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
        description: "Premium wool blend for a sharp professional look."
    },
    {
        id: 2,
        name: "Emerald Silk Dress",
        price: 189,
        category: "Women",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        description: "Elegant evening wear with a flowing silhouette."
    },
    {
        id: 3,
        name: "Urban Denim Jacket",
        price: 89,
        category: "Men",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop",
        description: "Rugged style with a modern fit."
    },
    {
        id: 4,
        name: "Floral Summer Top",
        price: 45,
        category: "Women",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
        description: "Lightweight and breathable for warm days."
    },
    {
        id: 5,
        name: "Oxford Button-Down",
        price: 59,
        category: "Men",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
        description: "A versatile staple for work or casual weekends."
    },
    {
        id: 6,
        name: "High-Waist Chinos",
        price: 65,
        category: "Women",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
        description: "Comfortable fit with a chic tapered leg."
    },
    {
        id: 7,
        name: "Streetwear Hoodie",
        price: 75,
        category: "Men",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
        description: "Oversized fit with premium cotton fleece."
    },
    {
        id: 8,
        name: "Leather Biker Jacket",
        price: 220,
        category: "Women",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1551028919-ac7675cf38b6?q=80&w=800&auto=format&fit=crop",
        description: "Classic rebel look with silver hardware."
    },
    {
        id: 9,
        name: "Scarlet Evening Gown",
        price: 250,
        category: "Women",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
        description: "Stunning red gown for formal occasions."
    },
    {
        id: 10,
        name: "Classic Beige Trench",
        price: 180,
        category: "Women",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        description: "Timeless outerwear piece for any season."
    },
    {
        id: 11,
        name: "Striped Polo Shirt",
        price: 45,
        category: "Men",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1625910515337-cc51db428613?q=80&w=800&auto=format&fit=crop",
        description: "Casual comfort with a preppy edge."
    },
    {
        id: 12,
        name: "Black Turtleneck",
        price: 60,
        category: "Men",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1624460592754-05187e5b9d24?q=80&w=800&auto=format&fit=crop",
        description: "Sleek and sophisticated winter essential."
    },
    {
        id: 13,
        name: "Boho Summer Maxi",
        price: 95,
        category: "Women",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop",
        description: "Flowy and vibrant dress for beach days."
    },
    {
        id: 14,
        name: "Checkered Flannel",
        price: 55,
        category: "Men",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1603513076823-7fa578c77395?q=80&w=800&auto=format&fit=crop",
        description: "Rugged warmth in a classic pattern."
    }
];

const CATEGORIES = ["All", "Men", "Women", "Accessories"];

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const router = useRouter();

    const handleTryOn = (product: any) => { // Using any for simplicity here
        localStorage.setItem('virtualTryOnProduct', JSON.stringify(product));
        router.push('/upload');
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30 font-sans">
            {/* Navbar (Simplified for Shop) */}
            <nav className="fixed w-full z-50 top-0 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/50">
                <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                    E-FASSO.AI
                </Link>
                <div className="flex gap-4 items-center">
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search collection..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/10 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors w-64"
                        />
                        <Search className="absolute left-3 top-2.5 text-neutral-400" size={16} />
                    </div>
                    <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ShoppingCart size={24} />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
                    </Link>
                    <ThemeToggle />
                </div>
            </nav>

            <main className="container mx-auto px-6 pt-32 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                            Latest Collection
                        </h1>
                        <p className="text-neutral-400 max-w-lg">
                            Curated styles powered by AI analysis. Find the perfect fit for your body type.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeCategory === category
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="group bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="aspect-[3/4] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-neutral-800 animate-pulse" /> {/* Loading Placeholder */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                                    />
                                    {/* Overlay Buttons */}
                                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors">
                                            <Star size={18} className="text-white fill-transparent hover:fill-yellow-400 hover:text-yellow-400 transition-colors" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                                        <button
                                            onClick={() => handleTryOn(product)}
                                            className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 hover:bg-blue-50 hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/20"
                                        >
                                            <Shirt size={16} className="fill-blue-500 text-blue-500" />
                                            <span>Virtual Try-On</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors line-clamp-1">{product.name}</h3>
                                        <span className="font-bold text-white bg-white/10 px-2 py-1 rounded-md text-sm">${product.price}</span>
                                    </div>
                                    <p className="text-sm text-neutral-400 line-clamp-2 mb-4 flex-grow">{product.description}</p>
                                    <div className="flex items-center justify-between text-xs text-neutral-500 mt-auto">
                                        <span className='capitalize'>{product.category}</span>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star size={12} fill="currentColor" />
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
                        <Search size={48} className="mb-4 opacity-50" />
                        <p className="text-xl">No products found matching your criteria.</p>
                        <button
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                            className="mt-4 text-blue-400 hover:underline"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
}
