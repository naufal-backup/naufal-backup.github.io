"use client";
// SecretPage.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SecretPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const unlocked = sessionStorage.getItem("secret-unlocked");
      if (unlocked !== "Fforever0412") {
        router.replace("/secret/FailPage");
      }
    }
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 rounded-xl bg-[#222] shadow-2xl max-w-lg w-full text-center border border-[#333]">
        <h1 className="text-3xl font-bold mb-4">Tekan Tombol Di Bawah</h1>
        <button
          onClick={() => {
            sessionStorage.setItem("secret-unlocked", "Fforever0412");
            router.replace("/secret/SuccessPage");
          }}
          className="px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#0ea5e9] rounded-xl text-white font-semibold shadow-xl hover:from-[#818cf8] hover:to-[#38bdf8] focus:outline-none focus:ring-4 focus:ring-[#6366f1]/40 transition-all duration-300 select-none cursor-pointer"
        >
          Buka Rahasia
        </button>
      </div>
    </div>
  );
}
