"use client";

import Hero from './components/Hero';
import Categories from './components/Categories';
import Promotions from './components/Promotions';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Features from './components/Features';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      <main>
        <Hero />

        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-backwards">
          <Categories />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-backwards">
          <Promotions />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 fill-mode-backwards">
          <Products />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-1000 fill-mode-backwards">
          <Testimonials />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[1200ms] fill-mode-backwards">
          <Features />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[1400ms] fill-mode-backwards">
          <Newsletter />
        </div>
      </main>

      <Footer />

      {/* Background Elements */}
      <div className="fixed top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-blue-900/10 to-transparent -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </div >
  );
}
