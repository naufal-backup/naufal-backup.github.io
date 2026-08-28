import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaFolder, FaLock, FaCalendarAlt } from 'react-icons/fa';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import WavyText from '../components/WavyText';

const stats = [
    { label: "Public Repos", value: "9", icon: <FaFolder size={28} className="text-[#4a9eff]" /> },
    { label: "Private Repos", value: "16", icon: <FaLock size={28} className="text-[#a855f7]" /> },
    { label: "Followers", value: "2", icon: <FaUsers size={28} className="text-[#f97316]" /> },
    { label: "Following", value: "6", icon: <FaUsers size={28} className="text-[#22c55e]" /> },
];

const badges = [
    { name: "Pull Shark", desc: "Merged 2+ pull requests", emoji: "🦈" },
    { name: "YOLO", desc: "Merged without code review", emoji: "🤠" },
    { name: "Starstruck", desc: "Starred by repo collaborators", emoji: "🌟" },
    { name: "Galaxy Brain", desc: "4+ threads answered", emoji: "🧠" },
    { name: "Pair Extraordinaire", desc: "Co-authored merged PR", emoji: "👥" },
    { name: "Quickdraw", desc: "Closed issue in < 5 min", emoji: "⚡" },
];

const recentRepos = [
    { name: "PakanPro", desc: "Toko pakan ternak online", lang: "Next.js", color: "#06B6D4" },
    { name: "profil-hema", desc: "Hamemayu profile site", lang: "Next.js", color: "#06B6D4" },
    { name: "Ruang-Santri-CF", desc: "Education platform", lang: "Cloudflare", color: "#F6821F" },
    { name: "naufal-backup.github.io", desc: "Portfolio website", lang: "Next.js", color: "#06B6D4" },
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
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12" staggerDelay={0.06}>
                    {badges.map((badge) => (
                        <StaggerItem key={badge.name} animation="bounceIn">
                            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-center hover:border-[#4a9eff]/40 hover:bg-[#1f1f1f] transition-all cursor-default group">
                                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{badge.emoji}</div>
                                <div className="text-sm font-semibold text-[#f5f5f5] mb-1">{badge.name}</div>
                                <div className="text-xs text-[#808080] leading-tight">{badge.desc}</div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Recent Repos */}
                <ScrollReveal animation="fadeRight" delay={0.2}>
                    <h3 className="text-xl font-semibold mb-6 text-[#a0a0a0]">
                        <WavyText text="Recent Repositories" />
                    </h3>
                </ScrollReveal>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3" staggerDelay={0.08}>
                    {recentRepos.map((repo) => (
                        <StaggerItem key={repo.name} animation="slideRotate">
                            <a
                                href={`https://github.com/naufal-backup/${repo.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#4a9eff]/40 hover:bg-[#1f1f1f] transition-all group"
                            >
                                <FaGithub className="text-2xl text-[#808080] group-hover:text-[#f5f5f5] transition-colors shrink-0" />
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-[#f5f5f5] truncate">{repo.name}</div>
                                    <div className="text-xs text-[#808080] truncate">{repo.desc}</div>
                                </div>
                                <div className="ml-auto shrink-0 flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.color }}></span>
                                    <span className="text-xs text-[#808080]">{repo.lang}</span>
                                </div>
                            </a>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
