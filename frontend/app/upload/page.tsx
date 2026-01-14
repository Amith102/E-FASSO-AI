"use client";

import { useState } from 'react';
import axios from 'axios';
import { Upload, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [height, setHeight] = useState('170');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('front_image', file);
        formData.append('height_cm', height);

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
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left: Input Panel */}
                <div className="flex flex-col gap-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            AI Body Analysis
                        </h1>
                        <p className="text-neutral-400 mt-2">Upload a full-body photo to generate accurate measurements and getting size recommendation.</p>
                    </div>

                    <div className="flex flex-col gap-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl">
                        <label className="text-sm font-semibold text-neutral-300">Your Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="bg-neutral-800 border-none rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

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
                        {loading ? <Loader2 className="animate-spin" /> : <><span className="material-symbols-outlined">auto_awesome</span> Analyze Body</>}
                    </button>
                </div>

                {/* Right: Results Panel */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 relative overflow-hidden">
                    {!result ? (
                        <div className="h-full flex flex-col items-center justify-center text-neutral-500 gap-4">
                            <div className="w-20 h-20 bg-neutral-800 rounded-full animate-pulse" />
                            <p>Waiting for analysis...</p>
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                            <div className="flex items-center gap-3 text-green-400 mb-4">
                                <CheckCircle size={20} />
                                <span className="font-bold">Analysis Complete</span>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Body Measurements</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(result.body_analysis.measurements).map(([key, val]) => (
                                        <div key={key} className="bg-neutral-800 p-4 rounded-xl">
                                            <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">{key}</span>
                                            <span className="text-xl font-bold text-white">{val as string} cm</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Skin Tone Recommendations</h3>
                                <div className="bg-neutral-800 p-4 rounded-xl flex items-center justify-between">
                                    <span className="text-neutral-300">Tone Type</span>
                                    <span className="font-bold text-white">{result.skin_analysis.tone_label}</span>
                                </div>
                                <div className="flex gap-2">
                                    {result.skin_analysis.recommended_colors.map((color: string) => (
                                        <div key={color} className="w-10 h-10 rounded-full border border-white/10 shadow-lg" style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    );
}
