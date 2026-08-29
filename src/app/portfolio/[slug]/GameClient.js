"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaMousePointer, FaPlay } from "react-icons/fa";

export default function GameClient({ slug }) {
    const iframeRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); // New state to track if iframe loaded
    const [isActionActive, setIsActionActive] = useState(false); // Track action button press state
    const [showEntryOverlay, setShowEntryOverlay] = useState(true); // Entry transition overlay
    const [isExiting, setIsExiting] = useState(false); // Back transition overlay
    const router = useRouter();

    // Slide out entry overlay after mount
    useEffect(() => {
        const timer = setTimeout(() => setShowEntryOverlay(false), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const simulateKey = (key, type) => {
        if (!iframeRef.current || !iframeRef.current.contentWindow) return;

        const canvas = iframeRef.current.contentWindow.document.getElementById("canvas");
        if (!canvas) return;

        // Focus canvas to ensure it receives input
        canvas.focus();

        const keyCodeMap = {
            w: 87,
            a: 65,
            s: 83,
            d: 68,
            " ": 32,
        };

        const codeMap = {
            w: "KeyW",
            a: "KeyA",
            s: "KeyS",
            d: "KeyD",
            " ": "Space"
        };

        const keyCode = keyCodeMap[key.toLowerCase()];
        const code = codeMap[key.toLowerCase()];

        const eventObj = {
            key: key,
            code: code,
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true,
            composed: true,
            view: iframeRef.current.contentWindow,
        };

        const event = new KeyboardEvent(type, eventObj);
        canvas.dispatchEvent(event);
    };

    const simulateClick = (type) => {
        if (!iframeRef.current || !iframeRef.current.contentWindow) return;

        const canvas = iframeRef.current.contentWindow.document.getElementById("canvas");
        if (!canvas) return;

        canvas.focus();

        const event = new MouseEvent(type, {
            view: iframeRef.current.contentWindow,
            bubbles: true,
            cancelable: true,
            buttons: 1,
            clientX: canvas.width / 2, // Center of canvas
            clientY: canvas.height / 2,
        });

        canvas.dispatchEvent(event);
    };

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center relative">
            {/* Entry transition overlay - slide out to left */}
            <div
                className={`fixed inset-0 z-[9999] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showEntryOverlay ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ background: '#FFE500' }}
            >
                <FaPlay className="text-[#111] text-5xl animate-pulse" />
            </div>
            {/* Back transition overlay - slide in from left */}
            <div
                className={`fixed inset-0 z-[9998] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isExiting ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ background: '#FFE500' }}
            >
                <FaArrowLeft className="text-[#111] text-5xl animate-pulse" />
            </div>
            {/* Back Button */}
            <button
                onClick={() => {
                    sessionStorage.setItem('fromGame', 'true');
                    setIsExiting(true);
                    setTimeout(() => router.push('/'), 500);
                }}
                className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all cursor-pointer"
                title="Back to Home"
            >
                <FaArrowLeft size={18} />
            </button>
            {/* Loading indicator - Show until loaded */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10 pointer-events-none">
                    <div className="text-white text-xl animate-pulse">Loading game resources...</div>
                </div>
            )}

            <iframe
                ref={iframeRef}
                src={`/portfolio/${slug}/index.html`}
                className="w-full h-full border-0 relative z-20"
                title={slug}
                loading="eager"
                onLoad={(e) => {
                    setIsLoaded(true);
                    // Attempt to inject style to hide default Godot splash if it persists, 
                    // though we depend on it for loading progress initially.
                    // We just focus here.
                    e.target.contentWindow.focus();
                }}
            />

            {/* Mobile Controls Overlay */}
            {isLoaded && isMobile && (
                <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end pb-20 px-6">
                    <div 
                        className="flex items-end pointer-events-auto w-fit" 
                        onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        {/* D-Pad (WASD) */}
                        <div className="grid grid-cols-3 gap-2">
                            <div />
                            <button
                                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center active:bg-white/40 touch-none select-none"
                                onTouchStart={() => simulateKey("w", "keydown")}
                                onTouchEnd={() => simulateKey("w", "keyup")}
                                onMouseDown={() => simulateKey("w", "keydown")}
                                onMouseUp={() => simulateKey("w", "keyup")}
                            >
                                <FaArrowUp className="text-white text-xl" />
                            </button>
                            <div />
                            <button
                                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center active:bg-white/40 touch-none select-none"
                                onTouchStart={() => simulateKey("a", "keydown")}
                                onTouchEnd={() => simulateKey("a", "keyup")}
                                onMouseDown={() => simulateKey("a", "keydown")}
                                onMouseUp={() => simulateKey("a", "keyup")}
                            >
                                <FaArrowLeft className="text-white text-xl" />
                            </button>
                            <button
                                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center active:bg-white/40 touch-none select-none"
                                onTouchStart={() => simulateKey("s", "keydown")}
                                onTouchEnd={() => simulateKey("s", "keyup")}
                                onMouseDown={() => simulateKey("s", "keydown")}
                                onMouseUp={() => simulateKey("s", "keyup")}
                            >
                                <FaArrowDown className="text-white text-xl" />
                            </button>
                            <button
                                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center active:bg-white/40 touch-none select-none"
                                onTouchStart={() => simulateKey("d", "keydown")}
                                onTouchEnd={() => simulateKey("d", "keyup")}
                                onMouseDown={() => simulateKey("d", "keydown")}
                                onMouseUp={() => simulateKey("d", "keyup")}
                            >
                                <FaArrowRight className="text-white text-xl" />
                            </button>
                        </div>

                        {/* Action Button (Left Click) */}
                        {/* <button
                            className="w-20 h-20 bg-red-500/50 backdrop-blur-md rounded-full flex items-center justify-center active:bg-red-500/70 touch-none select-none"
                            onTouchStart={() => simulateClick("mousedown")}
                            ...
                        >
                            <FaMousePointer className="text-white text-2xl" />
                        </button> */}
                    </div>
                </div>
            )}

            {/* Action Button (Left Click / Play) - Posisi bottom-6 right-6 sama persis dengan tombol mute di homepage */}
            {isLoaded && isMobile && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
                    <button
                        className="relative overflow-hidden flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform duration-300 active:scale-95 touch-none select-none"
                        style={{
                            background: 'rgba(40, 40, 40, 0.85)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                        }}
                        onTouchStart={(e) => {
                            e.preventDefault();
                            setIsActionActive(true);
                            simulateClick("mousedown");
                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            setIsActionActive(false);
                            simulateClick("mouseup");
                            simulateClick("click");
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setIsActionActive(true);
                            simulateClick("mousedown");
                        }}
                        onMouseUp={(e) => {
                            e.preventDefault();
                            setIsActionActive(false);
                            simulateClick("mouseup");
                            simulateClick("click");
                        }}
                        onMouseLeave={() => setIsActionActive(false)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        title="Action / Play"
                    >
                        {/* Animasi fade in right-to-left saat tombol ditekan */}
                        <div 
                            className={`absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/40 to-violet-500/60 transition-all duration-300 ease-out rounded-full ${
                                isActionActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                            }`}
                        />
                        <FaPlay className="text-white text-md pl-1 relative z-10" />
                    </button>
                </div>
            )}
        </div>
    );
}
