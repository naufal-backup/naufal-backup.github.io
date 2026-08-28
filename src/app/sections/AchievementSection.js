import { FaGithub, FaUsers, FaFolder, FaStar } from 'react-icons/fa';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import WavyText from '../components/WavyText';

const stats = [
    { label: "Public Repos", value: "23", icon: <FaFolder size={28} className="text-[#4a9eff]" /> },
    { label: "Stars Earned", value: "16", icon: <FaStar size={28} className="text-[#eab308]" /> },
    { label: "Followers", value: "2", icon: <FaUsers size={28} className="text-[#f97316]" /> },
    { label: "Following", value: "5", icon: <FaUsers size={28} className="text-[#22c55e]" /> },
];

const badges = [
    { name: "Starstruck", desc: "Won 16 stars on a single repo", emoji: "🌟", repo: "disbox" },
];

const pinnedRepos = [
    { name: "disbox", desc: "Discord-based file storage", lang: "JavaScript", color: "#f1e05a", stars: 16 },
    { name: "disbox-mobile", desc: "Disbox mobile client", lang: "JavaScript", color: "#f1e05a", stars: 0 },
    { name: "AELauncher", desc: "App launcher", lang: "JavaScript", color: "#f1e05a", stars: 0 },
    { name: "naufal-backup.github.io", desc: "Portfolio website", lang: "JavaScript", color: "#f1e05a", stars: 0 },
    { name: "Gtk-Theme-Customizer", desc: "GTK window customization", lang: "JavaScript", color: "#f1e05a", stars: 0 },
    { name: "YT-downloader", desc: "YouTube downloader", lang: "JavaScript", color: "#f1e05a", stars: 0 },
];

export default function AchievementSection() {
    return (
        <section id="achievement" className="py-16 px-6 md:px-12 bg-[#0a0a0a]">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal animation="fadeUp">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#f5f5f5]">
                        <WavyText text="GitHub" />
                    </h2>
                </ScrollReveal>
                <ScrollReveal animation="fadeUp" delay={0.1}>
                    <p className="text-center text-[#808080] mb-12 text-lg">
                        <WavyText text="Activity & Achievements" />
                    </p>
                </ScrollReveal>

                {/* Stats Grid */}
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" staggerDelay={0.08}>
                    {stats.map((stat) => (
                        <StaggerItem key={stat.label} animation="popIn">
                            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#4a9eff]/30 transition-colors group">
                                <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold text-[#f5f5f5] mb-1">{stat.value}</div>
                                <div className="text-sm text-[#808080]">{stat.label}</div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Badges */}
                <ScrollReveal animation="fadeLeft" delay={0.15}>
                    <h3 className="text-xl font-semibold mb-6 text-[#a0a0a0]">
                        <WavyText text="Earned Badges" />
                    </h3>
                </ScrollReveal>
                <StaggerContainer className="flex gap-4 mb-12" staggerDelay={0.1}>
                    {badges.map((badge) => (
                        <StaggerItem key={badge.name} animation="bounceIn">
                            <div className="bg-[#1a1a1a] border border-[#eab308]/30 rounded-xl p-6 flex items-center gap-4 hover:border-[#eab308]/60 hover:bg-[#1f1f1f] transition-all cursor-default group">
                                <div className="text-5xl group-hover:scale-125 transition-transform">{badge.emoji}</div>
                                <div>
                                    <div className="text-lg font-bold text-[#f5f5f5]">{badge.name}</div>
                                    <div className="text-sm text-[#808080]">{badge.desc}</div>
                                    <div className="text-xs text-[#eab308] mt-1">repo: {badge.repo}</div>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Pinned Repos */}
                <ScrollReveal animation="fadeRight" delay={0.2}>
                    <h3 className="text-xl font-semibold mb-6 text-[#a0a0a0]">
                        <WavyText text="Pinned Repositories" />
                    </h3>
                </ScrollReveal>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" staggerDelay={0.08}>
                    {pinnedRepos.map((repo) => (
                        <StaggerItem key={repo.name} animation="slideRotate">
                            <a
                                href={`https://github.com/naufal-backup/${repo.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#4a9eff]/40 hover:bg-[#1f1f1f] transition-all group"
                            >
                                <FaGithub className="text-2xl text-[#808080] group-hover:text-[#f5f5f5] transition-colors shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-semibold text-[#f5f5f5] truncate">{repo.name}</div>
                                    <div className="text-xs text-[#808080] truncate">{repo.desc}</div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    {repo.stars > 0 && (
                                        <span className="flex items-center gap-1 text-xs text-[#eab308]">
                                            <FaStar size={10} /> {repo.stars}
                                        </span>
                                    )}
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.color }}></span>
                                </div>
                            </a>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
