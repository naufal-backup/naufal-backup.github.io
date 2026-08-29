"use client";
import { useRef, useState, useEffect, useContext, createContext, useCallback, Children } from 'react';
import { motion } from 'framer-motion';

// --- Scroll direction tracker (module-level, single listener) ---
let scrollDir = 'down';
let lastScrollY = 0;
let scrollListenerAttached = false;

function ensureScrollDirListener() {
  if (scrollListenerAttached || typeof window === 'undefined') return;
  scrollListenerAttached = true;
  lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastScrollY + 1) scrollDir = 'down';
    else if (y < lastScrollY - 1) scrollDir = 'up';
    lastScrollY = y;
  }, { passive: true });
}

// Context for StaggerContainer → StaggerItem communication
const StaggerDelayContext = createContext(null);
const StaggerItemIndexContext = createContext(0);

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

const ScrollContext = createContext(null);

function useScrollRegistry() {
  const registry = useRef(new Map());
  const ticking = useRef(false);

  const checkAll = useCallback(() => {
    const vh = window.innerHeight;
    registry.current.forEach((entry) => {
      const rect = entry.el.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;
      const thresholdPx = entry.threshold * vh;

      const nowInView = bottom > thresholdPx && top < vh - thresholdPx;
      const wasInView = entry.wasInView;

      if (nowInView && !wasInView) {
        entry.wasInView = true;
        entry.setState("visible");
      } else if (!nowInView && wasInView) {
        entry.wasInView = false;
        entry.setState("hidden");
      }
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          checkAll();
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Don't checkAll() on mount — wait for first scroll so animations are visible

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [checkAll]);

  const register = useCallback((id, el, setState, threshold) => {
    registry.current.set(id, {
      el,
      setState,
      threshold,
      wasInView: false,
    });
    // Don't check initial visibility — let scroll trigger the animation
  }, []);

  const unregister = useCallback((id) => {
    registry.current.delete(id);
  }, []);

  return { register, unregister };
}

let nextId = 0;

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = false,
  threshold = 0.15,
}) {
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
  const [state, setState] = useState("hidden");
  const elRef = useRef(null);
  const idRef = useRef(nextId++);
  const ctx = useContext(ScrollContext);

  useEffect(() => {
    if (!ctx || !elRef.current) return;
    ctx.register(idRef.current, elRef.current, setState, threshold);
    return () => ctx.unregister(idRef.current);
  }, [ctx, threshold]);

  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);

  return (
    <motion.div
      ref={elRef}
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
        state === "hidden"
          ? { duration: 0.4, ease: [0.4, 0, 1, 1] }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollRevealRepeat({ children, animation, delay, duration, className, threshold }) {
  const [state, setState] = useState("hidden");
  const elRef = useRef(null);
  const idRef = useRef(nextId++);
  const ctx = useContext(ScrollContext);

  useEffect(() => {
    if (!ctx || !elRef.current) return;
    ctx.register(idRef.current, elRef.current, setState, threshold);
    return () => ctx.unregister(idRef.current);
  }, [ctx, threshold]);

  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);

  return (
    <motion.div
      ref={elRef}
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
        state === "hidden"
          ? { duration: 0.4, ease: [0.4, 0, 1, 1] }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProvider({ children }) {
  const { register, unregister } = useScrollRegistry();
  return (
    <ScrollContext.Provider value={{ register, unregister }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.08 }) {
  const elRef = useRef(null);

  // Ensure scroll direction listener is active
  useEffect(() => { ensureScrollDirListener(); }, []);

  const contextValue = { staggerDelay, containerRef: elRef };

  return (
    <StaggerDelayContext.Provider value={contextValue}>
      <div
        ref={elRef}
        className={className}
      >
        {Children.map(children, (child, index) => {
          if (!child) return null;
          return (
            <StaggerItemIndexContext.Provider value={index} key={child.key || index}>
              {child}
            </StaggerItemIndexContext.Provider>
          );
        })}
      </div>
    </StaggerDelayContext.Provider>
  );
}

export function StaggerItem({ children, animation = "fadeUp", className = "" }) {
  const variant = animations[animation] || animations.fadeUp;
  const isSpring = ["bounceIn", "popIn", "flipX", "slideRotate"].includes(animation);
  const staggerCtx = useContext(StaggerDelayContext);
  const itemIndex = useContext(StaggerItemIndexContext);
  const ctx = useContext(ScrollContext);

  const [state, setState] = useState("hidden");
  const [itemDelay, setItemDelay] = useState(0);
  const elRef = useRef(null);
  const idRef = useRef(nextId++);

  useEffect(() => {
    if (!ctx || !elRef.current) return;
    const staggerDelay = staggerCtx?.staggerDelay ?? 0.08;
    const containerEl = staggerCtx?.containerRef?.current;

    ctx.register(idRef.current, elRef.current, (newState) => {
      if (newState === "visible" && containerEl) {
        // Compute column count from container layout
        const style = getComputedStyle(containerEl);
        const directChildren = Array.from(containerEl.children);
        let cols = 1;
        if (style.display === 'grid' || style.display === 'inline-grid') {
          cols = style.gridTemplateColumns.split(' ').filter(s => s.trim()).length;
        } else {
          if (directChildren.length > 0) {
            const firstTop = directChildren[0].getBoundingClientRect().top;
            cols = directChildren.filter(c => Math.abs(c.getBoundingClientRect().top - firstTop) < 2).length;
            if (cols < 1) cols = 1;
          }
        }

        // Compute column position within row
        const colIdx = itemIndex % cols;
        const maxCol = Math.min(cols, directChildren.length) - 1;

        // Scroll down → left-to-right within row, scroll up → right-to-left
        const order = scrollDir === 'down' ? colIdx : (maxCol - colIdx);
        setItemDelay(order * staggerDelay * 0.4);
      }
      setState(newState);
    }, 0.12);

    return () => ctx.unregister(idRef.current);
  }, [ctx, staggerCtx, itemIndex]);

  return (
    <motion.div
      ref={elRef}
      initial="hidden"
      animate={state}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: isSpring
            ? { ...variant.visible.transition, delay: itemDelay }
            : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: itemDelay },
        },
      }}
      transition={
        state === "hidden"
          ? { duration: 0.3, ease: [0.4, 0, 1, 1] }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
