import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useGLTF, useAnimations, OrbitControls, Html, useProgress } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: '#f97316',
        fontSize: '0.8rem',
        fontWeight: '500',
        letterSpacing: '0.05em',
        opacity: 0.6,
        whiteSpace: 'nowrap'
      }}>
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function BoyCharacter() {
  const group = useRef();

  // Load the GLB model with baked animations
  const { scene, animations } = useGLTF('/Model_1781683792730.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (scene) {
      scene.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    if (names && names.length > 0) {
      // Find an animation that sounds like 'hi', 'wave', or 'greeting', otherwise play the first one
      const actionName = names.find(n => n.toLowerCase().includes('hi') || n.toLowerCase().includes('wave') || n.toLowerCase().includes('greeting')) || names[0];
      if (actions[actionName]) {
        actions[actionName].reset().fadeIn(0.5).play();
      }
    }
  }, [actions, names]);



  useFrame((state) => {
    if (!group.current) return;
    const targetRotationY = state.pointer.x * (Math.PI / 3);
    group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.05;
  });

  return (
    <group ref={group} scale={1.3} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* ── Floating Particles ─────────────────────────────────── */
function Particles() {
  const ref = useRef();
  const COUNT = 60;
  const [positions] = useState(() => {
    const a = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      a[i * 3] = (Math.random() - 0.5) * 5;
      a[i * 3 + 1] = (Math.random() - 0.5) * 5;
      a[i * 3 + 2] = (Math.random() - 0.5) * 2 - 0.5;
    }
    return a;
  });

  useFrame(() => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      p[i * 3 + 1] += 0.005;
      if (p[i * 3 + 1] > 2.5) p[i * 3 + 1] = -2.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f97316" size={0.038} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function HaloRing() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.5;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
      <torusGeometry args={[0.65, 0.011, 16, 100]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.65} />
    </mesh>
  );
}

function GlowDisc() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.18 + Math.sin(clock.getElapsedTime() * 1.8) * 0.08;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
      <circleGeometry args={[0.9, 64]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.18} depthWrite={false} />
    </mesh>
  );
}

/* ── Exported component ─────────────────────────────────── */
export default function Character3D() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.0, 3.2], fov: 52 }}
        style={{ background: 'transparent' }}
        shadows={false}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[3, 5, 4]} intensity={1.7} color="#fff8f0" />
        <directionalLight position={[-3, 2, -2]} intensity={0.55} color="#f97316" />

        <Suspense fallback={<Loader />}>
          <BoyCharacter />
        </Suspense>

        <Particles />
        <HaloRing />
        <GlowDisc />
        <ContactShadows position={[0, -1.0, 0]} opacity={0.42} scale={3.5} blur={2} far={2} color="#f97316" />
      </Canvas>
    </div>
  );
}
