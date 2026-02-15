import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaDownload } from 'react-icons/fa';
import dynamic from 'next/dynamic';
// ...existing code...
// Dynamically import react-pdf components with SSR disabled
const PDFViewer = dynamic(() => import('../portfolio/[slug]/PDFViewer'), { ssr: false });
import { useEffect, useState } from 'react';
// Path to the PDF in public folder
const cvPath = '/documents/CV-1.pdf';

export default function FirstSection() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showCV, setShowCV] = useState(false);
    const [cvBlobUrl, setCvBlobUrl] = useState(null);
    // Prefetch PDF as blob for instant open
    useEffect(() => {
        let revoked = false;
        fetch(cvPath)
            .then(res => res.blob())
            .then(blob => {
                if (!revoked) {
                    setCvBlobUrl(URL.createObjectURL(blob));
                }
            });
        return () => {
            revoked = true;
            setCvBlobUrl(url => {
                if (url) URL.revokeObjectURL(url);
                return null;
            });
        };
    }, []);

    // Helper: detect mobile
    function isMobile() {
        if (typeof window === 'undefined') return false;
        return window.innerWidth <= 768;
    }

    return (
            <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
                <div className="max-w-4xl w-full fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#9ca3af]">
                        Hello, I&apos;m <span className="text-[#e5e5e5] inline-flex items-center flex-wrap">
                            <span className="mr-2">Naufal</span>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.span
                                        initial={{ width: 0, opacity: 0, marginRight: 0 }}
                                        animate={{ width: "auto", opacity: 1, marginRight: "0.5rem" }}
                                        exit={{ width: 0, opacity: 0, marginRight: 0 }}
                                        transition={{ 
                                            width: { type: "spring", stiffness: 120, damping: 20 },
                                            opacity: { duration: 0.9 },
                                            marginRight: { duration: 0.9 }
                                        }}
                                        className="overflow-hidden whitespace-nowrap"
                                    >
                                        Gastiadirrijal Fawwaz
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            <span>Alamsyah</span>
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)} 
                                className="text-2xl md:text-3xl hover:text-white transition-colors focus:outline-none ml-2"
                                aria-label={isExpanded ? "Collapse name" : "Expand name"}
                            >
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                                >
                                    <FaChevronDown className="w-6 h-6" />
                                </motion.div>
                            </button>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#9ca3af] mb-4">
                        Frontend Developer, UI/UX Designer, Junior Game Developer
                    </p>
                    <p className="text-lg text-[#6b7280] max-w-2xl leading-relaxed">
                        I craft beautiful digital experiences with a focus on clean design,
                        intuitive interfaces, and modern web technologies. Passionate about
                        turning ideas into reality.
                    </p>
                    <div className="mt-12 flex gap-4 items-center">
                        <a
                            href="#portfolio"
                            className="inline-block px-8 py-4 bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-all duration-300 rounded-lg text-[#e5e5e5] font-medium"
                        >
                            View My Work
                        </a>
                        <div className="inline-flex ml-2 rounded-lg overflow-hidden shadow-sm border border-[#333]">
                            <button
                                onClick={() => {
                                    if (isMobile()) {
                                        window.open(cvBlobUrl || cvPath, '_blank', 'noopener');
                                    } else {
                                        setShowCV(true);
                                    }
                                }}
                                className="px-6 py-4 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#e5e5e5] font-medium focus:outline-none transition-all duration-300 cursor-pointer"
                                style={{ borderRight: '1px solid #333' }}
                            >
                                View CV
                            </button>
                            <a
                                href={cvPath}
                                download
                                className="px-6 py-4 bg-[#232323] hover:bg-[#3a3a3a] text-[#e5e5e5] font-medium focus:outline-none transition-all duration-300 cursor-pointer"
                                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                                title="Download CV"
                            >
                                <FaDownload className="" />
                            </a>
                        </div>
                        <AnimatePresence>
                        {showCV && (
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <motion.div
                                    className="bg-[#222] rounded-lg p-4 max-w-3xl w-full relative shadow-lg"
                                    initial={{ scale: 0.85, opacity: 0, y: 40 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.85, opacity: 0, y: 40 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 22, duration: 0.35 }}
                                >
                                    <button
                                        onClick={() => setShowCV(false)}
                                        className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-400 focus:outline-none"
                                        aria-label="Close CV"
                                    >
                                        ×
                                    </button>
                                    <div className="overflow-auto max-h-[80vh] flex justify-center">
                                        <PDFViewer file={cvBlobUrl || cvPath} />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
    );
}