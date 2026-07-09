"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingGallery({ images }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
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
        const startX = (col * cellWidth) + (Math.random() * (cellWidth * 0.6));
        const startY = (row * cellHeight) + (Math.random() * (cellHeight * 0.6));

        // Randomize animation parameters
        const duration = 25 + Math.random() * 25;
        const delay = Math.random() * -20; // negative delay so it starts mid-animation

        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: startX, top: startY, width: "160px", zIndex: 10 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, Math.random() * 500 - 250, Math.random() * 500 - 250, 0],
              y: [0, Math.random() * 500 - 250, Math.random() * 500 - 250, 0],
              rotate: [Math.random() * 10 - 5, Math.random() * 30 - 15, Math.random() * -30 + 15, Math.random() * 10 - 5],
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
              className="p-2 rounded-2xl shadow-[0_0_20px_rgba(255,105,180,0.4)] border border-pink-300/30 bg-white/5 backdrop-blur-md pointer-events-auto cursor-grab active:cursor-grabbing"
              drag
              dragElastic={0.6}
              dragMomentum={false}
              whileHover={{ scale: 1.15, zIndex: 50, transition: { duration: 0.2 } }}
              whileDrag={{ scale: 1.25, zIndex: 60 }}
            >
              <img
                src={`/Sayang/${img}`}
                alt="Gallery"
                className="w-full h-auto rounded-xl pointer-events-none"
                draggable="false"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
