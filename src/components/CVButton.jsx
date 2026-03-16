import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Download } from 'lucide-react';

export default function CVButton({ resumeUrl }) {
  const dropBaseStyles = 
    "relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 " +
    "rounded-full " +
    "bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-md " +
    "border border-white/20 " +
    "shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),inset_-3px_-3px_6px_rgba(0,0,0,0.4),0_8px_16px_rgba(0,0,0,0.4)] " +
    "transition-all duration-300 hover:brightness-125 hover:shadow-[inset_2px_2px_6px_rgba(255,255,255,0.7),inset_-3px_-3px_6px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer group flex-shrink-0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="interactable relative glass-panel rounded-full z-30 flex items-center justify-between border border-white/5 bg-white/5 backdrop-blur-md w-full h-full pl-6 pr-2 py-2"
    >
      {/* Label */}
      <span className="text-mercury-100 font-medium tracking-wide uppercase text-sm mr-4">
        CV
      </span>

      {/* Action Drops */}
      <div className="flex gap-2 items-center">
        {/* View Drop */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open(resumeUrl, '_blank')}
          className={dropBaseStyles}
          title="Preview CV"
        >
          {/* Reflection highlight */}
          <div className="absolute top-[10%] left-[15%] w-[25%] h-[25%] bg-white/40 rounded-full blur-[1px]" />
          
          <Eye size={18} strokeWidth={1.5} className="text-mercury-300 group-hover:text-white transition-colors relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        </motion.div>

        {/* Download Drop */}
        <motion.a 
          href={resumeUrl}
          download="Yosobanta_CV.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={dropBaseStyles}
          title="Download CV"
        >
          {/* Reflection highlight */}
          <div className="absolute top-[10%] left-[15%] w-[25%] h-[25%] bg-white/40 rounded-full blur-[1px]" />

          <Download size={18} strokeWidth={1.5} className="text-mercury-300 group-hover:text-white transition-colors relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        </motion.a>
      </div>
    </motion.div>
  );
}
