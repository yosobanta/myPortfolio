import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Compass, Trophy, X } from 'lucide-react';

// ── DATA ──
const movies = [
  { title: 'Shawshank Redemption', year: 1994, poster: '/subskills/shawshank_redemption.jpg' },
  { title: 'Schindler List', year: 1993, poster: '/subskills/slist.jpg' },
  { title: 'Seven', year: 1995, poster: '/subskills/se7en.webp' },
  { title: 'The Green Mile', year: 1999, poster: '/subskills/tgm.jpg' },
  { title: 'Grave of the Fireflies', year: 1988, poster: '/subskills/tgof.jpg' },
  { title: 'The Lion King', year: 1994, poster: '/subskills/the_lion_king.jpg' },
  { title: 'Interstellar', year: 2014, poster: '/subskills/intersteller.webp' },
  { title: 'The Dark Knight', year: 2008, poster: '/subskills/dark_knight.png' },
  { title: 'Inception', year: 2010, poster: '/subskills/inception.png' },
  { title: 'Fight Club', year: 1999, poster: '/subskills/fight_club.png' },
  { title: 'Into The Wild', year: 2007, poster: '/subskills/intothewild.jpg' },
  { title: 'The Prestige', year: 2006, poster: '/subskills/prestige.png' },
  { title: 'Cast Away', year: 2000, poster: '/subskills/castaway.jpg' },
  { title: 'The Godfather', year: 1972, poster: '/subskills/godfather.png' },
  { title: 'In the Heart of the Sea', year: 2015, poster: '/subskills/hearofsea.jpg' },
  { title: 'The Matrix', year: 1999, poster: '/subskills/matrix.jpg' },
  { title: 'The Pianist', year: 2002, poster: '/subskills/pianist.jpg' },
  { title: 'Memento', year: 2000, poster: '/subskills/memento.png' },
  { title: 'Saving Private Ryan', year: 1998, poster: '/subskills/savingryan.jpg' },
  { title: 'Zootopia', year: 2016, poster: '/subskills/ztp.png' }
];

const travelLog = [
  { city: 'Tokyo', coords: '35.6762° N, 139.6503° E', image: '/subskills/MERN.png', date: '2024-11-15' },
  { city: 'Paris', coords: '48.8566° N, 2.3522° E', image: '/subskills/database.png', date: '2024-08-22' },
  { city: 'New York', coords: '40.7128° N, 74.0060° W', image: '/subskills/postman.png', date: '2024-06-10' },
  { city: 'Bali', coords: '8.3405° S, 115.0920° E', image: '/subskills/jetpack_compose.png', date: '2023-12-28' },
  { city: 'Dubai', coords: '25.2048° N, 55.2708° E', image: '/subskills/kotlin.png', date: '2023-09-05' },
];

const footballHighlights = [
  { title: 'World Cup Final 2022', desc: 'Argentina vs France — The greatest final ever.' },
  { title: 'Copa América 2021', desc: 'Messi finally lifts the international trophy.' },
  { title: 'UCL Final 2011', desc: 'Barcelona 3-1 Man United — Peak tiki-taka.' },
  { title: '91 Goals in 2012', desc: 'The record-breaking calendar year.' },
];

const hobbies = [
  { id: 'movies', label: 'Cinema', icon: Film, color: '#e879f9' },
  { id: 'football', label: 'Football', icon: Trophy, color: '#fbbf24' },
  { id: 'travel', label: 'Travel', icon: Compass, color: '#38bdf8' },
];

// ── CARD SHUFFLE ENTRANCE ──
const shuffleVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -120 : 120,
    y: 40,
    rotate: i % 2 === 0 ? -8 : 8,
    scale: 0.85,
  }),
  visible: (i) => ({
    opacity: 1, x: 0, y: 0, rotate: 0, scale: 1,
    transition: { type: 'spring', stiffness: 180, damping: 20, delay: i * 0.08 },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

// ── MOVIES CONTENT ──
const MoviesContent = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {movies.map((movie, i) => (
      <motion.div
        key={movie.title}
        custom={i}
        variants={shuffleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative rounded-xl overflow-hidden aspect-[3/4] group cursor-pointer"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        {/* Grainy Film Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-60 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-sm font-bold text-mercury-100">{movie.title}</p>
          <p className="text-[10px] font-mono text-mercury-500">{movie.year}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

// ── FOOTBALL CONTENT ──
const FootballContent = () => (
  <div className="flex flex-col md:flex-row gap-8">
    {/* Left: Messi Tribute */}
    <motion.div
      custom={0}
      variants={shuffleVariants}
      initial="hidden"
      animate="visible"
      className="md:w-1/2 relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-auto md:min-h-[400px]"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/subskills/android.png)` }} />
      <div className="absolute inset-0 bg-black/40" />
      {/* Golden radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.2)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-3xl font-black text-amber-400 tracking-wider">MESSI</p>
        <p className="text-xs font-mono text-mercury-400 mt-1">THE GREATEST OF ALL TIME</p>
      </div>
    </motion.div>

    {/* Right: Scrollable Highlights */}
    <div className="md:w-1/2 flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {footballHighlights.map((hl, i) => (
        <motion.div
          key={hl.title}
          custom={i + 1}
          variants={shuffleVariants}
          initial="hidden"
          animate="visible"
          className="glass-panel rounded-xl p-5 border border-mercury-800/40 hover:border-amber-500/30 transition-colors"
        >
          <p className="text-sm font-bold text-mercury-100 mb-1">{hl.title}</p>
          <p className="text-xs text-mercury-400 font-light">{hl.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// ── TRAVEL CONTENT ──
const TravelContent = () => (
  <div className="relative pl-8 border-l-2 border-cyan-500/30">
    {travelLog.map((loc, i) => (
      <motion.div
        key={loc.city}
        custom={i}
        variants={shuffleVariants}
        initial="hidden"
        animate="visible"
        className="relative mb-10 last:mb-0"
      >
        {/* GPS Node */}
        <div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-dark-bg shadow-[0_0_10px_rgba(56,189,248,0.5)]" />

        <div className="glass-panel rounded-xl overflow-hidden border border-mercury-800/40 hover:border-cyan-500/30 transition-colors">
          <div className="w-full h-[160px] relative overflow-hidden">
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${loc.image})` }} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="p-4">
            <p className="text-lg font-bold text-mercury-100">{loc.city}</p>
            <p className="text-[11px] font-mono text-cyan-400 tracking-wider mt-1">{loc.coords}</p>
            <p className="text-[10px] font-mono text-mercury-600 mt-1">LOG: {loc.date}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// ── CONTENT MAP ──
const contentMap = {
  movies: MoviesContent,
  football: FootballContent,
  travel: TravelContent,
};

// ── MAIN COMPONENT ──
export default function Hobbies() {
  const [activeHobby, setActiveHobby] = useState(null);

  const floatAnimation = (i) => ({
    y: ["-12px", "12px", "-12px"],
    rotate: [-3, 3, -3],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.3,
    }
  });

  const ActiveContent = activeHobby ? contentMap[activeHobby] : null;
  const activeData = hobbies.find(h => h.id === activeHobby);

  return (
    <section className="w-full py-32 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.3em] mb-4">Human Protocol</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-mercury-200">The <br /><span className="text-mercury-600 font-light">Archive.</span></h3>
        </div>

        {/* ── FLOATING 3D ICONS ── */}
        <div className="flex items-center justify-center gap-12 md:gap-20 mb-16">
          {hobbies.map((hobby, i) => {
            const Icon = hobby.icon;
            const isActive = activeHobby === hobby.id;
            return (
              <motion.button
                key={hobby.id}
                animate={floatAnimation(i)}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                onClick={() => setActiveHobby(isActive ? null : hobby.id)}
                className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-500 cursor-pointer group ${isActive ? 'glass-panel border border-mercury-600/50' : ''
                  }`}
              >
                <div
                  className={`p-5 rounded-full border transition-all duration-500 ${isActive
                      ? 'border-mercury-400/60 bg-mercury-900/60'
                      : 'border-mercury-700/40 bg-mercury-900/30 group-hover:border-mercury-500/50'
                    }`}
                  style={{
                    boxShadow: isActive ? `0 0 30px ${hobby.color}40` : 'none'
                  }}
                >
                  <Icon size={36} style={{ color: isActive ? hobby.color : undefined }} className="text-mercury-300 transition-colors duration-300" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-mercury-500 group-hover:text-mercury-300 transition-colors">
                  {hobby.label}
                </span>

                {/* Bloom glow */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-2xl transition-all duration-700 pointer-events-none -z-10 ${isActive ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
                    }`}
                  style={{ backgroundColor: hobby.color }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* ── EXPANDED CONTENT ── */}
        <AnimatePresence mode="wait">
          {activeHobby && ActiveContent && (
            <motion.div
              key={activeHobby}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="overflow-hidden"
            >
              <div className="glass-panel rounded-2xl border border-mercury-800/40 p-6 md:p-10 min-h-[50vh] max-h-[70vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative">
                {/* Close + Title */}
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-bold text-mercury-100 uppercase tracking-wider flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeData?.color }} />
                    {activeData?.label}
                  </h4>
                  <button
                    onClick={() => setActiveHobby(null)}
                    className="text-mercury-500 hover:text-mercury-200 transition-colors p-2"
                  >
                    <X size={20} />
                  </button>
                </div>

                <ActiveContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
