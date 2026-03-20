import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'projects', label: 'WORK AREA' },
  { id: 'area-of-work', label: 'PROJECTS' },
];

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleNavClick = (id) => {
    setActiveTab(id);
    const selector = id === 'home' ? '#home' : `#${id}`;
    if (window.lenis) {
      window.lenis.scrollTo(selector, { duration: 1.5 });
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-120%' },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between pointer-events-none"
    >
      {/* Left Wing: Brand & Status */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[40px] h-[40px] flex items-center justify-center border border-mercury-600/50 bg-black/40 mercury-glow rounded-sm relative group"
        >
          <span className="font-mono font-bold text-mercury-100 text-xl relative z-10">Y</span>
          <div className="absolute inset-0 bg-mercury-100/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>

        <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2 font-mono text-[10px] tracking-widest text-mercury-400">
          <span>SYSTEM STATUS:</span>
          <motion.span
            animate={{ 
              color: ["#00FF00", "#008800", "#00FF00"],
              textShadow: [
                "0 0 8px rgba(0, 255, 0, 0.5)",
                "0 0 2px rgba(0, 255, 0, 0.2)",
                "0 0 8px rgba(0, 255, 0, 0.5)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="font-bold"
          >
            ONLINE
          </motion.span>
        </div>
      </div>

      {/* Right Wing: Adaptive Nav */}
      <nav className="pointer-events-auto">
        <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-5 py-2 text-[11px] font-mono tracking-widest transition-colors duration-300 ${
                activeTab === item.id ? 'text-white' : 'text-mercury-400 hover:text-mercury-200'
              }`}
            >
              <span className="relative z-10">{`[ ${item.label} ]`}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
