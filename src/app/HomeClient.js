"use client";
import{useState,useEffect,useRef}from'react';
import FirstSection from'./sections/FirstSection';
import SecondSection from'./sections/SecondSection';
import ThirdSection from'./sections/ThirdSection';
import FourthSection from'./sections/FourthSection';
import MusicBackground from'./components/MusicBackground';
const SONGS=[{src:'/music/lofiMusic.mp3',title:'Lofi Cafe'},{src:'/music/relaxingPiano.mp3',title:'Relaxing Piano'},{src:'/music/chillVibe.mp3',title:'Chill Vibes'}];
export default function Home(){
const[portfolioItems,setPortfolioItems]=useState([]);
const[isMusicPlaying,setIsMusicPlaying]=useState(false);
const[isMusicOnClick,setIsMusicOnClick]=useState(false);
const[musicError,setMusicError]=useState(null);
const[currentSong,setCurrentSong]=useState(SONGS[0]);
const audioRef=useRef(null);
useEffect(()=>{fetch('/portfolio/PortfolioList.json').then(r=>r.json()).then(d=>setPortfolioItems(d)).catch(e=>console.error(e));},[]);
useEffect(()=>{const a=new Audio(SONGS[0].src);a.volume=0.4;a.loop=true;a.onerror=()=>setMusicError('Gagal memuat musik.');audioRef.current=a;return()=>{a.pause();a.src='';};},[]);
const toggleMusic=()=>{const a=audioRef.current;if(!a)return;setIsMusicOnClick(true);setMusicError(null);if(isMusicPlaying){a.pause();setIsMusicPlaying(false);}else{a.play().catch(e=>setMusicError('Error: '+e.message));setIsMusicPlaying(true);}};
const handleSongChange=(song)=>{const a=audioRef.current;if(!a)return;a.pause();a.src=song.src;a.load();setCurrentSong(song);setMusicError(null);a.play().catch(e=>setMusicError('Error: '+e.message));setIsMusicPlaying(true);};
return(<div className="bg-[#1a1a1a] text-[#e5e5e5]"><FirstSection/><SecondSection/><ThirdSection portfolioItems={portfolioItems}/><FourthSection/><MusicBackground isMusicOnClick={isMusicOnClick} isMusicPlaying={isMusicPlaying} toggleMusic={toggleMusic} musicError={musicError} songs={SONGS} currentSong={currentSong} onSongChange={handleSongChange}/></div>);}
