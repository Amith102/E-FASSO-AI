import React from 'react';
import Link from 'next/link';

const CategoryCard = ({ title, image, link }: { title: string, image: string, link: string }) => (
    <Link href={link} className="group relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl border border-black/5">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
        <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <span className="text-sm font-medium text-white/80 group-hover:text-white flex items-center gap-2">
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </span>
        </div>
    </Link>
);

export default function Categories() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-[#0062f5] text-sm font-semibold mb-2 uppercase tracking-wider">Collections</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-serif">Shop by Category</h3>
                </div>
                <Link href="/shop" className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm font-medium">
                    View All Categories
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CategoryCard
                    title="Men's Collection"
                    image="/images/mens_collection.png"
                    link="/shop"
                />
                <CategoryCard
                    title="Women's Collection"
                    image="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
                    link="/shop"
                />
                <CategoryCard
                    title="Accessories"
                    image="/images/accessories_collection.png"
                    link="/shop"
                />
            </div>
        </section>
    );
}
