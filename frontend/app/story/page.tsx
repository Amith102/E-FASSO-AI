'use client'
import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'

export default function StoryPage() {
    const comp = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1 })

            // --- SCENE 1: INTRO ---
            tl.set('.scene-1', { opacity: 1, zIndex: 10 })
                .from('.s1-text-1', {
                    y: 100, opacity: 0, duration: 1, ease: 'power3.out'
                })
                .from('.s1-text-2', {
                    scale: 1.5, opacity: 0, duration: 1.2, ease: 'expo.out'
                }, '-=0.5')
                .to('.s1-line', {
                    width: '100%', duration: 0.8, ease: 'power2.inOut'
                }, '-=1')
                .to('.scene-1', {
                    opacity: 0, scale: 1.1, duration: 0.8, ease: 'power2.in', delay: 1.5
                })

            // --- SCENE 2: IMAGE SHOWCASE ---
            tl.set('.scene-2', { opacity: 1, zIndex: 10 }, '-=0.2')
                .from('.s2-img', {
                    scale: 1.4, rotation: 5, duration: 4, ease: 'none'
                })
                .from('.s2-title', {
                    x: -50, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2
                }, '<')
                .to('.scene-2', {
                    y: '-100%', duration: 1, ease: 'expo.inOut'
                }, '-=1.5')

            // --- SCENE 3: PRODUCT GRID ---
            tl.set('.scene-3', { opacity: 1, zIndex: 10 }, '-=0.5')
                .from('.s3-card', {
                    y: 100, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)'
                })
                .from('.s3-badge', {
                    scale: 0, rotate: -180, duration: 0.6, ease: 'back.out'
                }, '-=0.5')
                .to('.scene-3', {
                    opacity: 0, scale: 0.9, duration: 0.8, ease: 'power2.in', delay: 2
                })

            // --- SCENE 4: CTA ---
            tl.set('.scene-4', { opacity: 1, zIndex: 10 }, '-=0.2')
                .from('.s4-bg', {
                    scale: 1.2, duration: 3, ease: 'none'
                })
                .from('.s4-content', {
                    y: 50, opacity: 0, duration: 0.8, ease: 'power2.out'
                }, '<+0.5')
                .from('.s4-btn', {
                    scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out'
                }, '-=0.2')
                // Hold then fade out to loop
                .to('.scene-4', {
                    opacity: 0, duration: 1, delay: 2
                })

        }, comp)

        return () => ctx.revert()
    }, [])

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4" ref={comp}>
            {/* 9:16 Container */}
            <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border-[8px] border-neutral-800 ring-1 ring-white/10">

                {/* Close Button */}
                <Link href="/" className="absolute top-6 right-6 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                    <X size={20} />
                </Link>

                {/* --- SCENE 1: INTRO --- */}
                <div className="scene-1 absolute inset-0 flex flex-col items-center justify-center bg-black text-white p-8 opacity-0">
                    <h2 className="s1-text-1 text-xl font-light tracking-[0.3em] uppercase mb-4 text-neutral-400">Welcome to</h2>
                    <h1 className="s1-text-2 text-6xl font-serif font-bold text-center leading-none">
                        E-FASSO<br />
                        <span className="text-4xl italic font-light">Originals</span>
                    </h1>
                    <div className="s1-line h-[1px] bg-gradient-to-r from-transparent via-white to-transparent w-0 mt-8"></div>
                </div>

                {/* --- SCENE 2: IMAGE SHOWCASE --- */}
                <div className="scene-2 absolute inset-0 bg-neutral-900 opacity-0">
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                            alt="Model"
                            className="s2-img w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-20 left-8 right-8">
                        <div className="s2-title text-5xl font-serif text-white mb-2 leading-[0.8]">Urban<br />Elegance</div>
                        <p className="s2-title text-neutral-300 text-sm tracking-widest uppercase">Collection 2024</p>
                    </div>
                </div>

                {/* --- SCENE 3: PRODUCT GRID --- */}
                <div className="scene-3 absolute inset-0 bg-[#0f0f0f] flex flex-col justify-center p-6 opacity-0">
                    <div className="absolute top-12 left-0 w-full text-center">
                        <h3 className="text-white font-serif text-2xl">New Arrivals</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="s3-card aspect-[3/4] bg-neutral-800 rounded-lg overflow-hidden relative">
                                <img
                                    src={`/images/${i <= 3 ? 'promo' + i + '.jpg' : 'hero.jpg'}`}
                                    className="w-full h-full object-cover opacity-80"
                                    alt="Product"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="s3-badge absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center z-20">
                        <span className="text-black font-bold text-xl">-50%</span>
                    </div>
                </div>

                {/* --- SCENE 4: CTA --- */}
                <div className="scene-4 absolute inset-0 bg-neutral-900 opacity-0">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                        className="s4-bg w-full h-full object-cover opacity-60"
                        alt="End Scene"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8 s4-content">
                        <h2 className="text-4xl font-serif text-white mb-6">Redefine Your<br />Style Today</h2>
                        <Link href="/shop" className="s4-btn bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-neutral-200 transition-colors">
                            <ShoppingBag size={20} />
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white animate-[progress_12s_linear_infinite]"></div>
                </div>

            </div>

            <style jsx global>{`
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    )
}
