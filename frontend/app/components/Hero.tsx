import Image from 'next/image'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
    return (
        <section className='relative w-full h-[85vh] overflow-hidden'>
            {/* Background Image with Overlay */}
            {/* Background Image with Overlay */}
            <div className='absolute inset-0 z-0'>
                <Image
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2560&auto=format&fit=crop"
                    alt="Hero Background"
                    fill
                    className="object-cover object-[50%_25%] opacity-70"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Content centered and sophisticated */}
            <div className='relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start'>
                <div className='max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000'>
                    <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-white/80 backdrop-blur-md">
                        Est. 2024 • Luxury Streetwear
                    </span>

                    <h1 className='text-6xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight'>
                        Redefine <br />
                        <span className="italic font-light text-neutral-400">Your Identity.</span>
                    </h1>

                    <p className='text-lg md:text-xl text-neutral-300 max-w-lg font-light leading-relaxed'>
                        Experience the perfect fusion of industrial aesthetics and modern luxury.
                        Meticulously crafted for the bold.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/shop" className='group bg-white text-black py-4 px-8 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-200 transition-all'>
                            Explore Collection
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/about" className='group border border-white/20 text-white py-4 px-8 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 backdrop-blur-sm transition-all'>
                            Our Story
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    )
}

export default Hero
