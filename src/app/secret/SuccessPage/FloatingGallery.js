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
        // Randomize initial position keeping them mostly inside the view
        const startX = Math.random() * (windowSize.width - 200);
        const startY = Math.random() * (windowSize.height - 250);

        // Randomize animation parameters
        const duration = 20 + Math.random() * 20;
        const delay = Math.random() * -20; // negative delay so it starts mid-animation

        return (
          <motion.div
            key={i}
            className="absolute p-2 rounded-2xl shadow-[0_0_20px_rgba(255,105,180,0.4)] border border-pink-300/30 bg-white/5 backdrop-blur-md pointer-events-auto cursor-pointer"
            style={{ left: startX, top: startY, width: "160px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, Math.random() * 300 - 150, Math.random() * 300 - 150, 0],
              y: [0, Math.random() * 300 - 150, Math.random() * 300 - 150, 0],
              rotate: [Math.random() * 10 - 5, Math.random() * 20 - 10, Math.random() * -20 + 10, Math.random() * 10 - 5],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
              delay: delay,
            }}
            whileHover={{ scale: 1.2, zIndex: 50, transition: { duration: 0.3 } }}
          >
            <img
              src={`/Sayang/${img}`}
              alt="Gallery"
              className="w-full h-auto rounded-xl object-cover"
              draggable="false"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
