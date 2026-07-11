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

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {images.map((img, i) => {
        // Determine grid layout for even spreading
        const cols = Math.max(2, Math.ceil(Math.sqrt(images.length * (windowSize.width / windowSize.height))));
        const rows = Math.ceil(images.length / cols);
        const cellWidth = windowSize.width / cols;
        const cellHeight = windowSize.height / rows;
        
        const col = i % cols;
        const row = Math.floor(i / cols);

        // Position evenly with some randomness within their cell
        const seed = i + 1;
        const startX = (col * cellWidth) + (seededRandom(seed) * (cellWidth * 0.6));
        const startY = (row * cellHeight) + (seededRandom(seed + 10) * (cellHeight * 0.6));

        // Randomize animation parameters
        const motionRange = windowSize.width < 640 ? 180 : 500;
        const motionOffset = motionRange / 2;
        const duration = 25 + seededRandom(seed + 20) * 25;
        const delay = seededRandom(seed + 30) * -20; // negative delay so it starts mid-animation

        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none flex items-center justify-center"
            style={{ left: startX, top: startY, zIndex: 10 }}
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, seededRandom(seed + 40) * motionRange - motionOffset, seededRandom(seed + 50) * motionRange - motionOffset, 0],
              y: [0, seededRandom(seed + 60) * motionRange - motionOffset, seededRandom(seed + 70) * motionRange - motionOffset, 0],
              rotate: [seededRandom(seed + 80) * 10 - 5, seededRandom(seed + 90) * 30 - 15, seededRandom(seed + 100) * -30 + 15, seededRandom(seed + 110) * 10 - 5],
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
              drag
              dragElastic={0.6}
              dragMomentum={false}
              whileHover={{ scale: 1.15, zIndex: 50, transition: { duration: 0.2 } }}
              whileDrag={{ scale: 1.25, zIndex: 60 }}
            >
              <img
                src={`/Sayang/${img}`}
                alt="Gallery"
                className="w-auto h-auto max-w-[118px] max-h-[150px] rounded-xl pointer-events-none sm:max-w-[180px] sm:max-h-[220px] md:max-w-[240px] md:max-h-[280px]"
                draggable="false"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
