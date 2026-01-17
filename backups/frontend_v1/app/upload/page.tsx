"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, ArrowRight, Loader2, CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ThreeViewer from '@/app/components/ThreeViewer';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [garment, setGarment] = useState<any>(null);

    useEffect(() => {
        // Check for Virtual Try-On product
        const storedProduct = localStorage.getItem('virtualTryOnProduct');
        if (storedProduct) {
            setGarment(JSON.parse(storedProduct));
            // Optional: Clear it so it doesn't persist forever
            // localStorage.removeItem('virtualTryOnProduct');
        }
    }, []);

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('front_image', file);

        try {
            // Replace with actual Backend URL
            const response = await axios.post('http://localhost:8000/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert("Analysis failed. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left: Input Panel */}
                <div className="flex flex-col gap-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            AI Body Analysis
                        </h1>
                        <p className="text-neutral-400 mt-2">Upload a full-body photo to generate accurate measurements and getting size recommendation.</p>
                    </div>

                    {/* Selected Garment Preview */}
                    {garment && (
                        <div className="bg-blue-900/20 border border-blue-500/50 p-4 rounded-xl flex items-center gap-4">
                            <img src={garment.image} alt={garment.name} className="w-16 h-20 object-cover rounded-md" />
                            <div>
                                <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Virtual Try-On Item</p>
                                <p className="font-bold">{garment.name}</p>
                            </div>
                            <button
                                onClick={() => { setGarment(null); localStorage.removeItem('virtualTryOnProduct'); }}
                                className="ml-auto bg-neutral-800 hover:bg-neutral-700 p-2 rounded-full"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <div className="border-2 border-dashed border-neutral-800 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 transition-colors bg-neutral-900/50">
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                                <Upload size={24} />
                            </div>
                            <span className="font-medium text-neutral-200">
                                {file ? file.name : "Click to Upload Photo"}
                            </span>
                            <span className="text-xs text-neutral-500">JPG, PNG (Max 5MB)</span>
                        </label>
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Analyze Body"}
                    </button>
                </div>

                {/* Right: Results Panel */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 relative overflow-hidden min-h-[600px]">
                    {!result ? (
                        <div className="h-full flex flex-col items-center justify-center text-neutral-500 gap-4 relative">
                            <div className="absolute inset-0">
                                <ThreeViewer />
                            </div>
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 h-full">
                            <div className="flex items-center gap-3 text-green-400 mb-4">
                                <CheckCircle size={20} />
                                <span className="font-bold">Analysis Complete</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6 h-full">
                                {/* Analysis Results */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white">Body Measurements</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="bg-neutral-800 p-3 rounded-xl border border-blue-500/30">
                                            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Height (AI Est.)</span>
                                            <span className="text-lg font-bold text-white">{result.body_analysis.measurements.estimated_height_cm} cm</span>
                                        </div>
                                        {Object.entries(result.body_analysis.measurements)
                                            .filter(([key]) => key !== 'estimated_height_cm')
                                            .map(([key, val]) => (
                                                <div key={key} className="bg-neutral-800 p-3 rounded-xl">
                                                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">{key}</span>
                                                    <span className="text-lg font-bold text-white">{val as string} cm</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Virtual Try-On / Image Preview */}
                                <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
                                    {/* User Image */}
                                    {file && (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="User Upload"
                                            className="w-full h-full object-contain"
                                        />
                                    )}

                                    {/* VIRTUAL TRY-ON OVERLAY */}
                                    {garment && result.landmarks && (
                                        <motion.img
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            src={garment.image}
                                            alt="Virtual Garment"
                                            className="absolute z-10 drop-shadow-2xl"
                                            style={{
                                                /* 
                                                    Positioning Logic: 
                                                    - left: Left Shoulder X
                                                    - top: Average Shoulder Y - Offset (to account for neck/head of garment)
                                                    - width: Shoulder Width * Scale Factor (to make it fit the body)
                                                */
                                                left: `${result.landmarks.left_shoulder.x * 100}%`,
                                                top: `${(result.landmarks.left_shoulder.y + result.landmarks.right_shoulder.y) / 2 * 100 - 15}%`,
                                                width: `${Math.abs(result.landmarks.right_shoulder.x - result.landmarks.left_shoulder.x) * 100 * 2.8}%`, // 2.8x shoulder width for full shirt coverage
                                                transform: 'translateX(-15%)' // Center adjustment
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    );
}
