"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaMousePointer } from "react-icons/fa";

export default function GameClient({ slug }) {
    const iframeRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

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

        const keyCodeMap = {
            w: 87,
            a: 65,
            s: 83,
            d: 68,
            " ": 32, // Space
        };

        const keyCode = keyCodeMap[key.toLowerCase()];

        const event = new KeyboardEvent(type, {
            key: key,
            code: `Key${key.toUpperCase()}`,
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true,
            view: iframeRef.current.contentWindow,
        });

        iframeRef.current.contentWindow.document.dispatchEvent(event);
    };

    const simulateClick = (type) => {
        if (!iframeRef.current || !iframeRef.current.contentWindow) return;

        // Simulate click at the center of the screen or canvas if possible
        // For now, disptach to the document body or canvas
        const target = iframeRef.current.contentWindow.document.body; // or canvas if found

        const event = new MouseEvent(type, {
            view: iframeRef.current.contentWindow,
            bubbles: true,
            cancelable: true,
            buttons: 1,
        });

        target.dispatchEvent(event);
    };

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center relative">
            {/* Loading indicator */}
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10 pointer-events-none">
                <div className="text-white text-xl">Loading game...</div>
            </div>

            <iframe
                ref={iframeRef}
                src={`/portfolio/${slug}/index.html`}
                className="w-full h-full border-0 relative z-20"
                title={slug}
                loading="eager"
                onLoad={(e) => {
                    // Hide loading indicator logic could be improved here by removing the div above via state
                    e.target.previousSibling.style.display = 'none';
                    // Focus the iframe so it receives input
                    e.target.contentWindow.focus();
                }}
            />

            {/* Mobile Controls Overlay */}
            {isMobile && (
                <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end pb-20 px-6">
                    <div className="flex justify-between items-end w-full pointer-events-auto">
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
                        <button
                            className="w-20 h-20 bg-red-500/50 backdrop-blur-md rounded-full flex items-center justify-center active:bg-red-500/70 touch-none select-none"
                            onTouchStart={() => simulateClick("mousedown")}
                            onTouchEnd={() => {
                                simulateClick("mouseup");
                                simulateClick("click");
                            }}
                            onMouseDown={() => simulateClick("mousedown")}
                            onMouseUp={() => {
                                simulateClick("mouseup");
                                simulateClick("click");
                            }}
                        >
                            <FaMousePointer className="text-white text-2xl" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
