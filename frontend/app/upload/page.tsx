"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Loader2, X, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import ThreeViewer from '@/app/components/ThreeViewer';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [result, setResult] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [garment, setGarment] = useState<any>(null);

    // Auto-Fit State (Replaces Manual)
    const [showAdjustments, setShowAdjustments] = useState(false);
    const [vtonPosition, setVtonPosition] = useState({ x: 50, y: 30 }); // % positioning
    const [vtonScale, setVtonScale] = useState(1);
    const [vtonRotation, setVtonRotation] = useState(0);
    const [vtonOpacity, setVtonOpacity] = useState(1);

    const [vtonBlendMode, setVtonBlendMode] = useState<"normal" | "multiply" | "screen" | "overlay">("normal");

    // AI VTON State
    const [aiProcessing, setAiProcessing] = useState(false);
    const [aiResult, setAiResult] = useState<string | null>(null);
    const [hasTriggeredAI, setHasTriggeredAI] = useState(false);

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        // Check for Virtual Try-On product
        const storedProduct = localStorage.getItem('virtualTryOnProduct');
        if (storedProduct) {
            setGarment(JSON.parse(storedProduct));
            // Optional: Clear it so it doesn't persist forever
            // localStorage.removeItem('virtualTryOnProduct');
        }
    }, [user, router]);

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

    // Auto-Fit Logic
    useEffect(() => {
        if (result?.body_analysis?.landmarks && garment) {
            try {
                const { left_shoulder, right_shoulder } = result.body_analysis.landmarks;

                // 1. Position: ALERT - Switching to COLLAR ANCHORING
                // Instead of guessing the center, we align the TOP of the shirt (roughly) with the NECK.

                const avgX = (left_shoulder.x + right_shoulder.x) / 2 * 100;
                // Shoulder line Y. We want the top of the shirt slightly *above* this (-15% of shirt height)
                const avgY = (left_shoulder.y + right_shoulder.y) / 2 * 100;

                // 2. Scale
                const dx = right_shoulder.x - left_shoulder.x;
                const dy = right_shoulder.y - left_shoulder.y;
                const width = Math.sqrt(dx * dx + dy * dy);

                const requiredWidth = width * 100 * 3.4; // Wider fit
                const newScale = requiredWidth / 30;

                // 3. Rotation
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                setVtonPosition({ x: avgX, y: avgY });
                setVtonScale(newScale);
                setVtonRotation(angle);

                setVtonBlendMode("multiply");
                setVtonOpacity(0.95);
            } catch (e) {
                console.error("Auto-fit error", e);
            }
        }
    }, [result, garment]);

    // Auto-Trigger AI Logic
    useEffect(() => {
        if (result && garment && file && !hasTriggeredAI && !aiProcessing && !aiResult) {
            console.log("Auto-triggering AI VTON...");
            setHasTriggeredAI(true);
            handleAITryOn();
        }
    }, [result, garment, file, hasTriggeredAI, aiProcessing, aiResult]);

    const handleAITryOn = async () => {
        if (!file || !garment) return;
        setAiProcessing(true);
        setAiResult(null);

        try {
            // 1. Fetch garment image as Blob
            const garmentResponse = await fetch(garment.image);
            const garmentBlob = await garmentResponse.blob();

            // 2. Prepare Form Data
            const formData = new FormData();
            formData.append('person_image', file);
            formData.append('garment_image', garmentBlob, "garment.jpg");
            formData.append('description', garment.name);

            // 3. Send to Backend
            const response = await axios.post('http://localhost:8000/try-on', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 120000 // 120s timeout for Upload + GenAI
            });

            if (response.data.image) {
                setAiResult(response.data.image);
            }
        } catch (error) {
            console.error("AI VTON Error:", error);
            // Don't alert since it's automatic now, just fail silently to 2D fallback
        } finally {
            setAiProcessing(false);
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

                {/* 3D Viewer Section */}
                <div className="lg:col-span-1 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Box className="w-5 h-5 text-blue-600" />
                            3D Visualization
                        </h2>
                        {garment && (
                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                                {garment.name}
                            </span>
                        )}
                    </div>
                    <div className="h-[500px] relative">
                        <ThreeViewer
                            // Basic color mapping logic for demo purposes
                            initialColor={
                                garment?.color || '#ffffff'
                            }
                            textureUrl={garment?.image}
                            measurements={result?.body_analysis?.measurements}
                        />
                        {!result && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white text-center p-6 z-10 pointer-events-none">
                                <p className="font-medium mb-2 opacity-90">Reviewing Product: {garment?.name || 'None'}</p>
                                <p className="text-xs opacity-70 max-w-[200px]">Interact with the 3D model to see details before you try it on.</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Right: Results Panel */}
                {/* Analysis Results */}
                {result && result.body_analysis && (
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
                )}

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

                    {/* AI RESULT OVERLAY */}
                    {aiResult ? (
                        <div className="absolute inset-0 z-50 bg-black animate-in fade-in duration-700">
                            <img src={aiResult} alt="AI Try-On Result" className="w-full h-full object-contain" />
                            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                                ✨ AI Generative Fit Applied
                            </div>
                        </div>
                    ) : (
                        /* Loading Overlay for AI */
                        aiProcessing && (
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50">
                                <div className="bg-black/80 backdrop-blur text-white text-xs px-4 py-2 rounded-full flex items-center gap-2 border border-purple-500/50 shadow-lg mb-20 lg:mb-4">
                                    <Loader2 className="w-3 h-3 animate-spin text-purple-400" />
                                    <span>Training AI Model & Generating Fit (30s)...</span>
                                </div>
                            </div>
                        )
                    )}

                    {/* VIRTUAL TRY-ON OVERLAY (MANUAL) (Hide if AI result is showing) */}
                    {garment && file && !aiResult && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.img
                                drag
                                dragMomentum={false}
                                src={garment.image}
                                alt="Virtual Garment"
                                className="absolute cursor-move touch-none pb-12"
                                style={{
                                    left: `${vtonPosition.x}%`,
                                    top: `${vtonPosition.y}%`,
                                    width: `${30 * vtonScale}%`,
                                    rotate: `${vtonRotation}deg`,
                                    opacity: vtonOpacity,
                                    mixBlendMode: vtonBlendMode,
                                    // Anchor point: Top-Center (shifted slightly up for collar)
                                    transform: 'translate(-50%, -20%)',
                                    pointerEvents: 'auto'
                                }}
                                onDragEnd={() => {
                                    // Optional: save position if needed
                                }}
                            />
                        </div>
                    )}

                    {/* Simplified Adjustment Panel */}
                    {garment && file && (
                        <div className="absolute bottom-4 right-4 z-20">
                            <button
                                onClick={() => setShowAdjustments(!showAdjustments)}
                                className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full hover:bg-white/20 transition-colors"
                                title="Adjust Fit"
                            >
                                <Box size={20} className="text-white" />
                            </button>
                        </div>
                    )}

                    {/* Collapsible Adjustment Controls */}
                    {garment && file && showAdjustments && (
                        <div className="absolute bottom-16 right-4 left-4 lg:left-auto lg:w-64 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 z-20">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Adjustment</h3>
                                <button onClick={() => setShowAdjustments(false)}><X size={14} /></button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-400 block">Size ({vtonScale.toFixed(1)}x)</label>
                                    <input type="range" min="0.5" max="3" step="0.1" value={vtonScale} onChange={(e) => setVtonScale(parseFloat(e.target.value))} className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-400 block">Rotation ({Math.round(vtonRotation)}°)</label>
                                    <input type="range" min="-20" max="20" value={vtonRotation} onChange={(e) => setVtonRotation(parseFloat(e.target.value))} className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-400 block">Vertical Offset</label>
                                    <input type="range" min="0" max="100" value={vtonPosition.y} onChange={(e) => setVtonPosition(prev => ({ ...prev, y: parseFloat(e.target.value) }))} className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
