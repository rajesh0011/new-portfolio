"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { Globe } from "lucide-react";

// Key cities coordinates [lat, lon, name]
const CITIES = [
  { lat: 28.4595, lon: 77.0266, name: "Gurugram / Delhi", main: true },
  { lat: 19.076, lon: 72.8777, name: "Mumbai" },
  { lat: 25.2048, lon: 55.2708, name: "Dubai" },
  { lat: 51.5074, lon: -0.1278, name: "London" },
  { lat: 40.7128, lon: -74.006, name: "New York" },
  { lat: 1.3521, lon: 103.8198, name: "Singapore" },
];

// Helper to convert lat/long to 3D Cartesian coordinates on sphere
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate bezier arc curve between two lat/lon points
function createArc(v1, v2, radius, color) {
  const dist = v1.distanceTo(v2);
  const mid = v1.clone().add(v2).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize();
  mid.multiplyScalar(radius + dist * 0.35); // arc elevation

  const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Line(geometry, material);
}

export default function Globe3D({ className = "" }) {
  const containerRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = 360;

    // Initialize Three.js renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const isDark = resolvedTheme === "dark";
    const globeRadius = 80;

    // Globe root group for rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Dark inner core sphere
    const coreGeometry = new THREE.SphereGeometry(globeRadius - 0.5, 36, 36);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x070b14 : 0xf2ede1,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // 2. Glowing atmosphere ring
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius * 1.15, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x22b8a6 : 0xd4a857,
      transparent: true,
      opacity: isDark ? 0.08 : 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // 3. Dotted World Sphere Matrix (Fibonacci sphere sampling with density)
    const dotCount = 1800;
    const dotPositions = [];
    const dotColors = [];
    const colorGold = new THREE.Color(isDark ? 0xd4a857 : 0xb08a3e);
    const colorTeal = new THREE.Color(isDark ? 0x22b8a6 : 0x178778);
    const colorFaint = new THREE.Color(isDark ? 0x1e293b : 0xd1c7b7);

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.cos(phi);
      const z = globeRadius * Math.sin(phi) * Math.sin(theta);

      dotPositions.push(x, y, z);

      // Distribute continents vs ocean accent dots
      const isLandAccent = Math.sin(x * 0.05) * Math.cos(y * 0.05) * Math.sin(z * 0.05) > 0.05;
      const c = isLandAccent ? (i % 3 === 0 ? colorGold : colorTeal) : colorFaint;
      dotColors.push(c.r, c.g, c.b);
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute("color", new THREE.Float32BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
    });
    const dotPoints = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(dotPoints);

    // 4. City Pin Markers
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const cityVectors = [];
    CITIES.forEach((city) => {
      const pos = latLonToVector3(city.lat, city.lon, globeRadius + 1);
      cityVectors.push(pos);

      // Marker point
      const pinGeom = new THREE.SphereGeometry(city.main ? 2.5 : 1.8, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({
        color: city.main ? 0xd4a857 : 0x5fd4c4,
      });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.position.copy(pos);
      pinGroup.add(pinMesh);

      // Outer ripple ring
      const ringGeom = new THREE.RingGeometry(2.5, 3.8, 20);
      const ringMat = new THREE.MeshBasicMaterial({
        color: city.main ? 0xd4a857 : 0x22b8a6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      pinGroup.add(ringMesh);
    });

    // 5. Arcs from Delhi (main hub) to other world cities
    const mainCityPos = cityVectors[0]; // Delhi
    const arcColor = isDark ? 0xd4a857 : 0xb08a3e;
    for (let i = 1; i < cityVectors.length; i++) {
      const arc = createArc(mainCityPos, cityVectors[i], globeRadius, arcColor);
      globeGroup.add(arc);
    }

    // Interactive Drag Controls (Mouse & Touch)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotationSpeedX = 0;
    let rotationSpeedY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      if (renderer.domElement) renderer.domElement.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      globeGroup.rotation.y += deltaX * 0.007;
      globeGroup.rotation.x += deltaY * 0.007;
      rotationSpeedX = deltaX * 0.007;
      rotationSpeedY = deltaY * 0.007;
    };

    const onMouseUp = () => {
      isDragging = false;
      if (renderer.domElement) renderer.domElement.style.cursor = "grab";
    };

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (!e.touches[0]) return;
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!isDragging || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      globeGroup.rotation.y += deltaX * 0.007;
      globeGroup.rotation.x += deltaY * 0.007;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.style.cursor = "grab";
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        // Auto smooth rotation
        globeGroup.rotation.y += 0.0035;
        // Damp user rotation momentum
        rotationSpeedX *= 0.95;
        rotationSpeedY *= 0.95;
        globeGroup.rotation.y += rotationSpeedX;
        globeGroup.rotation.x += rotationSpeedY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);

      coreGeometry.dispose();
      coreMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      renderer.dispose();

      if (dom && container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      className={`relative flex w-full max-w-[500px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-ink-line/10 bg-white/40 p-6 shadow-xl backdrop-blur-md dark:border-paper/10 dark:bg-ink-soft/40 ${className}`}
    >
      {/* Top Header Badge */}
      <div className="flex w-full items-center justify-between border-b border-ink-line/10 pb-3 dark:border-paper/10">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-gold" />
          <span className="eyebrow">Interactive 3D Globe</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-teal-dark dark:text-teal-light">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-teal" />
          Drag to Rotate
        </span>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="relative mt-2 flex h-[340px] w-full items-center justify-center sm:h-[360px]"
      />

      {/* Bottom Locations Legend */}
      <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-2 border-t border-ink-line/10 pt-3 text-[11px] font-mono text-ink/60 dark:text-paper/60">
        <span className="flex items-center gap-1 font-semibold text-gold-dark dark:text-gold">
          <span className="h-2 w-2 rounded-full bg-gold" /> Gurugram/Delhi
        </span>
        <span className="text-ink/30 dark:text-paper/30">·</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Mumbai
        </span>
        <span className="text-ink/30 dark:text-paper/30">·</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Dubai
        </span>
        <span className="text-ink/30 dark:text-paper/30">·</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" /> London
        </span>
        <span className="text-ink/30 dark:text-paper/30">·</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" /> New York
        </span>
        <span className="text-ink/30 dark:text-paper/30">·</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Singapore
        </span>
      </div>
    </div>
  );
}
