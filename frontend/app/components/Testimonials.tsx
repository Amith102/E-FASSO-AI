import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Alex Thompson",
        role: "Fashion Enthusiast",
        content: "The virtual try-on feature is a game changer! I exactly knew how the suit would fit before buying properly.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Verified Buyer",
        content: "Incredible quality and the delivery was super fast. The AI recommendations were surprisingly accurate for my style.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Regular Customer",
        content: "Best styling experience I've had online. The futuristic interface makes shopping actually fun again.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    return (
        <section className="bg-neutral-900/30 border-y border-white/5 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[#0062f5] text-sm font-semibold mb-2 uppercase tracking-wider">Testimonials</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">What Our Customers Say</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-neutral-900 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex gap-1 mb-6 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-neutral-700"} />
                                ))}
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-8">"{review.content}"</p>
                            <div className="flex items-center gap-4">
                                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">{review.name}</h4>
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
