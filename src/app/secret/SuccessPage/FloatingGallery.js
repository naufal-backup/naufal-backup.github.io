"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function seededRandom(seed) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

export default function FloatingGallery({ images }) {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === "undefined") return { width: 0, height: 0 };
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  const isMobile = windowSize.width < 640;
  const cap = isMobile ? Math.min(images.length, 6) : images.length;
  const visibleImages = images.slice(0, cap);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {visibleImages.map((img, i) => {
        const seed = i + 1;
        const cellWidth = windowSize.width / Math.ceil(Math.sqrt(cap));
        const cellHeight = windowSize.height / Math.ceil(cap / Math.ceil(Math.sqrt(cap)));
        const col = i % Math.ceil(Math.sqrt(cap));
        const row = Math.floor(i / Math.ceil(Math.sqrt(cap)));

        const startX = col * cellWidth + seededRandom(seed) * cellWidth * 0.4;
        const startY = row * cellHeight + seededRandom(seed + 10) * cellHeight * 0.4;

        const animX = isMobile
          ? [0, seededRandom(seed + 40) * 60 - 30, seededRandom(seed + 50) * 60 - 30, 0]
          : [0, seededRandom(seed + 40) * 500 - 250, seededRandom(seed + 50) * 500 - 250, 0];
        const animY = isMobile
          ? [0, seededRandom(seed + 60) * 60 - 30, seededRandom(seed + 70) * 60 - 30, 0]
          : [0, seededRandom(seed + 60) * 500 - 250, seededRandom(seed + 70) * 500 - 250, 0];
        const animRotate = isMobile ? [0, 0, 0, 0] : [
          seededRandom(seed + 80) * 10 - 5,
          seededRandom(seed + 90) * 30 - 15,
          seededRandom(seed + 100) * -30 + 15,
          seededRandom(seed + 110) * 10 - 5,
        ];

        const duration = 20 + seededRandom(seed + 20) * 20;
        const delay = seededRandom(seed + 30) * -15;

        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none flex items-center justify-center"
            style={{ left: startX, top: startY, zIndex: 10, willChange: 'transform' }}
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: animX,
              y: animY,
              rotate: animRotate,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
              delay: delay,
            }}
          >
            <motion.div
              className="p-2 rounded-2xl shadow-[0_0_22px_rgba(56,189,248,0.42)] border border-cyan-200/35 bg-sky-950/25 backdrop-blur-md pointer-events-auto cursor-grab active:cursor-grabbing inline-flex"
              drag={!isMobile}
              dragElastic={0.6}
              dragMomentum={false}
              whileHover={isMobile ? {} : { scale: 1.15, zIndex: 50, transition: { duration: 0.2 } }}
              whileDrag={isMobile ? {} : { scale: 1.25, zIndex: 60 }}
            >
              <img
                src={`/Sayang/${encodeURIComponent(img)}`}
                alt="Gallery"
                className="w-auto h-auto max-w-[90px] max-h-[120px] rounded-xl pointer-events-none sm:max-w-[150px] sm:max-h-[190px] md:max-w-[200px] md:max-h-[240px]"
                draggable="false"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
