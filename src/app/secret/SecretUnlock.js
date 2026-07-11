"use client";

import { useRouter } from "next/navigation";

export default function SecretUnlock({ musicSrc }) {
  const router = useRouter();

  const openSecret = () => {
    sessionStorage.setItem("secret-unlocked", "Fforever0412");

    if (musicSrc) {
      const audio = new Audio(musicSrc);
      audio.loop = true;
      audio.volume = 0.55;

      window.__secretMusic = audio;
      audio.play().catch(() => {
        sessionStorage.setItem("secret-music-needs-interaction", "true");
      });
    }

    router.replace("/secret/SuccessPage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-lg rounded-xl border border-[#333] bg-[#222] p-6 text-center shadow-2xl sm:p-8">
        <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Tekan Tombol Di Bawah</h1>
        <button
          onClick={openSecret}
          className="w-full rounded-xl bg-gradient-to-r from-[#6366f1] to-[#0ea5e9] px-8 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:from-[#818cf8] hover:to-[#38bdf8] focus:outline-none focus:ring-4 focus:ring-[#6366f1]/40 sm:w-auto select-none cursor-pointer"
        >
          Buka Rahasia
        </button>
      </div>
    </div>
  );
}
