import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 p-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <div className="text-2xl font-bold tracking-tight">E-FASSO.AI</div>
        <div className="flex gap-6 text-sm font-medium text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">Technology</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/upload" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors">
            Launch App
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-start justify-center min-h-screen container mx-auto px-6 pt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8 border border-blue-500/20">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          AI Model v2.0 Live
        </div>

        <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
          Wear the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Future.</span>
        </h1>

        <p className="text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed">
          Experience the next generation of virtual fitting. Our AI analyzes your biometrics to recommend the perfect fit and style, instantly.
        </p>

        <div className="flex gap-4">
          <Link href="/upload" className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center gap-2">
            Start Virtual Try-On
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#how-it-works"
            className="px-8 py-4 rounded-xl text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors text-center"
          >
            Watch Demo
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 bg-neutral-900/50 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Why Use E-FASSO.AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                <span className="material-symbols-outlined">straighten</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Precision Fit</h3>
              <p className="text-neutral-400">Our computer vision algorithms extract measurements with 98% accuracy from a single photo.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Color Analysis</h3>
              <p className="text-neutral-400">Discover colors that perfectly complement your skin tone using advanced clustering.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 mb-4">
                <span className="material-symbols-outlined">checkroom</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Virtual Try-On</h3>
              <p className="text-neutral-400">Visualize outfits on your 3D digital twin before you buy, reducing returns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-white">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center relative">
            <div className="flex flex-col items-center text-center max-w-xs z-10">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-900/50">1</div>
              <h3 className="text-lg font-bold mb-2">Upload Photo</h3>
              <p className="text-neutral-400">Take a full body photo against a clear background.</p>
            </div>
            <div className="hidden md:block w-32 h-0.5 bg-neutral-800 -mt-20"></div>
            <div className="flex flex-col items-center text-center max-w-xs z-10">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-purple-900/50">2</div>
              <h3 className="text-lg font-bold mb-2">AI Analysis</h3>
              <p className="text-neutral-400">Our engine processes your biometrics in seconds.</p>
            </div>
            <div className="hidden md:block w-32 h-0.5 bg-neutral-800 -mt-20"></div>
            <div className="flex flex-col items-center text-center max-w-xs z-10">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-green-900/50">3</div>
              <h3 className="text-lg font-bold mb-2">Get Results</h3>
              <p className="text-neutral-400">Receive your tailored size and style advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-neutral-900/30 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">Project Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["AP Abshan", "Alen Eldho Jobi", "Viswajith A", "Amith S"].map((member) => (
              <div key={member} className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all">
                <div className="w-20 h-20 bg-neutral-800 rounded-full mb-4 flex items-center justify-center text-xl font-bold text-neutral-400">
                  {member.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <h3 className="font-bold text-lg">{member}</h3>
                <p className="text-sm text-neutral-500">Contributor</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm">
          <p>&copy; 2026 E-FASSO.AI Project</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Github</a>
          </div>
        </div>
      </footer>

      {/* Background Elements */}
      <div className="fixed top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-blue-900/20 to-transparent -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </div >
  );
}
