"use client";

import { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaChevronDown } from 'react-icons/fa';
import { SiLaravel, SiMysql, SiBootstrap, SiTailwindcss, SiGodotengine, SiJavascript, SiGtk, SiGnubash, SiNextdotjs, SiUnity } from 'react-icons/si';
import { CgMail } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [showGithubPopup, setShowGithubPopup] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleGithubPopup = () => setShowGithubPopup(!showGithubPopup);

    const portfolioItems = [
        { id: 1, title: "Alternate Arc Archive", category: "Fan-made website for Alternate Arc", description: "Made with Laravel, MySQL, and Bootstrap", url: "https://github.com/naufal-backup/Alternate-Arc-Archive3", image: "/images/alternate-arc-archive.png" },
        { id: 2, title: "Ruang Santri", category: "Website for Education", description: "Made with Laravel, MySQL, Bootstrap, and Tailwind CSS", url: "https://ruang-santri.com/", image: "/images/ruang-santri.png" },
        { id: 3, title: "Project-A", category: "Action Top-Down Web Game", description: "Made with Godot Engine", url: "/portfolio/project-a", image: "/images/project-a.png" },
        { id: 4, title: "GTK Theme Customizer", category: "GTK Window Customization", description: "Made with Javascript, GTK, and Linux Shell Script", url: "https://github.com/naufal-backup/Gtk-Theme-Customizer",image: "/images/gtk-theme-customizer.png" },
        { id: 5, title: "This Page", category: "Portfolio Website", description: "Made with Next.js, Tailwind CSS, and Framer Motion", url: "https://naufal-backup.github.io", image:"/images/this-page.png" },
        { id: 6, title: "Waste Sorter", category: "Educational Game", description: "Made with Unity2D", url: "https://github.com/naufal-backup/Waste-Sorter", image: "/images/waste-sorter.png" },
    ];

    const stackWeb = [
        { name: "Laravel", icon: <SiLaravel size={24} className="text-[#FF2D20]" /> },
        { name: "MySQL", icon: <SiMysql size={24} className="text-[#4479A1]" /> },
        { name: "Bootstrap", icon: <SiBootstrap size={24} className="text-[#7952B3]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size={24} className="text-[#06B6D4]" /> },
        // { name: "Javascript", icon: <SiJavascript size={24} className="text-[#F7DF1E]" /> },
        { name: "Next.js", icon: <SiNextdotjs size={24} className="text-white" /> },
    ];
    const stackGame = [
        { name: "Godot Engine", icon: <SiGodotengine size={24} className="text-[#478CBF]" /> },
        { name: "Javascript", icon: <SiJavascript size={24} className="text-[#F7DF1E]" /> },
        { name: "Unity2D", icon: <SiUnity size={24} className="text-[#478CBF]" /> },
    ];
    const stackDesktop = [
        { name: "GTK", icon: <SiGtk size={24} className="text-[#89d53c]" /> },
        { name: "Linux Shell Script", icon: <SiGnubash size={24} className="text-[#4EAA25]" /> },
    ];
    const livePreviewItems = portfolioItems.filter(item => !item.url || !item.url.includes("github.com"));
    const githubItems = portfolioItems.filter(item => item.url && item.url.includes("github.com"));

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/naufal-backup", icon: <FaGithub size={32} /> },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/naufal-gastiadirrijal-fawwaz-alamsyah-a34b43363", icon: <FaLinkedin size={32} /> },
        { name: "Email", url: "mailto:naufalalamsyah453@gmail.com", icon: <CgMail size={32} /> },
        { name: "Instagram", url: "https://www.instagram.com/naufalalamsyah45/", icon: <FaInstagram size={32} /> },
    ];

    return (

        <div className="bg-[#1a1a1a] text-[#e5e5e5]">
            {/* Section 1: Introduction/Hero */}
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
                    <div className="mt-12">
                        <a
                            href="#portfolio"
                            className="inline-block px-8 py-4 bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-all duration-300 rounded-lg text-[#e5e5e5] font-medium"
                        >
                            View My Work
                        </a>
                    </div>
                </div>
            </section>

            {/* Section 2: Stack */}
            <section id="stack" className="py-12 px-6 md:px-12 bg-[#1f1f1f]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        Stack
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {/* Web Development Stack */}
                        <div className="bg-[#2a2a2a] p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-6 text-[#9ca3af]">Web Development</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {stackWeb.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center group cursor-pointer relative">
                                        <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 bg-black/80 px-2 py-1 rounded whitespace-nowrap z-10">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Game Development Stack */}
                        <div className="bg-[#2a2a2a] p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-6 text-[#9ca3af]">Game Development</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {stackGame.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center group cursor-pointer relative">
                                        <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 bg-black/80 px-2 py-1 rounded whitespace-nowrap z-10">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop App Stack */}
                        <div className="bg-[#2a2a2a] p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-6 text-[#9ca3af]">Desktop App</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {stackDesktop.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center group cursor-pointer relative">
                                        <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 bg-black/80 px-2 py-1 rounded whitespace-nowrap z-10">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Portfolio Grid */}
            <section id="portfolio" className="min-h-screen py-12 px-6 md:px-12 bg-[#1f1f1f]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        Portfolio
                    </h2>
                    {livePreviewItems.length > 0 && (
                        <div className="mb-16">
                            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#9ca3af]">
                                Live Preview
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {livePreviewItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url || "#"}
                                        target={item.url ? "_blank" : "_self"}
                                        rel={item.url ? "noopener noreferrer" : ""}
                                        className="block group"
                                    >
                                        <div
                                            className="bg-[#2a2a2a] rounded-lg p-6 hover:bg-[#3a3a3a] transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full"
                                        >
                                            <div className="aspect-video bg-[#3a3a3a] rounded-md mb-4 flex items-center justify-center text-4xl group-hover:bg-[#4a4a4a] transition-colors duration-300 overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    "📁"
                                                )}
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                            <p className="text-sm text-[#9ca3af] mb-3">{item.category}</p>
                                            <p className="text-[#6b7280] text-sm">{item.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {githubItems.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#9ca3af]">
                                GitHub Repository
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {githubItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url || "#"}
                                        target={item.url ? "_blank" : "_self"}
                                        rel={item.url ? "noopener noreferrer" : ""}
                                        className="block group"
                                    >
                                        <div
                                            className="bg-[#2a2a2a] rounded-lg p-6 hover:bg-[#3a3a3a] transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full"
                                        >
                                            <div className="aspect-video bg-[#3a3a3a] rounded-md mb-4 flex items-center justify-center text-4xl group-hover:bg-[#4a4a4a] transition-colors duration-300 overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    "📁"
                                                )}
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                            <p className="text-sm text-[#9ca3af] mb-3">{item.category}</p>
                                            <p className="text-[#6b7280] text-sm">{item.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Section 4: Social Media */}
            <section id="social" className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-[#1a1a1a]">
                <div className="max-w-4xl w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-lg text-[#9ca3af] mb-12 max-w-2xl mx-auto">
                        Feel free to reach out for collaborations, opportunities, or just to say hello!
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.name === "GitHub" ? "#" : link.url}
                                onClick={(e) => {
                                    if (link.name === "GitHub") {
                                        e.preventDefault();
                                        toggleGithubPopup();
                                    }
                                }}
                                target={link.name === "GitHub" ? "_self" : "_blank"}
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center w-32 h-32 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-all duration-300 hover:transform hover:scale-110 group cursor-pointer"
                            >
                                <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                                    {link.icon}
                                </span>
                                <span className="text-sm text-[#9ca3af]">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* GitHub Popup */}
                    {showGithubPopup && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={toggleGithubPopup}>
                            <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-2xl max-w-sm w-full mx-4 relative border border-[#333]" onClick={e => e.stopPropagation()}>
                                <button
                                    onClick={toggleGithubPopup}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                                <h3 className="text-2xl font-bold mb-6 text-center">GitHub Accounts</h3>
                                <div className="space-y-4">
                                    <a
                                        href="https://github.com/naufal-backup"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors group"
                                    >
                                        <FaGithub className="text-3xl mr-4 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <div className="font-semibold text-white text-left">naufal-backup</div>
                                            <div className="text-sm text-gray-400 text-left">Main Account</div>
                                        </div>
                                    </a>
                                    {/* Add more accounts here if needed */}
                                    <a
                                        href="https://github.com/naufal453/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors group"
                                    >
                                        <FaGithub className="text-3xl mr-4 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <div className="font-semibold text-white text-left">naufal453</div>
                                            <div className="text-sm text-gray-400 text-left">Secondary Account (Not Active)</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="text-[#6b7280] text-sm">
                        <p>© 2026 Your Name. All rights reserved.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
