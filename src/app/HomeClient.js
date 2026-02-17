"use client";
import { useState } from 'react';
import useSound from 'use-sound';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import FirstSection from './sections/FirstSection';
import SecondSection from './sections/SecondSection';
import ThirdSection from './sections/ThirdSection';
import FourthSection from './sections/FourthSection';

const portfolioItems = [
    { id: 1, title: "Alternate Arc Archive", description: "Fan-made website for Alternate Arc", stack: "Laravel, MySQL, Bootstrap",  url: "https://github.com/naufal-backup/Alternate-Arc-Archive3", image: "/images/alternate-arc-archive.png" },
    { id: 2, title: "Ruang Santri", description: "Website for Education", stack: "Laravel, MySQL, Bootstrap, Tailwind CSS", url: "https://ruang-santri.com/", image: "/images/ruang-santri.png" },
    { id: 3, title: "Project-A", description: "Action Top-Down Web Game", stack: "Godot Engine", url: "/portfolio/project-a", image: "/images/project-a.png" },
    { id: 4, title: "GTK Theme Customizer", description: "GTK Window Customization", stack: "Javascript, GTK, Linux Shell Script", url: "https://github.com/naufal-backup/Gtk-Theme-Customizer", image: "/images/gtk-theme-customizer.png" },
    { id: 5, title: "This Page", description: "Portfolio Website", stack: "Next.js, Tailwind CSS, Framer Motion", url: "https://naufal-backup.github.io", image:"/images/this-page.png" },
    { id: 6, title: "Waste Sorter", description: "Educational Game", stack: "Unity2D", url: "https://github.com/naufal-backup/Waste-Sorter", image: "/images/waste-sorter.png" },
];

const MUSIC_SRC = '/music/u_8hxfqtxxth-lofi-cafe-relaxing-backsound-323881.mp3';

export default function Home() {
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [musicError, setMusicError] = useState(null);

    const [play, { stop }] = useSound(MUSIC_SRC, {
        volume: 0.4,
        loop: true,
        onload: () => setMusicError(null)
    });

    const toggleMusic = () => {
        try {
            if (isMusicPlaying) {
                stop();
                setIsMusicPlaying(false);
            } else {
                play();
                setIsMusicPlaying(true);
            }
        } catch (err) {
            console.error(err);
            setMusicError('Error: ' + err.message);
        }
    };

    return (
        <div className="bg-[#1a1a1a] text-[#e5e5e5]">
            <FirstSection />
            <SecondSection />
            <ThirdSection portfolioItems={portfolioItems} />
            <FourthSection />

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

                {musicError && (
                    <div className="bg-red-900 text-red-200 text-xs px-3 py-1.5 rounded-lg max-w-xs shadow-lg">
                        {musicError}
                    </div>
                )}

                <button
                    onClick={toggleMusic}
                    title={isMusicPlaying ? 'Matikan Musik' : 'Nyalakan Musik'}
                    className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    style={{
                        background: isMusicPlaying
                            ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                            : 'rgba(40, 40, 40, 0.85)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: isMusicPlaying
                            ? '0 0 16px rgba(139, 92, 246, 0.5)'
                            : '0 4px 15px rgba(0,0,0,0.4)',
                    }}
                >
                    {isMusicPlaying ? <FaVolumeUp className="text-white" /> : <FaVolumeMute className="text-white" />}

                    {isMusicPlaying && (
                        <span
                            className="absolute inline-flex h-full w-full rounded-full opacity-30 animate-ping"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                        />
                    )}
                </button>
            </div>
        </div>
    );
}
