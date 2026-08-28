"use client";
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const animations = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  },
  bounceIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 12 } },
    exit: { opacity: 0, scale: 0.3, transition: { duration: 0.25 } },
  },
  popIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.25 } },
  },
  flipX: {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
    exit: { opacity: 0, rotateX: -90, transition: { duration: 0.3 } },
  },
  slideRotate: {
    hidden: { opacity: 0, y: 40, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 150, damping: 15 } },
    exit: { opacity: 0, y: -40, rotate: 5, transition: { duration: 0.3 } },
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
  const prevInView = useRef(isInView);

  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);

  const getTransition = (target) => {
    if (target === "exit") {
      return { duration: 0.35, ease: [0.4, 0, 1, 1] };
    }
    if (target === "visible") {
      return isSpring
        ? { ...variant.visible.transition, delay }
        : { duration, ease: [0.22, 1, 0.36, 1], delay };
    }
    return {};
  };

  const getTarget = () => {
    if (isInView) return "visible";
    if (prevInView.current && !isInView) return "exit";
    return "hidden";
  };

  useEffect(() => {
    prevInView.current = isInView;
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={getTarget()}
      variants={{
        hidden: variant.hidden,
        visible: variant.visible,
        exit: variant.exit,
      }}
      transition={getTransition(getTarget())}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.08 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const prevInView = useRef(isInView);

  const getTarget = () => {
    if (isInView) return "visible";
    if (prevInView.current && !isInView) return "exit";
    return "hidden";
  };

  useEffect(() => {
    prevInView.current = isInView;
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={getTarget()}
      variants={{
        hidden: {},
        exit: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
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
        exit: variant.exit,
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
