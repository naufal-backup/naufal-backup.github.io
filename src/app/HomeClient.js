"use client";

import { useState } from 'react';


import FirstSection from './sections/FirstSection';
import SecondSection from './sections/SecondSection';
import ThirdSection from './sections/ThirdSection';

const portfolioItems = [
    { id: 1, title: "Alternate Arc Archive", category: "Fan-made website for Alternate Arc", description: "Made with Laravel, MySQL, and Bootstrap", url: "https://github.com/naufal-backup/Alternate-Arc-Archive3", image: "/images/alternate-arc-archive.png" },
    { id: 2, title: "Ruang Santri", category: "Website for Education", description: "Made with Laravel, MySQL, Bootstrap, and Tailwind CSS", url: "https://ruang-santri.com/", image: "/images/ruang-santri.png" },
    { id: 3, title: "Project-A", category: "Action Top-Down Web Game", description: "Made with Godot Engine", url: "/portfolio/project-a", image: "/images/project-a.png" },
    { id: 4, title: "GTK Theme Customizer", category: "GTK Window Customization", description: "Made with Javascript, GTK, and Linux Shell Script", url: "https://github.com/naufal-backup/Gtk-Theme-Customizer",image: "/images/gtk-theme-customizer.png" },
    { id: 5, title: "This Page", category: "Portfolio Website", description: "Made with Next.js, Tailwind CSS, and Framer Motion", url: "https://naufal-backup.github.io", image:"/images/this-page.png" },
    { id: 6, title: "Waste Sorter", category: "Educational Game", description: "Made with Unity2D", url: "https://github.com/naufal-backup/Waste-Sorter", image: "/images/waste-sorter.png" },
];
import FourthSection from './sections/FourthSection';

export default function Home() {
    const [showGithubPopup, setShowGithubPopup] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleGithubPopup = () => setShowGithubPopup(!showGithubPopup);


    return (

        <div className="bg-[#1a1a1a] text-[#e5e5e5]">
            {/* Section 1: Introduction/Hero */}
            <FirstSection />

            {/* Section 2: Stack */}
            <SecondSection />

            {/* Section 3: Portfolio Grid */}
            <ThirdSection portfolioItems={portfolioItems} />

            {/* Section 4: Social Media */}
            <FourthSection />
        </div>
    );
}
