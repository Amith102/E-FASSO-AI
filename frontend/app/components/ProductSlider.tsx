'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

// Mock Data (taken from shop page)
const PRODUCTS = [
    {
        id: 1,
        name: "Classic Navy Suit",
        price: 299,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Emerald Silk Dress",
        price: 189,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Urban Denim Jacket",
        price: 89,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Floral Summer Top",
        price: 45,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "Oxford Button-Down",
        price: 59,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 7,
        name: "Streetwear Hoodie",
        price: 75,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    },
];

export default function ProductSlider() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className='mb-10'>
            <Swiper
                modules={[Navigation, A11y]}
                navigation
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    700: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1000: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                spaceBetween={30}
                slidesPerView={3}
            >
                {PRODUCTS.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className='hover:scale-105 duration-500 flex flex-col justify-center items-center mt-5 mb-10 p-4 bg-neutral-900/50 rounded-xl border border-white/5'>

                            <Link href={`/shop`}> {/* Redirect to shop for now */}
                                <div className="w-[300px] h-[350px] relative mb-4 overflow-hidden rounded-lg">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h2 className='font-bold text-center text-white text-lg'>{item.name}</h2>
                                <h2 className='font-bold text-center text-gray-400'>₹{item.price}</h2>
                            </Link>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>
        </div>
    );
}
