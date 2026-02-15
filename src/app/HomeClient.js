"use client";

import { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { CgMail } from 'react-icons/cg';

export default function Home() {
    const [showGithubPopup, setShowGithubPopup] = useState(false);

    const toggleGithubPopup = () => setShowGithubPopup(!showGithubPopup);

    const portfolioItems = [
        { id: 1, title: "Alternate Arc Archive", category: "Web Development", description: "Fan-made website for Alternate Arc", url: "https://github.com/naufal-backup/Alternate-Arc-Archive3", image: "/images/alternate-arc-archive.png" },
        { id: 2, title: "Ruang Santri", category: "Web Development", description: "Website for Education", url: "https://ruang-santri.com/", image: "/images/ruang-santri.png" },
        { id: 3, title: "Project Gamma", category: "Mobile App", description: "Cross-platform mobile solution" },
        { id: 4, title: "Project Delta", category: "Branding", description: "Complete brand identity system" },
        { id: 5, title: "Project Epsilon", category: "E-commerce", description: "Full-stack online store" },
        { id: 6, title: "Project Zeta", category: "Data Visualization", description: "Interactive dashboard design" },
    ];

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
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Hello, I&apos;m <span className="text-[#9ca3af]">Naufal</span>
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
                            View My Work ↓
                        </a>
                    </div>
                </div>
            </section>

            {/* Section 2: Portfolio Grid */}
            <section id="portfolio" className="min-h-screen py-20 px-6 md:px-12 bg-[#1f1f1f]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        Portfolio
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioItems.map((item) => (
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
            </section>

            {/* Section 3: Social Media */}
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
