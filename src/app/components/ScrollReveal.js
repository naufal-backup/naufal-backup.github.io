"use client";
import { useRef, useEffect, useCallback } from 'react';
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

function useScrollDirection() {
  const lastY = useRef(0);
  const direction = useRef("down");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      direction.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}

const scrollDirRef = typeof window !== "undefined" ? (() => {
  let dir = "down";
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    dir = y > lastY ? "down" : "up";
    lastY = y;
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  return { current: dir };
})() : { current: "down" };

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
  const prevInView = useRef(false);
  const hasAnimated = useRef(false);

  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);

  const getTransition = (target) => {
    if (target === "hidden") {
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
    if (isInView) {
      hasAnimated.current = true;
      return "visible";
    }
    if (hasAnimated.current && !isInView) {
      return "hidden";
    }
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
  const hasAnimated = useRef(false);

  const getTarget = () => {
    if (isInView) {
      hasAnimated.current = true;
      return "visible";
    }
    if (hasAnimated.current && !isInView) {
      return "hidden";
    }
    return "hidden";
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={getTarget()}
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
