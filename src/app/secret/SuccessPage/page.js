import fs from "fs";
import path from "path";
import FloatingGallery from "./FloatingGallery";
import SecretMessage from "./SecretMessage";
import SecretMusicPlayer from "./SecretMusicPlayer";

export default function SuccessPage() {
  const folderPath = path.join(process.cwd(), "public", "Sayang");
  let images = [];
  let musicSrc = null;
   
  try {
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      images = files.filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));
      const musicFile = files.find(file => /\.(mp3|wav|ogg|m4a|aac|flac|webm)$/i.test(file));
      musicSrc = musicFile ? `/Sayang/${encodeURIComponent(musicFile)}` : null;
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  return (
    <main className="min-h-screen bg-[#020617] overflow-hidden relative flex flex-col items-center justify-start px-4 pt-8 sm:px-6 md:pt-20 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_42%,#020617_100%)] opacity-85 z-0"></div>
      <SecretMusicPlayer musicSrc={musicSrc} />
      
      <div className="z-10 w-full max-w-4xl rounded-2xl border border-sky-300/25 bg-sky-950/30 p-4 text-center shadow-[0_0_34px_rgba(56,189,248,0.22)] backdrop-blur-xl sm:p-6 md:rounded-3xl md:p-8 pointer-events-auto">
        <h1 className="text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-300 to-blue-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.55)] animate-pulse leading-snug sm:text-xl md:text-2xl">
          Happy Birthday Fakhmalia Nur Insyirah sayangkuuu cintakuuuuu 💖
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-xs font-light tracking-wide text-sky-100/85 sm:text-sm md:text-base">
          Welcome to our little secret space.
        </p>
        <div className="pt-3">
          <SecretMessage />
        </div>
      </div>
      
      {images.length > 0 ? (
        <FloatingGallery images={images} />
      ) : (
        <div className="z-10 mt-8 text-sky-200/60 italic">
          (Folder &quot;Sayang&quot; masih kosong)
        </div>
      )}
    </main>
  );
}
