


import React, { useState } from 'react';
import { FaVolumeUp, FaVolumeMute, FaMusic } from 'react-icons/fa';

export default function MusicBackground({ isMusicPlaying, toggleMusic, musicError, songs = [], currentSong, onSongChange }) {
    const [showSongList, setShowSongList] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {/* Song selection popup */}
            <div className="relative w-full flex flex-col items-end">
                {showSongList && (
                    <div
                        className="absolute bottom-16 right-0 mb-2 min-w-[220px] z-50 rounded-xl shadow-2xl p-3 animate-music-popup"
                        style={{
                            background: 'rgba(40, 40, 40, 0.85)',
                            border: '1.5px solid rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                        }}
                    >
                        <div className="font-semibold text-sm text-violet-200 mb-2 flex items-center gap-2">
                            <FaMusic /> Pilih Lagu
                        </div>
                        <div className="flex flex-col gap-1">
                            {songs.map((song, idx) => (
                                <label key={song.src} className="flex items-center gap-2 text-xs text-violet-100 cursor-pointer hover:text-violet-300">
                                    <input
                                        type="radio"
                                        name="music-song"
                                        checked={currentSong && currentSong.src === song.src}
                                        onChange={() => onSongChange(song)}
                                        className="accent-violet-500"
                                    />
                                    {song.title}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            
                {/* Music toggle button */}
                {musicError && (
                    <div className="bg-red-900 text-red-200 text-xs px-3 py-1.5 rounded-lg max-w-xs shadow-lg mb-2">
                        {musicError}
                    </div>
                )}
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowSongList(v => !v)}
                        title="Pilih Lagu"
                        className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                        style={{
                            background: isMusicPlaying
                                ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                                : 'rgba(40, 40, 40, 0.85)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: isMusicPlaying
                                ? '0 0 16px rgba(139, 92, 246, 0.5)'
                                : '0 4px 15px rgba(0,0,0,0.4)',
                        }}
                    >
                        <FaMusic className="text-white" />
                        {isMusicPlaying && (
                            <span
                                className="absolute inline-flex h-full w-full rounded-full opacity-30 animate-ping"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                            />
                        )}
                    </button>
                    <button
                        onClick={toggleMusic}
                        title={isMusicPlaying ? 'Matikan Musik' : 'Nyalakan Musik'}
                        className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                        style={{
                            background: isMusicPlaying
                                ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                                : 'rgba(40, 40, 40, 0.85)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: isMusicPlaying
                                ? '0 0 16px rgba(139, 92, 246, 0.5)'
                                : '0 4px 15px rgba(0,0,0,0.4)',
                        }}
                    >
                        {isMusicPlaying ? <FaVolumeUp className="text-white" /> : <FaVolumeMute className="text-white" />}
                        {isMusicPlaying && (
                            <span
                                className="absolute inline-flex h-full w-full rounded-full opacity-30 animate-ping"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}