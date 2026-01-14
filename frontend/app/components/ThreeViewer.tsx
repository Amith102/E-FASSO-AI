"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';

function AvatarModel({ url }: { url?: string }) {
    // Logic to load user avatar or default
    // const { scene } = useGLTF(url || '/default_avatar.glb'); 
    // For prototype, we use a simple mesh if no URL
    return (
        <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.5, 2, 8]} />
            <meshStandardMaterial color="#cccccc" />
        </mesh>
    );
}

export default function ThreeViewer() {
    return (
        <div className="w-full h-full min-h-[400px] bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden relative">
            <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-bias={-0.0001} />
                <Suspense fallback={null}>
                    <AvatarModel />
                    <Environment preset="city" />
                    <ContactShadows resolution={1024} scale={10} blur={4} opacity={0.25} far={10} color="#000000" />
                </Suspense>
                <OrbitControls enablePan={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
            </Canvas>
            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                Interactive 3D View
            </div>
        </div>
    );
}
