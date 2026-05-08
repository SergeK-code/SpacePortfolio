"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props: any) => {
    const ref: any = useRef();
    const [sphere] = useState(() =>
        random.inSphere(new Float32Array(5000), { radius: 1.2 })
    );

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <points ref={ref} frustumCulled {...props}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={sphere}
                        count={sphere.length / 3}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    transparent
                    color="#fff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </points>
        </group>
    );
};

const StarsCanvas = () => (
    <div className="pointer-events-none w-full h-full fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
        </Canvas>
    </div>
);

export default StarsCanvas;