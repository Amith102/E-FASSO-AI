import React from 'react'
import ProductSlider from './ProductSlider'

export default function Products() {
    return (
        <section className='max-w-7xl mx-auto px-6 mb-20'>
            <div className='text-[#0062f5] text-center text-sm font-semibold my-4 mt-20'>PRODUCTS</div>
            <h3 className='font-bold text-3xl text-center mb-6 text-white'>Check What We Have</h3>
            <ProductSlider />
        </section>
    )
}
