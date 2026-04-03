'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CONFIG = {
  particleCount: 300,
  connectionDistance: 150,
  mouseInfluence: 200,
  particleSize: 3,
  speed: 0.3,
  fieldWidth: 700,
  fieldHeight: 450,
  fieldDepth: 300,
};

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseSize: number;
}

const vertexShader = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = length(mvPosition.xyz);
    vAlpha = smoothstep(1000.0, 100.0, dist);
    gl_PointSize = size * (500.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d) * vAlpha * 1.4;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function ParticleNetwork(): React.ReactElement {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { particles, positions, colors, sizes } = useMemo(() => {
    const count = CONFIG.particleCount;
    const p: Particle[] = [];
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const colorPrimary = new THREE.Color(0xFF9900);
    const colorAccent = new THREE.Color(0x00D4FF);
    const colorWhite = new THREE.Color(0xFFFFFF);

    for (let i = 0; i < count; i++) {
      const particle: Particle = {
        x: (Math.random() - 0.5) * CONFIG.fieldWidth,
        y: (Math.random() - 0.5) * CONFIG.fieldHeight,
        z: (Math.random() - 0.5) * CONFIG.fieldDepth,
        vx: (Math.random() - 0.5) * CONFIG.speed,
        vy: (Math.random() - 0.5) * CONFIG.speed,
        vz: (Math.random() - 0.5) * CONFIG.speed * 0.5,
        baseSize: CONFIG.particleSize + Math.random() * 3,
      };
      p.push(particle);

      pos[i * 3] = particle.x;
      pos[i * 3 + 1] = particle.y;
      pos[i * 3 + 2] = particle.z;

      const choice = Math.random();
      const color = choice < 0.4 ? colorPrimary : choice < 0.7 ? colorAccent : colorWhite;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sz[i] = particle.baseSize;
    }

    return { particles: p, positions: pos, colors: col, sizes: sz };
  }, []);

  const maxConnections = CONFIG.particleCount * 6;
  const linePositions = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);
  const lineColors = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);

  const onPointerMove = useCallback((e: THREE.Event & { clientX?: number; clientY?: number }) => {
    const event = e as unknown as PointerEvent;
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const sizeAttr = pointsRef.current.geometry.getAttribute('size') as THREE.BufferAttribute;

    for (let i = 0; i < CONFIG.particleCount; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      const mouseWorldX = mx * (CONFIG.fieldWidth * 0.5);
      const mouseWorldY = my * (CONFIG.fieldHeight * 0.5);
      const dx = p.x - mouseWorldX;
      const dy = p.y - mouseWorldY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.mouseInfluence) {
        const force = (1 - dist / CONFIG.mouseInfluence) * 0.8;
        p.x += dx * force * 0.02;
        p.y += dy * force * 0.02;
        (sizeAttr.array as Float32Array)[i] = p.baseSize * (1 + force * 1.5);
      } else {
        (sizeAttr.array as Float32Array)[i] = p.baseSize;
      }

      p.y += Math.sin(time + i * 0.1) * 0.05;

      const hw = CONFIG.fieldWidth * 0.5;
      const hh = CONFIG.fieldHeight * 0.5;
      const hd = CONFIG.fieldDepth * 0.5;
      if (p.x > hw) p.x = -hw;
      if (p.x < -hw) p.x = hw;
      if (p.y > hh) p.y = -hh;
      if (p.y < -hh) p.y = hh;
      if (p.z > hd) p.z = -hd;
      if (p.z < -hd) p.z = hd;

      (posAttr.array as Float32Array)[i * 3] = p.x;
      (posAttr.array as Float32Array)[i * 3 + 1] = p.y;
      (posAttr.array as Float32Array)[i * 3 + 2] = p.z;
    }

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;

    const lGeo = linesRef.current.geometry;
    const lPos = lGeo.getAttribute('position') as THREE.BufferAttribute;
    const lCol = lGeo.getAttribute('color') as THREE.BufferAttribute;
    let lineIndex = 0;

    for (let i = 0; i < CONFIG.particleCount; i++) {
      for (let j = i + 1; j < CONFIG.particleCount; j++) {
        if (lineIndex >= maxConnections) break;
        const pi = particles[i];
        const pj = particles[j];
        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const dz = pi.z - pj.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONFIG.connectionDistance) {
          const alpha = 1 - dist / CONFIG.connectionDistance;
          const idx = lineIndex * 6;
          const la = lPos.array as Float32Array;
          const ca = lCol.array as Float32Array;
          la[idx] = pi.x;
          la[idx + 1] = pi.y;
          la[idx + 2] = pi.z;
          la[idx + 3] = pj.x;
          la[idx + 4] = pj.y;
          la[idx + 5] = pj.z;

          const r = 1.0 * alpha * 0.5;
          const g = 0.6 * alpha * 0.5;
          ca[idx] = r;
          ca[idx + 1] = g;
          ca[idx + 2] = 0;
          ca[idx + 3] = r;
          ca[idx + 4] = g;
          ca[idx + 5] = 0;
          lineIndex++;
        }
      }
    }

    const la = lPos.array as Float32Array;
    const ca = lCol.array as Float32Array;
    for (let i = lineIndex * 6; i < maxConnections * 6; i++) {
      la[i] = 0;
      ca[i] = 0;
    }

    lPos.needsUpdate = true;
    lCol.needsUpdate = true;
    lGeo.setDrawRange(0, lineIndex * 2);

    pointsRef.current.rotation.y = time * 0.05 + mx * 0.1;
    pointsRef.current.rotation.x = my * 0.05;
    linesRef.current.rotation.y = pointsRef.current.rotation.y;
    linesRef.current.rotation.x = pointsRef.current.rotation.x;
  });

  return (
    <group onPointerMove={onPointerMove}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene(): React.ReactElement {
  return (
    <div className="hero-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 450], fov: 65, near: 1, far: 2000 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
