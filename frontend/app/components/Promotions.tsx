import Image from 'next/image'
import React from 'react'

export default function Promotions() {
    return (
        <section className='max-w-7xl mx-auto mt-20 px-6'>
            <h1 className='text-[#0062f5] text-center text-sm font-semibold my-4'>PROMOTIONS</h1>
            <h3 className='text-center text-4xl font-bold my-4 text-neutral-900 dark:text-white font-serif transition-colors duration-700'>Our Promotion Events</h3>


            <div className='grid lg:grid-cols-4 gap-4'>
                <div className='sm:col-span-2 bg-[#d6d6d8] dark:bg-neutral-800 flex flex-col md:flex-row justify-center md:items-center h-auto lg:h-[200px] order-first text-black dark:text-white group overflow-hidden cursor-pointer rounded-none border border-white/5 dark:border-white/10 transition-colors duration-700'>
                    <div className='ml-4 z-10'>
                        <h3 className=' text-3xl  mt-5 md:text-4xl font-semibold font-[sans-serif]  '>GET UP TO 60%</h3>
                        <h3 className='text-xl'>For the summer season</h3>
                    </div>
                    <Image src={'/images/promo1.jpg'} alt={'promotions'} width={250} height={250} className='transition-transform duration-500 group-hover:scale-110' />
                </div>



                <div className='sm:row-span-2 bg-[#efe1c7] dark:bg-[#3d342b] h-auto text-black dark:text-white group overflow-hidden cursor-pointer border border-white/5 dark:border-white/10 transition-colors duration-700'>
                    <h3 className='mt-4 mx-2 relative z-10' > Flex Sweatshirt</h3>
                    <div className='flex relative z-10'>
                        <p className='line-through text-lg m-2'>₹100.00</p>
                        <p className='font-bold  text-lg m-2'>₹75.00</p>
                    </div>

                    <Image src={'/images/promo2.jpg'} alt='promotions' height={400} width={260} className='mx-auto bottom-0 transition-transform duration-500 group-hover:scale-110' />

                </div>





                <div className='sm:row-span-2 bg-[#d7d7d9] dark:bg-neutral-800 h-auto order-last text-black dark:text-white group overflow-hidden cursor-pointer border border-white/5 dark:border-white/10 transition-colors duration-700'>
                    <h3 className='mt-4 mx-2 relative z-10'>Flex Push Button Bomber</h3>
                    <div className='flex relative z-10'>
                        <p className='line-through text-lg m-2'>₹225.00</p>
                        <p className='font-bold  text-lg m-2'>₹190.00</p>
                    </div>

                    <Image src={'/images/promo3.jpg'} alt='promotions' height={400} width={260} className='mx-auto bottom-0 transition-transform duration-500 group-hover:scale-110' />

                </div>









                <div className='sm:col-span-2 bg-[#f4f4f5] dark:bg-neutral-900 py-6 flex justify-center md:items-center h-auto lg:h-[200px] -order-2 lg:order-last border border-black/5 dark:border-white/10 group overflow-hidden cursor-pointer transition-colors duration-700'>
                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                        <h3 className='text-4xl  font-[sans-serif] text-neutral-900 dark:text-white font-bold text-center transition-colors duration-700'>GET 30% OFF</h3>
                        <h3 className='text-md mt-5 text-neutral-600 dark:text-neutral-400 text-center transition-colors duration-700'>USE PROMO CODE</h3>
                        <h5 className='px-8 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold font-[sans-serif] text-center spacing mt-2 transition-colors duration-700'>DINEWEEKENDSALE</h5>
                    </div>
                </div>

            </div >

        </section >
    )
}
