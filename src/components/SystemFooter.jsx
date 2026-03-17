import React from 'react';
import { motion } from 'framer-motion';

/* ─── Social icons as inline SVGs for zero dependencies ─────── */

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="22,4 12,13 2,4" />
  </svg>
);

const socials = [
  { icon: <InstagramIcon />, label: 'Instagram', url: 'https://www.instagram.com/offbeat_yash/', glowColor: '#E1306C' },
  { icon: <FacebookIcon />, label: 'Facebook', url: 'https://www.facebook.com/jasbant.patra.9/', glowColor: '#4267B2' },
  { icon: <GmailIcon />, label: 'Gmail', url: 'mailto:your@email.com', glowColor: '#EA4335' },
];

/* ─── Bob (anti-gravity) keyframes via Framer Motion ────────── */

const bobVariants = {
  hover: {
    y: [0, -4, 0, -2, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function SystemFooter() {
  return (
    <footer className="relative w-full z-10">
      {/* ── STATUS BAR ── */}
      <div className="w-full border-t border-mercury-800/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-center">
          <span className="font-mono text-[11px] md:text-xs text-mercury-600/60 tracking-widest uppercase select-none">
            {'>> '}LOG_STATUS: ALL SYSTEMS OPERATIONAL. THANK YOU FOR VISITING.
          </span>
        </div>
      </div>

      {/* ── FOOTER BOTTOM ── */}
      <div className="w-full border-t border-mercury-800/20 bg-mercury-900/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          {/* Left: Build info */}
          <span className="font-mono text-[10px] md:text-xs text-mercury-600/50 tracking-wider uppercase select-none">
            BUILD_v2.0 // COMPILED UNDER PRESSURE BY YOSOBANTA
          </span>

          {/* Right: Social icons */}
          <div className="flex items-center gap-4 md:gap-5">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="interactable text-mercury-500 transition-colors duration-300 hover:text-mercury-100"
                whileHover="hover"
                variants={bobVariants}
                style={{ display: 'inline-flex' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = `drop-shadow(0 0 8px ${social.glowColor}80) drop-shadow(0 0 16px ${social.glowColor}40)`;
                  e.currentTarget.style.color = social.glowColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'none';
                  e.currentTarget.style.color = '';
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
