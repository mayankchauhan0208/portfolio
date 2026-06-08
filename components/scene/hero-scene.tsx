"use client";

import { Float, MeshTransmissionMaterial, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function DesignerFigure() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.15;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.18} floatIntensity={0.45}>
      <group ref={group} position={[0, -0.2, 0]}>
        <mesh position={[0, 1.28, 0]}>
          <sphereGeometry args={[0.44, 48, 48]} />
          <MeshTransmissionMaterial
            thickness={0.35}
            roughness={0.12}
            transmission={0.58}
            ior={1.35}
            chromaticAberration={0.06}
            color="#eef6ff"
          />
        </mesh>
        <mesh position={[0, 0.26, 0]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.58, 1.45, 12, 36]} />
          <meshStandardMaterial color="#151820" metalness={0.55} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0.42, 0.6]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[1.12, 0.72, 0.045]} />
          <meshStandardMaterial color="#0a1016" emissive="#2ddcff" emissiveIntensity={0.55} roughness={0.25} metalness={0.4} />
        </mesh>
        <mesh position={[-0.78, 0.1, 0]} rotation={[0, 0, -0.28]}>
          <capsuleGeometry args={[0.12, 1.05, 8, 20]} />
          <meshStandardMaterial color="#20242d" metalness={0.45} roughness={0.32} />
        </mesh>
        <mesh position={[0.78, 0.1, 0]} rotation={[0, 0, 0.28]}>
          <capsuleGeometry args={[0.12, 1.05, 8, 20]} />
          <meshStandardMaterial color="#20242d" metalness={0.45} roughness={0.32} />
        </mesh>
        <mesh position={[-0.26, -1.08, 0]} rotation={[0, 0, 0.08]}>
          <capsuleGeometry args={[0.16, 1.28, 8, 20]} />
          <meshStandardMaterial color="#11151c" metalness={0.55} roughness={0.3} />
        </mesh>
        <mesh position={[0.26, -1.08, 0]} rotation={[0, 0, -0.08]}>
          <capsuleGeometry args={[0.16, 1.28, 8, 20]} />
          <meshStandardMaterial color="#11151c" metalness={0.55} roughness={0.3} />
        </mesh>
        <mesh position={[0, -1.86, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.1, 0.01, 10, 150]} />
          <meshBasicMaterial color="#8ee8ff" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const vertices = new Float32Array(360 * 3);
    for (let i = 0; i < 360; i += 1) {
      vertices[i * 3] = (Math.random() - 0.5) * 11;
      vertices[i * 3 + 1] = (Math.random() - 0.5) * 7;
      vertices[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return vertices;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.025;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.06;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#8ee8ff" transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function Rings() {
  return (
    <group rotation={[0.85, 0.2, -0.25]}>
      {[2.35, 2.85, 3.35].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.55]}>
          <torusGeometry args={[radius, 0.006, 10, 160]} />
          <meshBasicMaterial color={index === 1 ? "#d8c59b" : "#8ee8ff"} transparent opacity={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingPanels() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.08;
  });

  return (
    <group ref={group}>
      {[
        [-2.15, 0.95, -0.35, 0.12],
        [2.05, 0.55, -0.5, -0.1],
        [-1.65, -0.95, -0.25, -0.16],
        [1.65, -1.2, -0.35, 0.18]
      ].map(([x, y, z, r], index) => (
        <mesh key={index} position={[x, y, z]} rotation={[0.05, r, r]}>
          <boxGeometry args={[0.9, 0.5, 0.025]} />
          <meshStandardMaterial
            color={index % 2 ? "#11161d" : "#17202a"}
            emissive={index % 2 ? "#d8c59b" : "#8ee8ff"}
            emissiveIntensity={0.12}
            metalness={0.55}
            roughness={0.22}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 3, 5]} intensity={30} color="#8ee8ff" />
        <pointLight position={[-4, -2, 3]} intensity={16} color="#d8c59b" />
        <spotLight position={[0, 5, 4]} angle={0.38} penumbra={0.8} intensity={38} color="#ffffff" />
        <Stars radius={20} depth={8} count={900} factor={1.8} saturation={0} fade speed={0.18} />
        <ParticleField />
        <Rings />
        <FloatingPanels />
        <DesignerFigure />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.28} />
      </Suspense>
    </Canvas>
  );
}
