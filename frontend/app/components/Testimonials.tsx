import React from 'react';
import { Star, User } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Viswajith A",
        role: "Fashion Enthusiast",
        content: "The virtual try-on feature is a game changer! I exactly knew how the suit would fit before buying properly.",
        rating: 5,

    },
    {
        id: 2,
        name: "Alen Eldho",
        role: "Verified Buyer",
        content: "Incredible quality and the delivery was super fast. The AI recommendations were surprisingly accurate for my style.",
        rating: 5,

    },
    {
        id: 3,
        name: "AP Abshan",
        role: "Regular Customer",
        content: "Best styling experience I've had online. The futuristic interface makes shopping actually fun again.",
        rating: 4,
        image: "/images/ap_abshan.jpg"
    }
];

export default function Testimonials() {
    return (
        <section className="bg-neutral-100/50 dark:bg-black/40 border-y border-black/5 dark:border-white/5 py-20 transition-colors duration-700">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[#0062f5] text-sm font-semibold mb-2 uppercase tracking-wider">Testimonials</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-serif transition-colors duration-700">What Our Customers Say</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-neutral-900/50 p-8 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-md transition-all duration-700">
                            <div className="flex gap-1 mb-6 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-neutral-300 dark:text-neutral-700"} />
                                ))}
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 transition-colors duration-700">"{review.content}"</p>
                            <div className="flex items-center gap-4">
                                {review.image ? (
                                    <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/10 transition-all duration-700" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center ring-2 ring-black/5 dark:ring-white/10 transition-all duration-700">
                                        <User size={20} className="text-neutral-400" />
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-neutral-900 dark:text-white text-sm transition-colors duration-700">{review.name}</h4>
                                    <p className="text-neutral-500 text-xs">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
