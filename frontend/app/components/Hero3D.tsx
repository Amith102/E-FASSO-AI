"use client";

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

function HeroModel() {
    // Reuse the same model URL for consistency
    const { scene } = useGLTF('https://models.readyplayer.me/65a8dba831b23abb4f401bae.glb');
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        // Smooth floating rotation
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + 0.5; // Gentle back and forth
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 2; // Floating bob
    });

    return (
        <group ref={group}>
            <primitive object={scene} scale={2.8} />
        </group>
    );
}

export default function Hero3D() {
    return (
        <div className="w-full h-full min-h-[500px] relative z-0">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {/* Futuristic Environment */}
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <HeroModel />
                    </Float>
                    <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={10} color="#0062f5" />
                </Suspense>

                {/* Slight interactivity but limited to keep it "Hero-like" */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.8}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Overlay Gradient for seamless integration */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    );
}
