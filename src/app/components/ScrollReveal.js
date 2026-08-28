"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const animations = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  bounceIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 12 } },
  },
  popIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  },
  flipX: {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
  },
  slideRotate: {
    hidden: { opacity: 0, y: 40, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 150, damping: 15 } },
  },
};

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = false,
  threshold = 0.15,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: isSpring
            ? { ...variant.visible.transition, delay }
            : { duration, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      transition={
        !isInView
          ? { duration: 0.4, ease: [0.4, 0, 1, 1] }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.08 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, animation = "fadeUp", className = "" }) {
  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);

  return (
    <motion.div
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: isSpring ? variant.visible.transition : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
