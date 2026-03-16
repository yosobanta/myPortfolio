import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const playlist = [
  { title: 'Midnight Algorithm', artist: 'Synthwave Protocol', duration: '3:42' },
  { title: 'Neural Cascade', artist: 'Digital Echoes', duration: '4:18' },
  { title: 'Binary Sunset', artist: 'Ambient Core', duration: '5:01' },
  { title: 'Deep Focus State', artist: 'Lo-Fi Engine', duration: '3:55' },
  { title: 'Quantum Drift', artist: 'Electron Wave', duration: '4:33' },
];

// Cymatic visualizer bar count
const BAR_COUNT = 24;

export default function PlaylistPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [bars, setBars] = useState(Array(BAR_COUNT).fill(0.2));
  const animRef = useRef(null);
  const timeRef = useRef(0);

  // Simulate 120 BPM cymatic bar animation
  useEffect(() => {
    if (!isPlaying) {
      setBars(Array(BAR_COUNT).fill(0.2));
      return;
    }

    const bpm = 120;
    const beatInterval = 60000 / bpm; // ms per beat

    const animate = () => {
      timeRef.current += 16; // ~60fps
      const beatPhase = (timeRef.current % beatInterval) / beatInterval;

      const newBars = Array(BAR_COUNT).fill(0).map((_, i) => {
        const offset = (i / BAR_COUNT) * Math.PI * 2;
        const wave1 = Math.sin(beatPhase * Math.PI * 2 + offset) * 0.35;
        const wave2 = Math.sin(beatPhase * Math.PI * 4 + offset * 1.5) * 0.2;
        const noise = Math.random() * 0.15;
        return Math.max(0.08, Math.min(1, 0.3 + wave1 + wave2 + noise));
      });

      setBars(newBars);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-mercury-800/40 bg-mercury-900/40">
        <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Protocol_01</p>
        <p className="text-xs font-mono text-mercury-400">DEEP_WORK_GRID</p>
      </div>

      {/* Cymatic Visualizer */}
      <div className="px-5 py-6 flex items-end justify-center gap-[3px] h-[120px] bg-gradient-to-b from-transparent to-mercury-900/20">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-[6px] rounded-full"
            style={{
              height: `${height * 80}px`,
              backgroundColor: isPlaying
                ? `hsl(${190 + (i * 3)}, 80%, ${50 + height * 20}%)`
                : 'rgb(80,80,90)',
              boxShadow: isPlaying
                ? `0 0 ${height * 8}px hsl(${190 + (i * 3)}, 80%, 50%)`
                : 'none',
              transition: 'background-color 0.1s'
            }}
          />
        ))}
      </div>

      {/* Now Playing */}
      <div className="px-5 py-4 text-center border-y border-mercury-800/30">
        <p className="text-sm font-bold text-mercury-100">{playlist[activeTrack].title}</p>
        <p className="text-[10px] font-mono text-mercury-500 mt-1">{playlist[activeTrack].artist}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 py-4">
        <button
          onClick={() => setActiveTrack(prev => (prev - 1 + playlist.length) % playlist.length)}
          className="text-mercury-500 hover:text-mercury-200 transition-colors"
        >
          <SkipBack size={18} />
        </button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full border border-mercury-600/50 bg-mercury-900/60 flex items-center justify-center text-mercury-200 hover:border-cyan-400/50 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </motion.button>

        <button
          onClick={() => setActiveTrack(prev => (prev + 1) % playlist.length)}
          className="text-mercury-500 hover:text-mercury-200 transition-colors"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {playlist.map((track, i) => (
          <button
            key={i}
            onClick={() => { setActiveTrack(i); setIsPlaying(true); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
              i === activeTrack
                ? 'bg-mercury-800/30 text-mercury-100'
                : 'text-mercury-500 hover:text-mercury-300 hover:bg-mercury-900/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono w-4">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-xs font-medium">{track.title}</p>
                <p className="text-[10px] font-mono opacity-60">{track.artist}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono opacity-50">{track.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
