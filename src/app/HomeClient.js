"use client";
import { useState, useEffect, useRef } from 'react';

import FirstSection from './sections/FirstSection';
import SecondSection from './sections/SecondSection';
import ThirdSection from './sections/ThirdSection';
import FourthSection from './sections/FourthSection';
import MusicBackground from './components/MusicBackground';

const portfolioItems = [
    { id: 1, title: "Alternate Arc Archive", description: "Fan-made website for Alternate Arc", stack: "Laravel, MySQL, Bootstrap",  url: "https://github.com/naufal-backup/Alternate-Arc-Archive3", image: "/images/alternate-arc-archive.png" },
    { id: 2, title: "Ruang Santri", description: "Website for Education", stack: "Laravel, MySQL, Bootstrap, Tailwind CSS", url: "https://ruang-santri.com/", image: "/images/ruang-santri.png" },
    { id: 3, title: "Project-A", description: "Action Top-Down Web Game", stack: "Godot Engine", url: "/portfolio/project-a", image: "/images/project-a.png" },
    { id: 4, title: "GTK Theme Customizer", description: "GTK Window Customization", stack: "Javascript, GTK, Linux Shell Script", url: "https://github.com/naufal-backup/Gtk-Theme-Customizer", image: "/images/gtk-theme-customizer.png" },
    { id: 5, title: "This Page", description: "Portfolio Website", stack: "Next.js, Tailwind CSS, Framer Motion", url: "https://naufal-backup.github.io", image:"/images/this-page.png" },
    { id: 6, title: "Waste Sorter", description: "Educational Game", stack: "Unity2D", url: "https://github.com/naufal-backup/Waste-Sorter", image: "/images/waste-sorter.png" },
];

const SONGS = [
    { src: '/music/lofiMusic.mp3',     title: 'Lofi Cafe' },
    { src: '/music/relaxingPiano.mp3', title: 'Relaxing Piano' },
    { src: '/music/chillVibe.mp3',     title: 'Chill Vibes' },
];

export default function Home() {
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isMusicOnClick, setIsMusicOnClick] = useState(false);
    const [musicError, setMusicError] = useState(null);
    const [currentSong, setCurrentSong] = useState(SONGS[0]);

    // Single, persistent Audio instance — never recreated on re-render
    const audioRef = useRef(null);

    // Initialize Audio once on mount (client-side only)
    useEffect(() => {
        const audio = new Audio(SONGS[0].src);
        audio.volume = 0.4;
        audio.loop = true;
        audio.onerror = () => setMusicError('Gagal memuat musik.');
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        setIsMusicOnClick(true);
        setMusicError(null);

        if (isMusicPlaying) {
            audio.pause();
            setIsMusicPlaying(false);
        } else {
            audio.play().catch(err => setMusicError('Error: ' + err.message));
            setIsMusicPlaying(true);
        }
    };

    const handleSongChange = (song) => {
        const audio = audioRef.current;
        if (!audio) return;

        // Stop current playback & swap source
        audio.pause();
        audio.src = song.src;
        audio.load();
        setCurrentSong(song);
        setMusicError(null);

        // Auto-play the newly selected song
        audio.play().catch(err => setMusicError('Error: ' + err.message));
        setIsMusicPlaying(true);
    };

    return (
        <div className="bg-[#1a1a1a] text-[#e5e5e5]">
            <FirstSection />
            <SecondSection />
            <ThirdSection portfolioItems={portfolioItems} />
            <FourthSection />
            <MusicBackground
                isMusicOnClick={isMusicOnClick}
                isMusicPlaying={isMusicPlaying}
                toggleMusic={toggleMusic}
                musicError={musicError}
                songs={SONGS}
                currentSong={currentSong}
                onSongChange={handleSongChange}
            />
        </div>
    );
}