"use client";
import { useRef, useState, useEffect, useCallback } from 'react';
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

function useScrollState(threshold = 0.15) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden");
  const prevScrollY = useRef(0);
  const observerRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        const nowVisible = entry.isIntersecting;
        isVisibleRef.current = nowVisible;

        if (nowVisible && !wasVisible) {
          setState("visible");
        } else if (!nowVisible && wasVisible) {
          setState("hidden");
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [threshold]);

  return [ref, state];
}

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = false,
  threshold = 0.15,
}) {
  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);

  if (once) {
    return (
      <ScrollRevealOnce
        animation={animation}
        delay={delay}
        duration={duration}
        className={className}
        threshold={threshold}
      >
        {children}
      </ScrollRevealOnce>
    );
  }

  return (
    <ScrollRevealRepeat
      animation={animation}
      delay={delay}
      duration={duration}
      className={className}
      threshold={threshold}
    >
      {children}
    </ScrollRevealRepeat>
  );
}

function ScrollRevealOnce({ children, animation, delay, duration, className, threshold }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
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
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollRevealRepeat({ children, animation, delay, duration, className, threshold }) {
  const containerRef = useRef(null);
  const [state, setState] = useState("hidden");
  const isVisibleRef = useRef(false);
  const isInitialRef = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        const nowVisible = entry.isIntersecting;
        isVisibleRef.current = nowVisible;

        if (isInitialRef.current) {
          isInitialRef.current = false;
          if (!nowVisible) {
            setState("hidden");
          }
          return;
        }

        if (nowVisible && !wasVisible) {
          setState("visible");
        } else if (!nowVisible && wasVisible) {
          setState("hidden");
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={state}
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
        state === "hidden" && !isInitialRef.current
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
  const containerRef = useRef(null);
  const [state, setState] = useState("hidden");
  const isVisibleRef = useRef(false);
  const isInitialRef = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        const nowVisible = entry.isIntersecting;
        isVisibleRef.current = nowVisible;

        if (isInitialRef.current) {
          isInitialRef.current = false;
          if (!nowVisible) setState("hidden");
          return;
        }

        if (nowVisible && !wasVisible) {
          setState("visible");
        } else if (!nowVisible && wasVisible) {
          setState("hidden");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={state}
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
