import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaMicrochip, FaDatabase, FaServer, FaCode } from "react-icons/fa";

// Tech-themed assets
const TECH_SYMBOLS = ["</>", "{ }", "[ ]", "()", "//", "#", "=>", "~"];
const TECH_ICONS = [FaLaptopCode, FaMicrochip, FaDatabase, FaServer, FaCode];

// Tech Bokeh Colors
const COLORS = ["#00f3ff", "#00ffff", "#bb00ff", "#ff9900", "#4d79ff"];

const TechElement = ({ item, size, color, blur }) => {
  if (typeof item === "string") {
    return (
      <span
        style={{
          color: color,
          fontSize: size,
          fontWeight: "bold",
          fontFamily: "monospace",
          opacity: 0.8,
          filter: `drop-shadow(0 0 10px ${color}) blur(${blur}px)`,
        }}
      >
        {item}
      </span>
    );
  }
  const Icon = item;
  return (
    <Icon
      size={size}
      color={color}
      style={{
        opacity: 0.8,
        filter: `drop-shadow(0 0 12px ${color}) blur(${blur}px)`,
      }}
    />
  );
};

const BackgroundAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let t;
    const mouseMove = (e) => {
      // Throttle slightly for performance
      if(t) return;
      t = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        t = null;
      }, 16);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  // Compute slight parallax offset based on cursor position for the interaction
  const parallaxX = (typeof window !== "undefined" ? (mousePosition.x - window.innerWidth / 2) * 0.05 : 0);
  const parallaxY = (typeof window !== "undefined" ? (mousePosition.y - window.innerHeight / 2) * 0.05 : 0);

  // Generate multi-layered floating elements
  const generateLayer = (count, layerType) => {
    return Array.from({ length: count }).map((_, i) => {
      const isSymbol = Math.random() > 0.5;
      const asset = isSymbol
        ? TECH_SYMBOLS[Math.floor(Math.random() * TECH_SYMBOLS.length)]
        : TECH_ICONS[Math.floor(Math.random() * TECH_ICONS.length)];

      let size, blur, duration, opacity;
      if (layerType === "back") {
        size = Math.random() * 40 + 40; // 40-80px
        blur = Math.random() * 4 + 6;   // 6-10px blur
        opacity = 0.2;
        duration = Math.random() * 15 + 25; // 25-40s (slowest)
      } else if (layerType === "mid") {
        size = Math.random() * 20 + 20; // 20-40px
        blur = Math.random() * 2 + 2;   // 2-4px blur
        opacity = 0.4;
        duration = Math.random() * 10 + 18; // 18-28s
      } else {
        // Front
        size = Math.random() * 15 + 10; // 10-25px
        blur = 0;                       // sharp
        opacity = 0.7;
        duration = Math.random() * 8 + 12; // 12-20s (fastest)
      }

      return {
        id: `${layerType}-${i}`,
        asset,
        size,
        blur,
        opacity,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        left: Math.random() * 100, // random x-axis %
        duration,
        delay: Math.random() * 10,
        drift: Math.random() * 80 - 40, // horizontal sway
      };
    });
  };

  const backLayer = generateLayer(10, "back");
  const midLayer = generateLayer(15, "mid");
  const frontLayer = generateLayer(12, "front");
  const allParticles = [...backLayer, ...midLayer, ...frontLayer];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Floating Elements Layers */}
      {allParticles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: "110vh", x: 0, opacity: 0, scale: 0.8 }}
          animate={{
            y: "-15vh",
            x: [
                parallaxX * (particle.size * 0.05), 
                particle.drift + parallaxX * (particle.size * 0.05), 
                (particle.drift * -1) + parallaxX * (particle.size * 0.05), 
                parallaxX * (particle.size * 0.05)
               ],
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0.8, 1.2, 0.9, 1.1]
          }}
          transition={{
            y: { duration: particle.duration, repeat: Infinity, ease: "linear", delay: particle.delay },
            x: { duration: particle.duration * 0.8, repeat: Infinity, ease: "easeInOut", delay: particle.delay },
            opacity: { duration: particle.duration, repeat: Infinity, ease: "easeInOut", delay: particle.delay },
            scale: { duration: particle.duration * 0.5, repeat: Infinity, ease: "easeInOut", delay: particle.delay },
          }}
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            pointerEvents: "none",
          }}
        >
          <TechElement
            item={particle.asset}
            size={particle.size}
            color={particle.color}
            blur={particle.blur}
          />
        </motion.div>
      ))}

      {/* Subtle glowing cursor interaction aura */}
      <motion.div
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", mass: 0.5, stiffness: 100, damping: 25 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 243, 255, 0.15) 0%, rgba(187, 0, 255, 0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          mixBlendMode: "screen"
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
