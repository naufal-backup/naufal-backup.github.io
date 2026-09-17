import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaDownload, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import WavyText from '../components/WavyText';
import { useState } from 'react';

const WA_NUMBER = '628138187989';
const WA_CTA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo, saya mau konsultasi gratis tentang pembuatan website.')}`;
const cvPath = '/documents/CV-1.pdf';

export default function FirstSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
            <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 pb-12 bg-[#0a0a0a]">
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
                        className="mt-12 flex flex-wrap gap-4 items-center"
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
                        <a
                            href={WA_CTA}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#22c55e] hover:bg-[#16a34a] transition-all duration-300 rounded-lg text-white font-medium"
                        >
                            <FaWhatsapp className="text-xl" />
                            Pesan Website
                        </a>
                        <div className="inline-flex ml-2 rounded-lg overflow-hidden border border-[#2a2a2a]">
                            <Link
                                href="/resume"
                                className="px-6 py-4 bg-[#1a1a1a] hover:bg-[#242424] text-[#f5f5f5] font-medium focus:outline-none transition-all duration-300 cursor-pointer "
                                style={{ borderRight: '1px solid #2a2a2a' }}
                            >
                                View CV
                            </Link>
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
                    </motion.div>
                </div>
            </section>
    );
}
