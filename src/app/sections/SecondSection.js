import { SiPython,SiFigma,SiLaravel, SiMysql, SiBootstrap, SiTailwindcss, SiGodotengine, SiJavascript, SiGtk, SiGnubash, SiNextdotjs, SiUnity } from 'react-icons/si';
import WavyText from '../components/WavyText';

export default function SecondSection() {
    const stackWeb = [
        { name: "Laravel", icon: <SiLaravel size={24} className="text-[#FF2D20]" /> },
        { name: "MySQL", icon: <SiMysql size={24} className="text-[#4479A1]" /> },
        { name: "Bootstrap", icon: <SiBootstrap size={24} className="text-[#7952B3]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size={24} className="text-[#06B6D4]" /> },
        // { name: "Javascript", icon: <SiJavascript size={24} className="text-[#F7DF1E]" /> },
        { name: "Next.js", icon: <SiNextdotjs size={24} className="text-white" /> },
        { name: "Figma", icon: <SiFigma size={24} className="text-[#F24E1E]" /> },
    ];
    const stackGame = [
        { name: "Godot Engine", icon: <SiGodotengine size={24} className="text-[#478CBF]" /> },
        { name: "Javascript", icon: <SiJavascript size={24} className="text-[#F7DF1E]" /> },
        { name: "Unity2D", icon: <SiUnity size={24} className="text-[#478CBF]" /> },
    ];
    const stackDesktop = [
        { name: "GTK", icon: <SiGtk size={24} className="text-[#89d53c]" /> },
        { name: "Linux Shell Script", icon: <SiGnubash size={24} className="text-[#4EAA25]" /> },
        {name: "Python", icon: <SiPython size={24} className="text-[#F7DF1E]" /> },
    ];
    return (
    <section id="stack" className="py-12 px-6 md:px-12 bg-[#1f1f1f]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#9ca3af]">
                        <WavyText text="Stack" />
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {/* Web Dev Column */}
                        <div>
                             <h3 className="text-xl font-semibold mb-6 text-center text-[#e5e5e5] border-b border-[#333] pb-2">
                                <WavyText text="Web Development" />
                             </h3>
                             <div className="flex flex-wrap justify-center gap-4">
                                {stackWeb.map((tech) => (
                                    <div key={tech.name} className="flex flex-col items-center group cursor-pointer relative">
                                        <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                                            {tech.icon}
                                        </div>
                                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 bg-black/80 px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Game Dev Column */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-center text-[#e5e5e5] border-b border-[#333] pb-2">
                                <WavyText text="Game Development" />
                            </h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                 {stackGame.map((tech) => (
                                    <div key={tech.name} className="flex flex-col items-center group cursor-pointer relative">
                                        <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                                            {tech.icon}
                                        </div>
                                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 bg-black/80 px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* Desktop App Column */}
                         <div>
                            <h3 className="text-xl font-semibold mb-6 text-center text-[#e5e5e5] border-b border-[#333] pb-2">
                                <WavyText text="Desktop App" />
                            </h3>
                             <div className="flex flex-wrap justify-center gap-4">
                                {stackDesktop.map((tech) => (
                                    <div key={tech.name} className="flex flex-col items-center group cursor-pointer relative">
                                        <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                                            {tech.icon}
                                        </div>
                                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 bg-black/80 px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}
