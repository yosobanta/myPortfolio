import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Film, Compass, Trophy, X, Play, Pause, SkipForward, SkipBack, Music, User } from 'lucide-react';
import QuoteCarousel from './QuoteCarousel';

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════

const movies = [
  { title: 'Shawshank Redemption', year: 1994, poster: '/subskills/shawshank_redemption.jpg' },
  { title: 'Schindler List', year: 1993, poster: '/subskills/slist.jpg' },
  { title: 'Seven', year: 1995, poster: '/subskills/se7en.webp' },
  { title: 'The Green Mile', year: 1999, poster: '/subskills/tgm.jpg' },
  { title: 'Grave of the Fireflies', year: 1988, poster: '/subskills/tgof.jpg' },
  { title: 'The Lion King', year: 1994, poster: '/subskills/the_lion_king.jpg' },
  { title: 'Interstellar', year: 2014, poster: '/subskills/intersteller.png' },
  { title: 'The Dark Knight', year: 2008, poster: '/subskills/dark_knight.jpg' },
  { title: 'Inception', year: 2010, poster: '/subskills/inception.png' },
  { title: 'Fight Club', year: 1999, poster: '/subskills/fight_club.jpg' },
  { title: 'Into The Wild', year: 2007, poster: '/subskills/intothewild.jpg' },
  { title: 'The Prestige', year: 2006, poster: '/subskills/prestige.webp' },
  { title: 'Cast Away', year: 2000, poster: '/subskills/castaway.jpg' },
  { title: 'The Godfather', year: 1972, poster: '/subskills/godfather.jpg' },
  { title: 'In the Heart of the Sea', year: 2015, poster: '/subskills/heartofsea.jpg' },
  { title: 'The Matrix', year: 1999, poster: '/subskills/matrix.jpg' },
  { title: 'The Pianist', year: 2002, poster: '/subskills/pianist.jpg' },
  { title: 'Memento', year: 2000, poster: '/subskills/memento.jpg' },
  { title: 'Saving Private Ryan', year: 1998, poster: '/subskills/savingryan.jpg' },
  { title: 'Zootopia', year: 2016, poster: '/subskills/ztp.png' }
];

const footballHighlights = [
  { title: 'World Cup Final 2022', desc: 'Argentina vs France — The greatest final ever.' },
  { title: 'Copa América 2021', desc: 'Messi lifts the international trophy.' },
  { title: 'UCL Final 2011', desc: 'Barcelona 3-1 Man United — Peak tiki-taka.' },
  { title: '91 Goals in 2012', desc: 'The record-breaking calendar year.' },
];

const travelLog = [
  { city: 'Tokyo', coords: '35.6762° N, 139.6503° E', image: '/subskills/MERN.png', date: '2024-11-15' },
  { city: 'Paris', coords: '48.8566° N, 2.3522° E', image: '/subskills/database.png', date: '2024-08-22' },
  { city: 'New York', coords: '40.7128° N, 74.0060° W', image: '/subskills/postman.png', date: '2024-06-10' },
  { city: 'Bali', coords: '8.3405° S, 115.0920° E', image: '/subskills/jetpack_compose.png', date: '2023-12-28' },
  { city: 'Dubai', coords: '25.2048° N, 55.2708° E', image: '/subskills/kotlin.png', date: '2023-09-05' },
];

const playlist = [
  { title: 'Midnight Algorithm', artist: 'Synthwave Protocol', duration: '3:42', album: 'Digital Echoes' },
  { title: 'Neural Cascade', artist: 'Digital Echoes', duration: '4:18', album: 'Signal Processing' },
  { title: 'Binary Sunset', artist: 'Ambient Core', duration: '5:01', album: 'Deep Focus' },
  { title: 'Deep Focus State', artist: 'Lo-Fi Engine', duration: '3:55', album: 'Flow States' },
  { title: 'Quantum Drift', artist: 'Electron Wave', duration: '4:33', album: 'Particle Decay' },
];

const hobbies = [
  { id: 'mecard', label: 'Profile', icon: User, color: '#00FFFF' },
  { id: 'movies', label: 'Cinema', icon: Film, color: '#e879f9' },
  { id: 'football', label: 'Football', icon: Trophy, color: '#fbbf24' },
  { id: 'travel', label: 'Travel', icon: Compass, color: '#38bdf8' },
];

// ═══════════════════════════════════════════
// MODAL CONTENT COMPONENTS
// ═══════════════════════════════════════════

const MoviesModal = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto max-h-[60vh] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {movies.map((movie, i) => (
      <motion.div
        key={movie.title}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
        className="relative rounded-xl overflow-hidden aspect-[3/4] group cursor-pointer"
      >
        {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.poster})` }} /> */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 p-2.5">
          <p className="text-xs font-bold text-mercury-100">{movie.title}</p>
          <p className="text-[9px] font-mono text-mercury-500">{movie.year}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const FootballModal = () => (
  <div className="flex flex-col md:flex-row gap-6 max-h-[60vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      className="md:w-1/2 relative rounded-xl overflow-hidden min-h-[250px]"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/subskills/messi.jpg)` }} />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-2xl font-black text-amber-400">MESSI</p>
        <p className="text-[10px] font-mono text-mercury-400">THE GREATEST OF ALL TIME</p>
      </div>
    </motion.div>
    <div className="md:w-1/2 flex flex-col gap-2">
      {footballHighlights.map((hl, i) => (
        <motion.div
          key={hl.title}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass-panel rounded-lg p-4 border border-mercury-800/40 hover:border-amber-500/30 transition-colors"
        >
          <p className="text-xs font-bold text-mercury-100">{hl.title}</p>
          <p className="text-[10px] text-mercury-400">{hl.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const TravelModal = () => (
  <div className="relative pl-6 border-l-2 border-cyan-500/30 max-h-[60vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {travelLog.map((loc, i) => (
      <motion.div
        key={loc.city}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.08 }}
        className="relative mb-6 last:mb-0"
      >
        <div className="absolute -left-[29px] top-2 w-3 h-3 rounded-full bg-cyan-500 border-3 border-dark-bg shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
        <div className="glass-panel rounded-lg overflow-hidden border border-mercury-800/40">
          <div className="w-full h-[100px] relative overflow-hidden">
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${loc.image})` }} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="p-3">
            <p className="text-sm font-bold text-mercury-100">{loc.city}</p>
            <p className="text-[10px] font-mono text-cyan-400 tracking-wider">{loc.coords}</p>
            <p className="text-[9px] font-mono text-mercury-600">LOG: {loc.date}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const modalMap = { movies: MoviesModal, football: FootballModal, travel: TravelModal };

// ═══════════════════════════════════════════
// MODULE A: ARCHIVE FOLDER
// ═══════════════════════════════════════════

const ArchiveFolder = ({ onOpen }) => (
  <div className="h-full flex flex-col rounded-2xl bg-[#0d0d0f] border border-mercury-800/30 overflow-hidden" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.4)' }}>
    <div className="px-5 py-3 border-b border-mercury-800/20">
      <p className="text-[10px] font-mono text-mercury-600 uppercase tracking-widest">Module_A</p>
      <p className="text-sm font-bold text-mercury-200 mt-1">Off-Duty Archive</p>
    </div>
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="grid grid-cols-4 gap-3 w-full max-w-md mx-auto">
        {hobbies.map((h, i) => {
          const Icon = h.icon;
          return (
            <motion.button
              key={h.id}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: ["-4px", "4px", "-4px"],
                transition: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
              }}
              onClick={() => onOpen(h.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-mercury-800/40 bg-mercury-900/20 hover:border-mercury-600/50 hover:bg-mercury-900/40 transition-all group cursor-pointer"
            >
              <Icon size={24} className="text-mercury-400 group-hover:text-mercury-100 transition-colors" />
              <span className="text-[10px] font-mono text-mercury-600 group-hover:text-mercury-400 transition-colors tracking-widest">{h.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════
// MODULE B: UPLINK (Contact)
// ═══════════════════════════════════════════

const UplinkModule = () => {
  const [formData, setFormData] = useState({ sender: '', frequency: '', packet: '' });
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sender || !formData.frequency || !formData.packet) return;
    setStatus('sending');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(() => setStatus('success'), 300); return 100; }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);
  };

  const reset = () => { setStatus('idle'); setProgress(0); setFormData({ sender: '', frequency: '', packet: '' }); };

  const fields = [
    { id: 'sender', label: 'USER_ID', placeholder: 'Your Name', type: 'text' },
    { id: 'frequency', label: 'ENTRY_POINT', placeholder: 'your.email@domain.com', type: 'email' },
  ];

  return (
    <div className="h-full flex flex-col rounded-2xl bg-[#0d0d0f] border border-mercury-800/30 overflow-hidden" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.4)' }}>
      {/* Editor Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-mercury-800/20 bg-mercury-900/30">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[10px] font-mono text-mercury-600 ml-2">uplink_terminal.sh</span>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-5 font-mono text-xs overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <p className="text-mercury-600 text-[10px] mb-4">
          <span className="text-mercury-700 mr-2 select-none">01</span>// Establish uplink
        </p>

        {fields.map((field, i) => (
          <div key={field.id} className="flex items-center gap-1.5 mb-3">
            <span className="text-mercury-700 text-[10px] w-5 text-right select-none">{String(i + 2).padStart(2, '0')}</span>
            <span className="text-purple-400 text-[11px]">const</span>
            <span className="text-cyan-400 text-[11px]">{field.label}</span>
            <span className="text-mercury-500">=</span>
            <input
              type={field.type}
              value={formData[field.id]}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
              placeholder={`"${field.placeholder}"`}
              className="flex-1 bg-mercury-900/40 border border-mercury-800/50 rounded-lg px-2.5 py-2 text-mercury-200 text-[11px] font-mono placeholder:text-mercury-700 focus:outline-none focus:border-mercury-500/50 transition-colors min-w-0"
              disabled={status !== 'idle'}
            />
          </div>
        ))}

        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-mercury-700 text-[10px] w-5 text-right select-none">04</span>
            <span className="text-purple-400 text-[11px]">const</span>
            <span className="text-cyan-400 text-[11px]">DATA_PACKET</span>
            <span className="text-mercury-500">=</span>
          </div>
          <textarea
            value={formData.packet}
            onChange={(e) => setFormData(prev => ({ ...prev, packet: e.target.value }))}
            placeholder={'"Your message..."'}
            rows={4}
            className="w-full ml-7 bg-mercury-900/40 border border-mercury-800/50 rounded-lg px-2.5 py-2 text-mercury-200 text-[11px] font-mono placeholder:text-mercury-700 focus:outline-none focus:border-mercury-500/50 transition-colors resize-none"
            style={{ width: 'calc(100% - 28px)' }}
            disabled={status !== 'idle'}
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-mercury-700 text-[10px] w-5 text-right select-none">05</span>
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.button key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(0,255,100,0.1)' }}
                className="px-5 py-2.5 rounded-lg border border-green-500/40 bg-green-500/10 text-green-400 font-mono text-[10px] uppercase tracking-widest hover:border-green-400/60 transition-all"
              >[ EXECUTE_TRANSMISSION ]</motion.button>
            )}
            {status === 'sending' && (
              <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
                <p className="text-yellow-400 text-[10px] mb-1 animate-pulse">⟩ UPLOADING... {Math.min(100, Math.floor(progress))}%</p>
                <div className="w-full h-1.5 bg-mercury-800/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-green-400 rounded-full transition-all" style={{ width: `${Math.min(100, progress)}%` }} />
                </div>
              </motion.div>
            )}
            {status === 'success' && (
              <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-green-400 text-[10px] mb-1">✓ PACKET_SENT → [<span className="font-bold">SUCCESS</span>]</p>
                <button onClick={reset} className="text-[9px] text-mercury-500 hover:text-mercury-300 underline underline-offset-4">[ RESET ]</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE C: FREQUENCIES (YouTube Music — Album Art Style)
// ═══════════════════════════════════════════

const BAR_COUNT = 24;

const FrequenciesModule = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [bars, setBars] = useState(Array(BAR_COUNT).fill(0.15));
  const [trackProgress, setTrackProgress] = useState(0);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) { setBars(Array(BAR_COUNT).fill(0.15)); return; }
    const bpm = 120;
    const beatInterval = 60000 / bpm;
    const animate = () => {
      timeRef.current += 16;
      const beatPhase = (timeRef.current % beatInterval) / beatInterval;
      setBars(Array(BAR_COUNT).fill(0).map((_, i) => {
        const offset = (i / BAR_COUNT) * Math.PI * 2;
        return Math.max(0.08, Math.min(1, 0.3 + Math.sin(beatPhase * Math.PI * 2 + offset) * 0.35 + Math.sin(beatPhase * Math.PI * 4 + offset * 1.5) * 0.2 + Math.random() * 0.12));
      }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying]);

  // Simulate track progress
  useEffect(() => {
    if (!isPlaying) return;
    progressRef.current = setInterval(() => {
      setTrackProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 100);
    return () => clearInterval(progressRef.current);
  }, [isPlaying]);

  const track = playlist[activeTrack];

  return (
    <div className="h-full flex flex-col rounded-2xl bg-[#0d0d0f] border border-mercury-800/30 overflow-hidden relative" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.4)' }}>

      {/* YouTube Music Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-mercury-800/20">
        <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
          <Play size={10} className="text-white ml-[1px]" fill="white" />
        </div>
        <span className="text-[10px] font-bold text-mercury-300 tracking-wider">YouTube Music</span>
      </div>

      {/* Album Art + "Last Played" info */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Album Art Blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black/80 to-black pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-5 gap-4">
          {/* "Last Played" label */}
          <p className="text-[10px] font-mono text-mercury-500 uppercase tracking-widest self-start">Last Played</p>

          {/* Track info */}
          <div className="self-start mb-1">
            <p className="text-mercury-400 text-xs leading-relaxed">
              I recently listened to <span className="text-mercury-100 font-bold">{track.title}</span> by <span className="text-mercury-100 font-bold">{track.artist}</span> from the album <span className="italic text-mercury-300">{track.album}</span>
            </p>
          </div>

          {/* Vinyl Record / Album Art */}
          <div className="relative w-[180px] h-[180px] mx-auto">
            {/* Vinyl disc */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              className="absolute inset-0 rounded-full bg-[#1a1a1a] border-2 border-mercury-800/30"
              style={{
                background: 'conic-gradient(from 0deg, #1a1a1a 0%, #252525 25%, #1a1a1a 50%, #252525 75%, #1a1a1a 100%)',
                boxShadow: isPlaying ? '0 0 30px rgba(255,0,0,0.1)' : 'none'
              }}
            >
              {/* Grooves */}
              <div className="absolute inset-4 rounded-full border border-mercury-700/15" />
              <div className="absolute inset-8 rounded-full border border-mercury-700/10" />
              <div className="absolute inset-12 rounded-full border border-mercury-700/15" />
              {/* Center label */}
              <div className="absolute inset-[60px] rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
                <Music size={16} className="text-white/60" />
              </div>
            </motion.div>

            {/* Album cover overlay (positioned to right like ref image) */}
            <div className="absolute -right-4 top-2 w-[130px] h-[170px] rounded-lg overflow-hidden shadow-2xl border border-mercury-800/40 z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-black" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                <p className="text-[8px] font-mono text-mercury-500 uppercase tracking-widest mb-2">NOW PLAYING</p>
                <p className="text-sm font-black text-mercury-100 leading-tight">{track.title}</p>
                <p className="text-[9px] text-mercury-400 mt-1">{track.artist}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer bar at the bottom */}
        <div className="px-4 py-3 flex items-end justify-center gap-[2px] h-[50px] relative z-10">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-[4px] rounded-full transition-all duration-75"
              style={{
                height: `${h * 35}px`,
                backgroundColor: isPlaying ? `hsl(${0 + i * 2}, 80%, ${45 + h * 15}%)` : 'rgb(50,50,55)',
                boxShadow: isPlaying ? `0 0 ${h * 4}px hsl(${0 + i * 2}, 80%, 45%)` : 'none'
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-mercury-900/50 relative z-10">
          <div className="h-full bg-red-600 transition-all duration-100" style={{ width: `${trackProgress}%` }} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 py-3 relative z-10">
          <button onClick={() => { setActiveTrack(p => (p - 1 + playlist.length) % playlist.length); setTrackProgress(0); }} className="text-mercury-500 hover:text-mercury-200 transition-colors">
            <SkipBack size={16} />
          </button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPlaying(!isPlaying)}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black hover:bg-mercury-200 transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </motion.button>
          <button onClick={() => { setActiveTrack(p => (p + 1) % playlist.length); setTrackProgress(0); }} className="text-mercury-500 hover:text-mercury-200 transition-colors">
            <SkipForward size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MAIN: PERSONAL HUB
// ═══════════════════════════════════════════

const MeCardModal = ({ onClose }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const glareX = useTransform(x, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["100%", "0%"]);
  const backgroundGlare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md perspective-[1000px]"
      onClick={onClose}
      style={{ overscrollBehavior: 'contain' }}
    >
       <motion.div 
         onClick={(e) => e.stopPropagation()}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         className="relative w-full max-w-[360px] aspect-[3/4.5] rounded-3xl group"
         style={{ transformStyle: "preserve-3d" }}
       >
          {/* Close Button above card */}
          <button onClick={onClose} className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors z-50">
            <X size={24} />
          </button>

          {/* The Card */}
          <motion.div
             style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
             className="w-full h-full relative rounded-3xl border border-white/20 overflow-hidden backdrop-blur-[25px] bg-white/5 shadow-2xl transition-transform duration-300 group-hover:scale-105"
          >
             {/* The "Living" Background Blobs */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {/* Blob A: Electric Cyan */}
                <motion.div 
                  animate={{ x: ["-20%", "20%", "-20%"], y: ["-20%", "20%", "-20%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,#00FFFF_0%,transparent_50%)] opacity-40 mix-blend-screen blur-[40px]"
                />
                {/* Blob B: Hot Pink */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-[20%] -right-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,#FF1493_0%,transparent_50%)] opacity-40 mix-blend-screen blur-[40px]"
                />
             </div>

             {/* Neon Corner Highlights */}
             <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#00FFFF] rounded-tl-3xl opacity-80 z-20 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom right, black, transparent)' }}></div>
             <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#FF1493] rounded-tr-3xl opacity-80 z-20 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom left, black, transparent)' }}></div>
             <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#FF1493] rounded-bl-3xl opacity-80 z-20 pointer-events-none" style={{ maskImage: 'linear-gradient(to top right, black, transparent)' }}></div>
             <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#00FFFF] rounded-br-3xl opacity-80 z-20 pointer-events-none" style={{ maskImage: 'linear-gradient(to top left, black, transparent)' }}></div>
             
             {/* Specular Glare */}
             <motion.div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 z-20"
                style={{ background: backgroundGlare }}
             />

             {/* Card Content with Parallax */}
             <div className="absolute inset-0 flex flex-col p-6 z-30" style={{ transform: 'translateZ(30px)' }}>
                {/* TOP 60%: Profile Cutout */}
                <div className="h-[55%] w-full rounded-2xl overflow-hidden relative mb-4">
                   {/* Rotating Gradient Border */}
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent,transparent,#f09433,#e6683c,#bc1888,transparent,transparent)] opacity-80"
                   />
                   <div className="absolute inset-[2px] rounded-xl overflow-hidden bg-[#0d0d0f]">
                      <img src="/subskills/yosobanta.jpg" alt="Profile" className="w-full h-full object-cover grayscale contrast-125" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=YM&background=0D8ABC&color=fff&size=512' }} />
                   </div>
                </div>

                {/* BOTTOM 40% */}
                <div className="h-[45%] flex flex-col justify-end">
                   <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#00FFFF]/20 to-[#FF1493]/20 border border-white/10 text-[10px] font-bold text-white tracking-widest mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                        [ CREATIVE_ARCHITECT ]
                      </span>
                      <h2 className="text-3xl font-bold tracking-tight text-white m-0 leading-none" style={{ fontFamily: 'Inter, sans-serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>YOSOBANTA M.</h2>
                   </div>
                   
                   {/* Status Line Marquee */}
                   <div className="w-[120%] -ml-[10%] overflow-hidden border-t border-white/20 pt-3 mt-auto relative">
                      {/* Fade edges */}
                      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0d0d0f]/0 to-transparent z-10" />
                      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0d0d0f]/0 to-transparent z-10" />
                      <motion.div 
                        animate={{ x: [0, -400] }} 
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="whitespace-nowrap flex text-[10px] font-mono text-[#00FFFF] opacity-80"
                      >
                         <span>&gt;&gt; PERSONAL_DATA_ENCRYPTED // HOBBIES_LOADED // MERN_GENAI_STACK //&nbsp;</span>
                         <span>&gt;&gt; PERSONAL_DATA_ENCRYPTED // HOBBIES_LOADED // MERN_GENAI_STACK //&nbsp;</span>
                      </motion.div>
                   </div>
                </div>
             </div>
          </motion.div>
       </motion.div>
    </motion.div>
  );
}

export default function PersonalHub() {
  const [activeModal, setActiveModal] = useState(null);
  const ModalContent = activeModal ? modalMap[activeModal] : null;
  const activeHobby = hobbies.find(h => h.id === activeModal);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.3em] mb-4">Human Protocol</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-mercury-200">Personal <span className="text-mercury-600 font-light">Hub.</span></h3>
        </div>

        {/* Two Halves */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6" style={{ minHeight: '65vh' }}>
          {/* LEFT — Uplink (Contact Form) */}
          <UplinkModule />

          {/* RIGHT — 65/35 Split */}
          <div className="flex flex-col gap-5 lg:gap-6 h-full">
            {/* TOP 65% — Quotes */}
            <div className="flex-[0.65] rounded-2xl bg-[#0d0d0f] border border-mercury-800/30 overflow-hidden flex flex-col justify-center" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.4)' }}>
               <QuoteCarousel />
            </div>

            {/* BOTTOM 35% — Hobbies */}
            <div className="flex-[0.35]">
               <ArchiveFolder onOpen={(id) => setActiveModal(id)} />
            </div>
          </div>
        </div>
      </div>

      {/* ── POP-OUT MODAL OVERLAY (scroll-locked) ── */}
      <AnimatePresence>
        {activeModal && activeModal === 'mecard' && (
           <MeCardModal onClose={() => setActiveModal(null)} />
        )}
        
        {activeModal && activeModal !== 'mecard' && ModalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
            style={{ overscrollBehavior: 'contain' }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              className="glass-panel rounded-2xl border border-mercury-700/50 w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col"
              style={{ boxShadow: `0 0 60px ${activeHobby?.color || '#fff'}20`, overscrollBehavior: 'contain' }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-mercury-800/40 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeHobby?.color }} />
                  <p className="text-sm font-bold text-mercury-200 uppercase tracking-wider">{activeHobby?.label}</p>
                </div>
                <button onClick={() => setActiveModal(null)} className="text-mercury-500 hover:text-mercury-200 transition-colors p-1">
                  <X size={18} />
                </button>
              </div>
              {/* Modal Body — this is the scrollable area */}
              <div className="p-6 overflow-y-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ overscrollBehavior: 'contain' }}>
                <ModalContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
