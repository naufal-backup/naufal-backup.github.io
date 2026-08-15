import { useState } from "react";
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import WavyText from '../components/WavyText';

const socialLinks = [
    { name: "GitHub", url: "#", icon: <FaGithub /> },
    { name: "Instagram", url: "https://www.instagram.com/naufalalamsyah45/", icon: <FaInstagram /> },
    // { name: "Twitter", url: "https://twitter.com/naufalgastii", icon: <FaTwitter /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/naufal-g-f-alamsyah/", icon: <FaLinkedin /> }
];



export default function FourthSection() {
    const [showGithubPopup, setShowGithubPopup] = useState(false);
    const [showSecretPopup, setShowSecretPopup] = useState(false);
    const [secretInput, setSecretInput] = useState("");
    const [secretResult, setSecretResult] = useState(null); // null | 'success' | 'error'


    const toggleGithubPopup = () => {
        setShowGithubPopup(!showGithubPopup);
    };

    return (
        <section id="social" className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-[#0a0a0a]">
                <div className="max-w-4xl w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#f5f5f5]">
                        <WavyText text="Let's Connect" />
                    </h2>
                    <p className="text-lg text-[#a0a0a0] mb-12 max-w-2xl mx-auto">
                        <WavyText text="Feel free to reach out for collaborations, opportunities, or just to say hello!" />
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mb-12 ">
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
                                className="flex flex-col items-center justify-center w-32 h-32 bg-[#1a1a1a] hover:bg-[#242424] rounded-lg transition-all duration-300 hover:transform hover:scale-110 group cursor-pointer border border-[#2a2a2a]"
                            >
                                <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                                    {link.icon}
                                </span>
                                <span className="text-sm text-[#a0a0a0]">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* GitHub Popup */}
                    {showGithubPopup && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={toggleGithubPopup}>
                            <div className="bg-[#1a1a1a] p-8 rounded-xl max-w-sm w-full mx-4 relative border border-[#2a2a2a]" onClick={e => e.stopPropagation()}>
                                <button
                                    onClick={toggleGithubPopup}
                                    className="absolute top-4 right-4 text-[#808080] hover:text-[#f5f5f5] transition-colors"
                                >
                                    ✕
                                </button>
                                <h3 className="text-2xl font-bold mb-6 text-center text-[#f5f5f5]">GitHub Accounts</h3>
                                <div className="space-y-4">
                                    <a
                                        href="https://github.com/naufal-backup"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-[#0f0f0f] rounded-lg hover:bg-[#242424] transition-colors group border border-[#2a2a2a]"
                                    >
                                        <FaGithub className="text-3xl mr-4 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <div className="font-semibold text-[#f5f5f5] text-left">naufal-backup</div>
                                            <div className="text-sm text-[#808080] text-left">Main Account</div>
                                        </div>
                                    </a>
                                    {/* Add more accounts here if needed */}
                                    <a
                                        href="https://github.com/naufal453/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-[#0f0f0f] rounded-lg hover:bg-[#242424] transition-colors group border border-[#2a2a2a]"
                                    >
                                        <FaGithub className="text-3xl mr-4 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <div className="font-semibold text-[#f5f5f5] text-left">naufal453</div>
                                            <div className="text-sm text-[#808080] text-left">Secondary Account (Not Active)</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                                        <div className="text-[#808080] text-sm mt-4 select-text">
                                                <p
                                                    style={{ userSelect: 'text', cursor: 'text' }}
                                                    onDoubleClick={() => setShowSecretPopup(true)}
                                                >
                                                    © 2026 Naufal Gastiadirrijal Fawwaz Alamsyah. All rights reserved.
                                                </p>
                                        </div>
                                        {/* Secret Popup */}
                                        {showSecretPopup && (
                                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => {
                                                setShowSecretPopup(false);
                                                setSecretResult(null);
                                                setSecretInput("Fforever0412");
                                            }}>
                                                <div className="bg-[#1a1a1a] p-8 rounded-xl max-w-sm w-full mx-4 relative border border-[#2a2a2a]" onClick={e => e.stopPropagation()}>
                                                    <button
                                                        onClick={() => {
                                                            setShowSecretPopup(false);
                                                            setSecretResult(null);
                                                            setSecretInput("");
                                                        }}
                                                        className="absolute top-4 right-4 text-[#808080] hover:text-[#f5f5f5] transition-colors"
                                                    >
                                                        ✕
                                                    </button>
                                                    <h3 className="text-2xl font-bold mb-6 text-center text-[#f5f5f5]">Secret Input</h3>
                                                    {secretResult === null && (
                                                        <form
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                if (secretInput === "Fforever0412") {
                                                                    if (typeof window !== 'undefined') {
                                                                        sessionStorage.setItem('secret-unlocked', 'Fforever0412');
                                                                        window.location.href = '/secret';
                                                                    }
                                                                    setSecretResult('success');
                                                                } else {
                                                                    setSecretResult('error');
                                                                }
                                                            }}
                                                            className="space-y-4"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={secretInput}
                                                                onChange={e => setSecretInput(e.target.value)}
                                                                className="w-full p-3 rounded-lg bg-[#0f0f0f] text-[#f5f5f5] border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#4a9eff]"
                                                                placeholder="Type something..."
                                                                autoFocus
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="w-full p-3 rounded-lg bg-[#4a9eff] text-white font-semibold hover:bg-[#3d8ae6] transition-colors"
                                                            >
                                                                Submit
                                                            </button>
                                                        </form>
                                                    )}
                                                    {secretResult === 'success' && (
                                                        <div className="text-[#4ade80] text-center font-semibold">Input benar!</div>
                                                    )}
                                                    {secretResult === 'error' && (
                                                        <div className="text-[#f87171] text-center font-semibold">Input salah. Coba lagi.</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                </div>
        </section>
    );
}
