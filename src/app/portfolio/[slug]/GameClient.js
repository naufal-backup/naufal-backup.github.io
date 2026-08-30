"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function GameClient({ slug }) {
    const iframeRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    useLayoutEffect(() => {
        setIsReady(true);
    }, []);

    return (
        <div className={`w-full h-screen bg-black flex items-center justify-center relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isReady && !isExiting ? 'translate-x-0' : isExiting ? 'translate-x-full' : 'translate-x-full'
        }`}>
            {/* Back Button */}
            <button
                onClick={() => {
                    setIsExiting(true);
                    setTimeout(() => router.push('/'), 500);
                }}
                className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all cursor-pointer"
                title="Back to Home"
            >
                <FaArrowLeft size={18} />
            </button>
            {/* Loading indicator */}
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
                    e.target.contentWindow.focus();
                }}
            />
        </div>
    );
}
