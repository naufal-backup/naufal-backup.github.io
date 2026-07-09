import fs from "fs";
import path from "path";
import FloatingGallery from "./FloatingGallery";

export default function SuccessPage() {
  const folderPath = path.join(process.cwd(), "public", "Sayang");
  let images = [];
  
  try {
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      images = files.filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-hidden relative flex flex-col items-center justify-start pt-12 md:pt-20 font-sans">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0510] to-black opacity-80 z-0"></div>
      
      <div className="z-10 text-center space-y-3 p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.15)] max-w-4xl w-full mx-4 pointer-events-auto">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] animate-pulse leading-snug">
          Happy Birthday Fakhmalia Nur Insyirah sayangkuuu cintakuuuuu 💖
        </h1>
        <p className="text-pink-100/80 text-sm md:text-base font-light max-w-lg mx-auto tracking-wide">
          Welcome to our little secret space.
        </p>
      </div>
      
      {images.length > 0 ? (
        <FloatingGallery images={images} />
      ) : (
        <div className="z-10 mt-8 text-pink-300/50 italic">
          (Folder &quot;Sayang&quot; masih kosong)
        </div>
      )}
    </main>
  );
}
