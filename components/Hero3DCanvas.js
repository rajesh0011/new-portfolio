"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export default function Hero3DCanvas() {
  const containerRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Color theme definition
    const isDark = resolvedTheme === "dark";
    const primaryColor = isDark ? 0xd4a857 : 0xb08a3e; // Gold
    const secondaryColor = isDark ? 0x22b8a6 : 0x178778; // Teal
    const tertiaryColor = isDark ? 0x5fd4c4 : 0x3b82f6;

    // Outer geometric cage (Icosahedron)
    const icoGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const icoWireframe = new THREE.WireframeGeometry(icoGeometry);
    const icoLineMaterial = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.35 : 0.45,
      blending: THREE.AdditiveBlending,
    });
    const icoMesh = new THREE.LineSegments(icoWireframe, icoLineMaterial);
    scene.add(icoMesh);

    // Inner dodecahedron core
    const coreGeometry = new THREE.DodecahedronGeometry(0.85, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Outer floating orbital rings
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.4 : 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    scene.add(ring2);

    // Star/Particle Constellation Points
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      scales[i / 3] = Math.random() * 0.05 + 0.02;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: tertiaryColor,
      size: 0.065,
      transparent: true,
      opacity: isDark ? 0.8 : 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Interaction Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = true;

    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    }

    window.addEventListener("pointermove", onPointerMove);

    // Visibility observer to pause when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Resize handler
    function onResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // Animation loop
    let reqId;
    let clock = new THREE.Clock();

    function animate() {
      reqId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse damping
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Rotations
      icoMesh.rotation.x = elapsed * 0.15 + currentY * 0.5;
      icoMesh.rotation.y = elapsed * 0.2 + currentX * 0.5;

      coreMesh.rotation.x = -elapsed * 0.25 - currentY * 0.4;
      coreMesh.rotation.y = -elapsed * 0.3 - currentX * 0.4;

      ring1.rotation.z = elapsed * 0.12;
      ring2.rotation.z = -elapsed * 0.15;

      particles.rotation.y = elapsed * 0.06 + currentX * 0.2;
      particles.rotation.x = elapsed * 0.04 + currentY * 0.2;

      // Floating breathing pulse
      const breathe = 1 + Math.sin(elapsed * 1.5) * 0.035;
      icoMesh.scale.set(breathe, breathe, breathe);
      coreMesh.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();

      // Cleanup geometries and materials
      icoGeometry.dispose();
      icoWireframe.dispose();
      icoLineMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[340px] w-full items-center justify-center sm:h-[420px] lg:h-[480px]"
      aria-hidden="true"
    />
  );
}
