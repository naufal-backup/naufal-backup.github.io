"use client";

import { useEffect, useRef, useState } from "react";

export default function SecretMusicPlayer({ musicSrc }) {
  const audioRef = useRef(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    if (!musicSrc) return;

    const existingAudio = window.__secretMusic;
    const audio = existingAudio || new Audio(musicSrc);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    if (existingAudio && !audio.paused) {
      setNeedsInteraction(false);
    } else {
      audio.play().then(() => {
        sessionStorage.removeItem("secret-music-needs-interaction");
        setNeedsInteraction(false);
      }).catch(() => {
        setNeedsInteraction(true);
      });
    }

    return () => {
      if (!window.__secretMusic) {
        audio.pause();
        audio.src = "";
      }
      audioRef.current = null;
    };
  }, [musicSrc]);

  if (!musicSrc || !needsInteraction) return null;

  return (
    <button
      type="button"
      onClick={() => {
        audioRef.current?.play().then(() => {
          sessionStorage.removeItem("secret-music-needs-interaction");
          setNeedsInteraction(false);
        });
      }}
      className="fixed bottom-4 left-4 right-4 z-30 rounded-full border border-cyan-200/35 bg-blue-950/80 px-5 py-3 text-sm font-semibold text-cyan-50 shadow-[0_0_26px_rgba(56,189,248,0.35)] backdrop-blur-md transition hover:bg-blue-900/90 focus:outline-none focus:ring-4 focus:ring-cyan-300/30 sm:left-auto sm:right-5 sm:w-auto"
    >
      Putar Musik
    </button>
  );
}
