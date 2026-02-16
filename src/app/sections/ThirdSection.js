import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiPython, SiFigma, SiLaravel, SiMysql, SiBootstrap, SiTailwindcss, SiGodotengine, SiJavascript, SiGtk, SiGnubash, SiNextdotjs, SiUnity, SiFramer } from 'react-icons/si';
import WavyText from '../components/WavyText';

// --- HELPER FUNCTIONS & CONSTANTS ---

function useWindowColumns() {
    const [columns, setColumns] = useState(1);
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth >= 1024) setColumns(3);
            else if (window.innerWidth >= 768) setColumns(2);
            else setColumns(1);
        };
        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);
    return columns;
}

const iconMap = {
    "Laravel": <SiLaravel size={20} className="text-[#FF2D20]" />,
    "MySQL": <SiMysql size={20} className="text-[#4479A1]" />,
    "Bootstrap": <SiBootstrap size={20} className="text-[#7952B3]" />,
    "Tailwind CSS": <SiTailwindcss size={20} className="text-[#06B6D4]" />,
    "Godot Engine": <SiGodotengine size={20} className="text-[#478CBF]" />,
    "Javascript": <SiJavascript size={20} className="text-[#F7DF1E]" />,
    "GTK": <SiGtk size={20} className="text-[#89d53c]" />,
    "Linux Shell Script": <SiGnubash size={20} className="text-[#4EAA25]" />,
    "Next.js": <SiNextdotjs size={20} className="text-white" />,
    "Framer Motion": <SiFramer size={20} className="text-white" />,
    "Unity2D": <SiUnity size={20} className="text-[#e5e5e5]" />,
};

// --- SUB-COMPONENTS (DEFINISIKAN DI LUAR!) ---

const CardContent = ({ item, showDescription }) => {
    const stackList = item.stack ? item.stack.split(',').map(s => s.trim()) : [];
    
    return (
        <div className="bg-[#2a2a2a] rounded-lg p-6 h-full flex flex-col w-full">
            <div className="aspect-video bg-[#3a3a3a] rounded-md mb-4 flex items-center justify-center text-4xl overflow-hidden shrink-0">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    "📁"
                )}
            </div>
            <h3 className="text-xl font-semibold mb-2 shrink-0">{item.title}</h3>



            <AnimatePresence>
                {showDescription && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                     >
                        <h4 className="text-base text-gray-400 mt-1 mb-1">{item.description}</h4>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="flex flex-wrap gap-3 mb-3 shrink-0 mt-1">
                {stackList.map((tech, idx) => (
                    <div key={idx} title={tech} className="bg-[#1a1a1a] p-2 rounded-full cursor-help">
                        {iconMap[tech] || <span className="text-xs text-gray-400">{tech}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

// PortfolioCard dipindah KELUAR dari ThirdSection agar tidak di-recreate saat render ulang
const PortfolioCard = ({ item, hoveredId, setHoveredId, columns }) => {
    const isHovered = hoveredId === item.id;
    const isMobile = columns === 1;
    const [baseHeight, setBaseHeight] = useState("auto");
    const cardRef = useRef(null);

    // Ambil tinggi awal untuk ghost element
    useEffect(() => {
        if (cardRef.current) {
            setBaseHeight(cardRef.current.offsetHeight);
        }
    }, [columns, item]);

    const handleCardClick = (e) => {
        if (isMobile && hoveredId !== item.id) {
            e.preventDefault();
            setHoveredId(item.id);
        }
    };

    return (
        <div 
            className="relative" 
            style={{ height: baseHeight !== "auto" ? baseHeight : "auto" }}
            onMouseEnter={() => !isMobile && setHoveredId(item.id)}
            onMouseLeave={() => !isMobile && setHoveredId(null)}
            id={`portfolio-card-${item.id}`}
        >
            {/* Ghost Element (Invisible) - Penjaga Layout Grid */}
            <div ref={cardRef} className="invisible pointer-events-none absolute top-0 left-0 w-full z-0 opacity-0">
                    <CardContent item={item} showDescription={false} />
            </div>

            {/* Animated Overlay Card - Yang Dilihat User */}
            <motion.div
                className="absolute top-0 left-0 w-full rounded-lg "
                initial={false}
                animate={{ 
                    zIndex: isHovered ? 50 : 10,
                    backgroundColor: isHovered ? '#3a3a3a' : '#2a2a2a',
                }}
                transition={{ duration: 0.2 }}
                layout // Menghaluskan transisi perubahan dimensi
            >
                <a
                    href={item.url || "#"}
                    target={item.url ? "_blank" : "_self"}
                    rel={item.url ? "noopener noreferrer" : ""}
                    className="block h-full"
                    onClick={handleCardClick}
                >
                        <CardContent item={item} showDescription={isHovered} />
                </a>
            </motion.div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export default function ThirdSection({ portfolioItems }) {
    const [hoveredId, setHoveredId] = useState(null);
    const columns = useWindowColumns();
    const livePreviewItems = portfolioItems.filter(item => !item.url || !item.url.includes("github.com"));
    const githubItems = portfolioItems.filter(item => item.url && item.url.includes("github.com"));

    // Event listener global untuk mobile
    useEffect(() => {
        if (hoveredId && columns === 1) {
            const handleGlobalClick = (e) => {
                if (!e.target.closest(`#portfolio-card-${hoveredId}`)) {
                    setHoveredId(null);
                }
            };
            const handleScroll = () => {
                setHoveredId(null);
            };

            window.addEventListener('click', handleGlobalClick);
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('click', handleGlobalClick);
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [hoveredId, columns]);

    return (
        <section id="portfolio" className="min-h-screen py-12 px-6 md:px-12 bg-[#1f1f1f]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    <WavyText text="Portfolio" className="border-b border-[#333] pb-2"/>
                </h2>
                
                {livePreviewItems.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#9ca3af]">
                            <WavyText text="Live Preview" />
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {livePreviewItems.map((item) => (
                                <PortfolioCard 
                                    key={item.id} 
                                    item={item} 
                                    hoveredId={hoveredId} 
                                    setHoveredId={setHoveredId} 
                                    columns={columns} 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {githubItems.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#9ca3af]">
                            <WavyText text="GitHub Repository" />
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {githubItems.map((item) => (
                                <PortfolioCard 
                                    key={item.id} 
                                    item={item} 
                                    hoveredId={hoveredId} 
                                    setHoveredId={setHoveredId} 
                                    columns={columns} 
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}