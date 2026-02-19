"use client";
import { useState, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

import useSound from 'use-sound';

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
    {
        src: '/music/u_8hxfqtxxth-lofi-cafe-relaxing-backsound-323881.mp3',
        title: 'Lofi Cafe',
    },
    {
        src: '/music/relaxing-piano-131107.mp3',
        title: 'Relaxing Piano',
    },
    {
        src: '/music/chill-vibes-14661.mp3',
        title: 'Chill Vibes',
    },
];

export default function Home() {
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [musicError, setMusicError] = useState(null);
    const [currentSong, setCurrentSong] = useState(SONGS[0]);

    // useSound hook for the current song
    const [play, { stop, sound }] = useSound(currentSong.src, {
        volume: 0.4,
        loop: true,
        onload: () => setMusicError(null),
        onplayerror: (err) => setMusicError('Error: ' + err.message),
        onloaderror: (err) => setMusicError('Error: ' + err.message),
    });

    // Stop music if song changes
    useEffect(() => {
        if (isMusicPlaying) {
            stop();
            setIsMusicPlaying(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong.src]);

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

    const handleSongChange = (song) => {
        setCurrentSong(song);
    };

    return (
        <div className="bg-[#1a1a1a] text-[#e5e5e5]">
            <FirstSection />
            <SecondSection />
            <ThirdSection portfolioItems={portfolioItems} />
            <FourthSection />
            <MusicBackground
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
