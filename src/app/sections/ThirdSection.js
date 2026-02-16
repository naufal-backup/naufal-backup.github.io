import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiPython, SiFigma, SiLaravel, SiMysql, SiBootstrap, SiTailwindcss, SiGodotengine, SiJavascript, SiGtk, SiGnubash, SiNextdotjs, SiUnity, SiFramer } from 'react-icons/si';
import WavyText from '../components/WavyText';

function useWindowColumns() {
    const [columns, setColumns] = useState(1);
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth >= 1024) setColumns(3); // lg
            else if (window.innerWidth >= 768) setColumns(2); // md
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

export default function ThirdSection({ portfolioItems }) {
    const [hoveredId, setHoveredId] = useState(null);
    const columns = useWindowColumns();
    const livePreviewItems = portfolioItems.filter(item => !item.url || !item.url.includes("github.com"));
    const githubItems = portfolioItems.filter(item => item.url && item.url.includes("github.com"));

    // Handle global click and scroll events to dismiss hover state on mobile
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

    const PortfolioCardContent = ({ item, isHovered }) => {
        const stackList = item.stack ? item.stack.split(',').map(s => s.trim()) : [];

        return (
        <div className={`bg-[#2a2a2a] rounded-lg p-6 transition-colors duration-300 h-full overflow-hidden ${isHovered ? 'bg-[#3a3a3a]' : ''}`}>
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
            
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <h4 className="text-base text-gray-400 mb-2">{item.description}</h4>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-3 mb-3">
                {stackList.map((tech, idx) => (
                    <div key={idx} title={tech} className="bg-[#1a1a1a] p-2 rounded-full hover:scale-110 transition-transform cursor-help">
                        {iconMap[tech] || <span className="text-xs text-gray-400">{tech}</span>}
                    </div>
                ))}
            </div>
        </div>
    )};

    const PortfolioCard = ({ item, index }) => {
        // Calculate position in row: 0 (Left), 1 (Center - if 3 cols), 2 (Right - if 3 cols)
        // For 2 cols: 0 (Left), 1 (Right)
        const posInRow = index % columns;
        const isHovered = hoveredId === item.id;
        const isMobile = columns === 1;
        
        // Determine animation variant based on position and columns
        const getHoverVariant = () => {
            const baseScale = 1.3;
            // Mobile (1 col) - Just scale, no sticky shift preference usually, or maybe center
            if (columns === 1) return { scale: 1.1, x: 0, zIndex: 50 };

            // 2 Columns
            if (columns === 2) {
                if (posInRow === 0) return { scale: baseScale, x: "10%", zIndex: 50 }; // Left item -> Shift Right
                return { scale: baseScale, x: "-10%", zIndex: 50 }; // Right item -> Shift Left
            }

            // 3 Columns (Default/Desktop)
            if (posInRow === 0) return { scale: baseScale, x: "10%", zIndex: 50 }; // Left
            if (posInRow === 1) return { scale: baseScale, x: "0%", zIndex: 50 }; // Center
            return { scale: baseScale, x: "-10%", zIndex: 50 }; // Right
        };

        const hoverVariant = getHoverVariant();

        const handleCardClick = (e) => {
            if (isMobile && hoveredId !== item.id) {
                e.preventDefault();
                setHoveredId(item.id);
            }
        };

        return (
            <div className="relative h-full">
                {/* Ghost Element - Reserves space */}
                <div className="invisible h-full">
                     <PortfolioCardContent item={item} isHovered={false} />
                </div>

                {/* Active Element - Floats on top */}
                <motion.div 
                    id={`portfolio-card-${item.id}`}
                    className="absolute top-0 left-0 w-full h-auto cursor-pointer"
                    onMouseEnter={() => !isMobile && setHoveredId(item.id)}
                    onMouseLeave={() => !isMobile && setHoveredId(null)}
                    animate={isHovered ? hoverVariant : { scale: 1, x: 0, zIndex: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ zIndex: isHovered ? 50 : 10 }}
                >
                    <a
                        href={item.url || "#"}
                        target={item.url ? "_blank" : "_self"}
                        rel={item.url ? "noopener noreferrer" : ""}
                        className="block h-full group"
                        onClick={handleCardClick}
                    >
                         <PortfolioCardContent item={item} isHovered={isHovered} />
                    </a>
                </motion.div>
            </div>
    )};

    return (
            <section id="portfolio" className="min-h-screen py-12 px-6 md:px-12 bg-[#1f1f1f]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        <WavyText text="Portfolio" />
                    </h2>
                    {livePreviewItems.length > 0 && (
                        <div className="mb-16">
                            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#9ca3af]">
                                <WavyText text="Live Preview" />
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                                {livePreviewItems.map((item, index) => (
                                    <PortfolioCard key={item.id} item={item} index={index} />
                                ))}
                            </div>
                        </div>
                    )}

                    {githubItems.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#9ca3af]">
                                <WavyText text="GitHub Repository" />
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                                {githubItems.map((item, index) => (
                                    // Reset index for the new grid helper logic? 
                                    // Actually, index inside map is per-grid, which is correct for the column logic.
                                    <PortfolioCard key={item.id} item={item} index={index} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
    );
}