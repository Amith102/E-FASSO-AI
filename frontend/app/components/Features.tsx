import Image from 'next/image'
import React from 'react'

export default function Features() {
    return (
        <section className='max-w-7xl mx-auto px-6 py-20'>
            <div className='grid lg:grid-cols-[60%,40%]'>
                <div></div>
                <h2 className='lg:text-4xl md:text-5xl font-bold font-serif tracking-tight text-neutral-900 dark:text-white transition-colors duration-700'>Unique and Authentic Vintage Designer Jewellery</h2>
            </div>



            <div className='mt-10 grid lg:grid-cols-2 grid-cols-1 gap-x-20 gap-y-10 '>


                <div className=' grid grid-cols-2 gap-y-8 gap-x-12 sm:gap-x-36 relative text-neutral-900 dark:text-white transition-colors duration-700'>
                    <div>
                        <h3 className='font-bold text-xl my-4 font-serif dark:text-white'>Using Good Quality Materials</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-700">Derived from ethically sourced materials, ensuring sustainability and premium durability.</p>
                    </div>
                    <div className='gap-3'>
                        <h3 className='font-bold text-xl my-4 font-serif dark:text-white'>100% Handmade Products</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-700">Each piece is meticulously crafted by master artisans, preserving traditional techniques.</p>
                    </div>
                    <div className='gap-3'>
                        <h3 className='font-bold text-xl my-4 font-serif dark:text-white'>Modern Fashion Design</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-700">Blending vintage aesthetics with contemporary silhouettes for a timeless modern look.</p>
                    </div>
                    <div className='gap-3'>
                        <h3 className='font-bold text-xl my-4 font-serif dark:text-white'>Discount for Bulk Orders</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-700">Exclusive pricing and customization options available for large corporate or wedding orders.</p>
                    </div>

                    <h5 className='absolute font-extrabold text-neutral-200 dark:text-neutral-800 -z-10 text-9xl top-0 left-0 leading-none transition-colors duration-700'>Different from others</h5>


                </div>




                <div className='sm:flex sm:gap-x-10 '>
                    <Image
                        className='flex flex-shrink-0 mx-auto sm:mx-1 my-10 '
                        src={'/images/feature.png'} alt='features image' height={400} width={270} />

                    <div className='flex flex-col justify-center gap-y-6 text-neutral-900 dark:text-white transition-colors duration-700'>
                        <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-700">This piece is ethically crafted in our small family-owned workshop in Peru
                            with unmatched attention to detail and care. The Natural color is the
                            actual natural color of the fiber, undyed and 100% traceable.</p>
                        <button
                            className='bg-black dark:bg-white text-white dark:text-black font-semibold  py-2 px-5  w-[180px] lg:w-[120px] xl:w-[180px] flex-grow-0 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-700'
                        >
                            See All Products
                        </button>
                    </div>
                </div>

            </div>

        </section>
    )
}
