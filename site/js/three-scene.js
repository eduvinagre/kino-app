/* ============================================
   Three.js - Interactive Particle Network
   Cloud connectivity visualization for hero
   ============================================ */

(function () {
    'use strict';

    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // --- Configuration ---
    const CONFIG = {
        particleCount: 180,
        connectionDistance: 120,
        mouseInfluence: 150,
        particleSize: 2,
        speed: 0.3,
        fieldWidth: 800,
        fieldHeight: 500,
        fieldDepth: 400,
        colorPrimary: 0xFF9900,
        colorAccent: 0x00D4FF,
        colorWhite: 0xFFFFFF,
    };

    // --- Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 1, 2000);
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // --- Mouse tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    document.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // --- Particles ---
    const particles = [];
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(CONFIG.particleCount * 3);
    const colors = new Float32Array(CONFIG.particleCount * 3);
    const sizes = new Float32Array(CONFIG.particleCount);

    const colorPrimary = new THREE.Color(CONFIG.colorPrimary);
    const colorAccent = new THREE.Color(CONFIG.colorAccent);
    const colorWhite = new THREE.Color(CONFIG.colorWhite);

    for (let i = 0; i < CONFIG.particleCount; i++) {
        const particle = {
            x: (Math.random() - 0.5) * CONFIG.fieldWidth,
            y: (Math.random() - 0.5) * CONFIG.fieldHeight,
            z: (Math.random() - 0.5) * CONFIG.fieldDepth,
            vx: (Math.random() - 0.5) * CONFIG.speed,
            vy: (Math.random() - 0.5) * CONFIG.speed,
            vz: (Math.random() - 0.5) * CONFIG.speed * 0.5,
            baseSize: CONFIG.particleSize + Math.random() * 2,
        };
        particles.push(particle);

        positions[i * 3] = particle.x;
        positions[i * 3 + 1] = particle.y;
        positions[i * 3 + 2] = particle.z;

        // Mix between primary, accent, and white
        const colorChoice = Math.random();
        let color;
        if (colorChoice < 0.4) {
            color = colorPrimary;
        } else if (colorChoice < 0.7) {
            color = colorAccent;
        } else {
            color = colorWhite;
        }
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = particle.baseSize;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for particles
    const particleMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            varying float vAlpha;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                float dist = length(mvPosition.xyz);
                vAlpha = smoothstep(800.0, 200.0, dist);
                gl_PointSize = size * (400.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            varying float vAlpha;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
                gl_FragColor = vec4(vColor, alpha);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- Connection lines ---
    const lineGeometry = new THREE.BufferGeometry();
    const maxConnections = CONFIG.particleCount * 6;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // --- Animation loop ---
    let animationId;
    let time = 0;

    function animate() {
        animationId = requestAnimationFrame(animate);
        time += 0.01;

        // Smooth mouse
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Update particles
        const posAttr = particleGeometry.getAttribute('position');
        const sizeAttr = particleGeometry.getAttribute('size');

        for (let i = 0; i < CONFIG.particleCount; i++) {
            const p = particles[i];

            // Apply velocity
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Mouse influence
            const mouseWorldX = mouse.x * (CONFIG.fieldWidth * 0.5);
            const mouseWorldY = mouse.y * (CONFIG.fieldHeight * 0.5);
            const dx = p.x - mouseWorldX;
            const dy = p.y - mouseWorldY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONFIG.mouseInfluence) {
                const force = (1 - dist / CONFIG.mouseInfluence) * 0.8;
                p.x += dx * force * 0.02;
                p.y += dy * force * 0.02;
                sizeAttr.array[i] = p.baseSize * (1 + force * 1.5);
            } else {
                sizeAttr.array[i] = p.baseSize;
            }

            // Gentle floating
            p.y += Math.sin(time + i * 0.1) * 0.05;

            // Boundary wrapping
            const hw = CONFIG.fieldWidth * 0.5;
            const hh = CONFIG.fieldHeight * 0.5;
            const hd = CONFIG.fieldDepth * 0.5;
            if (p.x > hw) p.x = -hw;
            if (p.x < -hw) p.x = hw;
            if (p.y > hh) p.y = -hh;
            if (p.y < -hh) p.y = hh;
            if (p.z > hd) p.z = -hd;
            if (p.z < -hd) p.z = hd;

            posAttr.array[i * 3] = p.x;
            posAttr.array[i * 3 + 1] = p.y;
            posAttr.array[i * 3 + 2] = p.z;
        }

        posAttr.needsUpdate = true;
        sizeAttr.needsUpdate = true;

        // Update connections
        const lPos = lineGeometry.getAttribute('position');
        const lCol = lineGeometry.getAttribute('color');
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

                    lPos.array[idx] = pi.x;
                    lPos.array[idx + 1] = pi.y;
                    lPos.array[idx + 2] = pi.z;
                    lPos.array[idx + 3] = pj.x;
                    lPos.array[idx + 4] = pj.y;
                    lPos.array[idx + 5] = pj.z;

                    const r = 1.0 * alpha * 0.3;
                    const g = 0.6 * alpha * 0.3;
                    const b = 0.0 * alpha * 0.3;
                    lCol.array[idx] = r;
                    lCol.array[idx + 1] = g;
                    lCol.array[idx + 2] = b;
                    lCol.array[idx + 3] = r;
                    lCol.array[idx + 4] = g;
                    lCol.array[idx + 5] = b;

                    lineIndex++;
                }
            }
        }

        // Clear remaining
        for (let i = lineIndex * 6; i < maxConnections * 6; i++) {
            lPos.array[i] = 0;
            lCol.array[i] = 0;
        }

        lPos.needsUpdate = true;
        lCol.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIndex * 2);

        // Slow rotation
        particleSystem.rotation.y = time * 0.05 + mouse.x * 0.1;
        particleSystem.rotation.x = mouse.y * 0.05;
        lineSystem.rotation.y = particleSystem.rotation.y;
        lineSystem.rotation.x = particleSystem.rotation.x;

        renderer.render(scene, camera);
    }

    // --- Resize ---
    function onResize() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    window.addEventListener('resize', onResize);

    // --- Start ---
    animate();

    // Expose cleanup
    window._threeCleanup = function () {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
    };
})();
