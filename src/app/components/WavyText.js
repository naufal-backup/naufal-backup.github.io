'use client';
import { motion } from 'framer-motion';

const WavyText = ({ text, className = "" }) => {
  // Split text into characters, preserving spaces
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeInOut",
      }
    },
    hover: {
      y: [-2, -5, -2],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.5,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.span 
        className={`inline-block ${className}`}
        initial="hidden"
        animate="visible"
        whileTap="hover"
        whileHover="hover"
        variants={container}
    >
      {letters.map((letter, index) => (
        <motion.span 
            variants={child} 
            key={index} 
            className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default WavyText;
