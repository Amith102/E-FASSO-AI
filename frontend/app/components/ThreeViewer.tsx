"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';

type Pose = "t-pose" | "natural" | "check-fit";

function AvatarModel({ color, pose, textureUrl, textureScale, textureOffset }: {
    color?: string,
    pose: Pose,
    textureUrl?: string,
    textureScale: number,
    textureOffset: { x: number, y: number }
}) {
    // Load external model (Ready Player Me - Green Jacket Guy)
    // Load external model (Ready Player Me - Green Jacket Guy)
    const { scene } = useGLTF('https://models.readyplayer.me/65a8dba831b23abb4f401bae.glb');

    // Stable clone of the scene
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);

    // Texture State to avoid reloading on every render
    const [loadedTexture, setLoadedTexture] = React.useState<THREE.Texture | null>(null);

    // Effect 1: Handle Texture Loading (Only runs when URL changes)
    React.useEffect(() => {
        if (!textureUrl) {
            setLoadedTexture(null);
            return;
        }

        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin('anonymous');
        loader.load(textureUrl, (texture) => {
            texture.flipY = false;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            setLoadedTexture(texture);
        });
    }, [textureUrl]);

    // Effect 2: Handle Bone Manipulation (Only runs on mount or pose change)
    React.useEffect(() => {
        if (!clone) return;

        const findBone = (namePart: string) => {
            let found: any = null;
            clone.traverse((child) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((child as any).isBone && child.name.toLowerCase().includes(namePart.toLowerCase())) {
                    found = child;
                }
            });
            return found;
        };

        const leftArm = findBone("LeftArm");
        const rightArm = findBone("RightArm");

        if (leftArm && rightArm) {
            leftArm.rotation.set(0, 0, 0);
            rightArm.rotation.set(0, 0, 0);

            if (pose === "natural") {
                leftArm.rotation.z = 1.2;
                rightArm.rotation.z = -1.2;
            } else if (pose === "check-fit") {
                leftArm.rotation.x = -0.5;
                rightArm.rotation.x = -0.5;
            }
        }
    }, [clone, pose]);

    // Effect 3: Apply Material/Texture Updates (Runs fast on slider change)
    React.useEffect(() => {
        if (!clone) return;

        clone.traverse((child) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((child as any).isMesh) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (child.name.includes("Outfit")) {
                    // We need to ensure we have a unique material to modify
                    // Check if we already cloned it? simpler to just check name or property
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    let material = (child as any).material;

                    // If it's the original shared material, clone it once
                    if (!material.userData.isCloned) {
                        material = material.clone();
                        material.userData.isCloned = true;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (child as any).material = material;
                    }

                    if (loadedTexture) {
                        // Update texture properties rapidly
                        loadedTexture.repeat.set(textureScale, textureScale);
                        loadedTexture.offset.set(textureOffset.x, textureOffset.y);

                        // Assign texture frame
                        if (material.map !== loadedTexture) {
                            material.map = loadedTexture;
                            material.needsUpdate = true;
                        }

                        // Ensure parameters are correct for texture display
                        material.color.set('white');
                    } else if (color) {
                        material.map = null;
                        material.color.set(color);
                        material.needsUpdate = true;
                    }
                }
            }
        });
    }, [clone, color, loadedTexture, textureScale, textureOffset]);

    return (
        <primitive
            object={clone}
            scale={1.8}
            position={[0, -2, 0]}
        />
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ThreeViewer({ initialColor, textureUrl, measurements }: { initialColor?: string, textureUrl?: string, measurements?: any }) {
    const [outfitColor, setOutfitColor] = React.useState<string>(initialColor || "#ffffff");
    const [pose, setPose] = React.useState<Pose>("t-pose");
    // Texture Controls
    const [textureScale, setTextureScale] = React.useState<number>(1);
    const [textureOffset, setTextureOffset] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [autoRotate, setAutoRotate] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (initialColor) {
            setOutfitColor(initialColor);
        }
    }, [initialColor]);

    const recommendedSize = React.useMemo(() => {
        if (!measurements) return null;
        // Mock logic for size recommendation
        const height = measurements.estimated_height_cm || 170;
        if (height > 180) return "L";
        if (height < 165) return "S";
        return "M";
    }, [measurements]);

    return (
        <div className="relative w-full h-[500px] bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
            <Canvas camera={{ position: [0, 1.5, 3], fov: 45 }} shadows>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <directionalLight position={[-5, 5, 5]} intensity={0.5} />
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <AvatarModel
                        color={outfitColor}
                        pose={pose}
                        textureUrl={textureUrl}
                        textureScale={textureScale}
                        textureOffset={textureOffset}
                    />
                    <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                    <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.8} enablePan={false} />
                </Suspense>
            </Canvas>

            {/* Overlay UI */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur p-4 rounded-lg shadow-lg max-w-[250px] z-20">
                <h3 className="text-sm font-semibold mb-2 text-slate-800 dark:text-white">TRY-ON CUSTOMIZATION</h3>

                <div className="mb-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">OUTFIT COLOR</p>
                    <div className="flex gap-2 flex-wrap">
                        {['#ffffff', '#1a1a1a', '#2563eb', '#dc2626', '#16a34a'].map((c) => (
                            <button
                                key={c}
                                onClick={() => setOutfitColor(c)}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${outfitColor === c ? 'border-indigo-500 scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                                aria-label={`Select color ${c}`}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {textureUrl && (
                <div className="mb-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">FABRIC ADJUSTMENT</p>
                    <div className="space-y-2">
                        <div>
                            <label className="text-[10px] text-slate-500">Zoom (Scale)</label>
                            <input
                                type="range" min="0.5" max="5" step="0.1"
                                value={textureScale}
                                onChange={(e) => setTextureScale(parseFloat(e.target.value))}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500">Pan X</label>
                            <input
                                type="range" min="-1" max="1" step="0.05"
                                value={textureOffset.x}
                                onChange={(e) => setTextureOffset(prev => ({ ...prev, x: parseFloat(e.target.value) }))}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500">Pan Y</label>
                            <input
                                type="range" min="-1" max="1" step="0.05"
                                value={textureOffset.y}
                                onChange={(e) => setTextureOffset(prev => ({ ...prev, y: parseFloat(e.target.value) }))}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">POSE</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPose("t-pose")}
                        className={`px-3 py-1 text-xs rounded border transition-colors ${pose === "t-pose" ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-transparent border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        T-Pose
                    </button>
                    <button
                        onClick={() => setPose("natural")}
                        className={`px-3 py-1 text-xs rounded border transition-colors ${pose === "natural" ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-transparent border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        Natural
                    </button>
                    <button
                        onClick={() => setPose("check-fit")}
                        className={`px-3 py-1 text-xs rounded border transition-colors ${pose === "check-fit" ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-transparent border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        Fit Check
                    </button>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-center text-slate-400">
                    Interact with the 3D model to see details before you try it on.
                </p>
            </div>

            {/* Recommendation Badge */}
            {
                recommendedSize && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-20 animate-in fade-in slide-in-from-left-4 duration-700">
                        <p className="text-xs font-bold uppercase opacity-80">AI Recommended Size</p>
                        <p className="text-2xl font-black">{recommendedSize}</p>
                    </div>
                )
            }
        </div >
    );
}
