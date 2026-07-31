import fs from "fs";
import path from "path";
import SecretUnlock from "./SecretUnlock";

export default function SecretPage() {
  const folderPath = path.join(process.cwd(), "public", "Sayang");
  let musicSrc = null;

  try {
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      const musicFile = files.find((file) => /\.(mp3|wav|ogg|m4a|aac|flac|webm)$/i.test(file));
      musicSrc = musicFile ? `/Sayang/${encodeURIComponent(musicFile)}` : null;
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  return <SecretUnlock musicSrc={musicSrc} />;
}
