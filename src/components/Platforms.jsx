import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode, SiGeeksforgeeks, SiHackerrank, SiCodechef, SiHackerearth, SiKaggle } from 'react-icons/si';

const platforms = [
  {
    name: 'LeetCode',
    icon: SiLeetcode,
    color: '#FFA116',
    url: 'https://leetcode.com/u/yosobanta/' // Add actual URLs if needed
  },
  {
    name: 'GeeksforGeeks',
    icon: SiGeeksforgeeks,
    color: '#2F8D46',
    url: 'https://www.geeksforgeeks.org/profile/yosobanta_05'
  },
  {
    name: 'HackerRank',
    icon: SiHackerrank,
    color: '#00EA64',
    url: 'https://www.hackerrank.com/profile/Yosobanta'
  },
  {
    name: 'CodeChef',
    icon: SiCodechef,
    color: '#5B4638',
    url: 'https://www.codechef.com/users/yosobanta2005'
  },
  {
    name: 'HackerEarth',
    icon: SiHackerearth,
    color: '#323754',
    url: '#'
  },
  {
    name: 'Kaggle',
    icon: SiKaggle,
    color: '#20BEFF',
    url: 'https://www.kaggle.com/yosobanta'
  }
];

const BalloonIcon = ({ platform, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = platform.icon;

  // Base floating animation: sine wave up and down with slight rotation
  const floatAnimation = {
    y: ["-15px", "15px", "-15px"],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.4, // Stagger the animations
    }
  };

  // Hover animation: faster wiggle when hovered
  const hoverWiggle = {
    y: ["-5px", "5px", "-5px"],
    rotate: [-10, 10, -10],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut",
    }
  };

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col items-center justify-center p-6 md:p-8 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="initial"
    >
      <motion.div
        animate={isHovered ? hoverWiggle : floatAnimation}
        whileHover={{ scale: 1.25 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }} // Bouncy spring for scale
        className="relative z-10 glass-panel p-6 rounded-full border border-mercury-700/50 group-hover:border-mercury-400/80 transition-colors duration-300 bg-mercury-900/40 backdrop-blur-md flex items-center justify-center"
      >
        <Icon size={48} className="text-mercury-200 transition-colors duration-300" style={{ color: isHovered ? platform.color : undefined }} />
      </motion.div>

      {/* Backlit Bloom Glow Effect */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-2xl opacity-0 scale-50 transition-all duration-500 pointer-events-none z-0 ${isHovered ? 'opacity-40 scale-100' : ''}`}
        style={{ backgroundColor: platform.color }}
      />
      
      {/* Tooltip Name */}
      <span className="absolute -bottom-8 text-sm font-mono tracking-widest text-mercury-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {platform.name}
      </span>
    </motion.a>
  );
};

export default function Platforms() {
  return (
    <section className="w-full py-32 px-6 md:px-12 lg:px-24 mx-auto relative z-10 overflow-hidden">
      
      <div className="text-center mb-20">
        <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.3em] mb-4">Coding Profiles</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-mercury-200 tracking-tight">Competitive <span className="text-mercury-600 font-light">& Specialization</span></h3>
      </div>

      {/* The Horizontal Float Layout */}
      <div className="flex flex-nowrap items-center justify-start md:justify-center gap-6 md:gap-16 max-w-7xl mx-auto min-h-[250px] relative overflow-x-auto overflow-y-visible px-4 py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Subtle background connecting line */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-mercury-800/50 to-transparent -translate-y-1/2 -z-10 hidden md:block" />

        {platforms.map((platform, idx) => (
          <div key={platform.name} className="flex-shrink-0">
            <BalloonIcon platform={platform} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
}
