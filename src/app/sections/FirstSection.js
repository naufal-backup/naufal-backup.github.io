import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaDownload, FaRegWindowClose } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import WavyText from '../components/WavyText';
const PDFViewer = dynamic(() => import('../portfolio/[slug]/PDFViewer'), { ssr: false });
import { useEffect, useState } from 'react';
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
            <section className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-[#0a0a0a]">
                <div className="max-w-4xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#a0a0a0]">
                            Hello, I&apos;m <span className="text-[#f5f5f5] inline-flex items-center flex-wrap">
                                <h2 className="mr-2"><WavyText text="Naufal" /></h2>
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
                                            <WavyText text="Gastiadirrijal Fawwaz" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                <h2><WavyText text="Alamsyah" /></h2>
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
                        </h2>
                    </motion.div>

                    <motion.p
                        className="text-xl md:text-2xl text-[#a0a0a0] mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <WavyText text="Frontend Developer | Desktop Developer | UI/UX Designer | Game Developer" />
                    </motion.p>

                    <motion.p
                        className="text-lg text-[#808080] max-w-2xl leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        turning ideas into reality.
                    </motion.p>

                    <motion.div
                        className="mt-12 flex gap-4 items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <a
                            href="#portfolio"
                            className="inline-block px-8 py-4 bg-[#4a9eff] hover:bg-[#3d8ae6] transition-all duration-300 rounded-lg text-white font-medium"
                        >
                            View My Work
                        </a>
                        <div className="inline-flex ml-2 rounded-lg overflow-hidden border border-[#2a2a2a]">
                            <button
                                onClick={() => {
                                    if (isMobile()) {
                                        window.open(cvBlobUrl || cvPath, '_blank', 'noopener');
                                    } else {
                                        setShowCV(true);
                                    }
                                }}
                                className="px-6 py-4 bg-[#1a1a1a] hover:bg-[#242424] text-[#f5f5f5] font-medium focus:outline-none transition-all duration-300 cursor-pointer "
                                style={{ borderRight: '1px solid #2a2a2a' }}
                            >
                                View CV
                            </button>
                            <a
                                href={cvPath}
                                download
                                className="px-6 py-4 bg-[#1a1a1a] hover:bg-[#242424] text-[#f5f5f5] font-medium focus:outline-none transition-all duration-300 cursor-pointer"
                                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                                title="Download CV"
                            >
                                <FaDownload className="" />
                            </a>
                        </div>
                        <AnimatePresence>
                        {showCV && (
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <motion.div
                                    className="bg-[#1a1a1a] rounded-lg p-4 max-w-3xl w-full relative border border-[#2a2a2a]"
                                    initial={{ scale: 0.85, opacity: 0, y: 40 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.85, opacity: 0, y: 40 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 22, duration: 0.35 }}
                                >
                                    <button
                                        onClick={() => setShowCV(false)}
                                        className="absolute top-2 right-2 text-[#a0a0a0] text-2xl font-bold hover:text-[#4a9eff] focus:outline-none"
                                        aria-label="Close CV"
                                    >
                                        <FaRegWindowClose className="hover:scale-110 transition-transform" />
                                        

                                    </button>
                                    <div className="overflow-auto max-h-[80vh] flex justify-center">
                                        <PDFViewer file={cvBlobUrl || cvPath} />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
    );
}
