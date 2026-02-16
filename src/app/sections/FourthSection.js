import { useState } from "react";
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import WavyText from '../components/WavyText';

const socialLinks = [
    { name: "GitHub", url: "#", icon: <FaGithub /> },
    { name: "Instagram", url: "https://www.instagram.com/naufalgastiiadirrijal/", icon: <FaInstagram /> },
    { name: "Twitter", url: "https://twitter.com/naufalgastii", icon: <FaTwitter /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/naufal-gastiadirrijal-fawwaz-alamsyah-b82a1b2a1/", icon: <FaLinkedin /> }
];

export default function FourthSection() {
    const [showGithubPopup, setShowGithubPopup] = useState(false);

    const toggleGithubPopup = () => {
        setShowGithubPopup(!showGithubPopup);
    };

    return (
        <section id="social" className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-[#1a1a1a]">
                <div className="max-w-4xl w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        <WavyText text="Let's Connect" />
                    </h2>
                    <p className="text-lg text-[#9ca3af] mb-12 max-w-2xl mx-auto">
                        <WavyText text="Feel free to reach out for collaborations, opportunities, or just to say hello!" />
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
                    <div className="text-[#6b7280] text-sm mt-4">
                        <p>© 2026 Naufal Gastiadirrijal Fawwaz Alamsyah. All rights reserved.</p>
                    </div>
                </div>
        </section>
    );
}