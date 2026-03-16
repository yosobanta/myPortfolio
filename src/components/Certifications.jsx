import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShieldCheck } from 'lucide-react';

const certifications = [
  {
    id: 'cert-1',
    name: 'The Bits and Bytes of Computer Networking',
    provider: 'Google',
    providerImage: '/subskills/google_logo.png',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/certificate/9SYE20Q28UIF',
    color: '#f97316'
  },
  {
    id: 'cert-2',
    name: 'Introduction to Hardware and Operating Systems',
    provider: 'IBM',
    providerImage: '/subskills/ibm_logo.png',
    verifyUrl: '#',
    color: '#4285F4'
  },
  {
    id: 'cert-3',
    name: 'GPU Computing with CUDA',
    provider: 'NVIDIA',
    providerImage: '/subskills/computer_vision2.png',
    verifyUrl: '#',
    color: '#76B900'
  },
  {
    id: 'cert-4',
    name: 'Network Communication',
    provider: 'University of Colorado',
    providerImage: '/subskills/cu_logo.png',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/certificate/S338DTIGGXV0',
    color: '#3DDC84'
  },
  {
    id: 'cert-5',
    name: 'Problem Solving',
    provider: 'CodeChef',
    providerImage: '/subskills/CodeChef_Logo.png',
    verifyUrl: 'https://www.codechef.com/certificates/public/52d6521',
    color: '#FF9900'
  },
  {
    id: 'cert-6',
    name: 'Cloud Computing',
    provider: 'NPTEL',
    providerImage: '/subskills/nptel_logo.png',
    verifyUrl: import.meta.env.VITE_CERT_DRIVE_CLOUD_COMPUTING,
    color: '#38bdf8'
  },
  {
    id: 'cert-7',
    name: 'C++ Learner',
    provider: 'CodeChef',
    providerImage: '/subskills/CodeChef_Logo.png',
    verifyUrl: 'https://www.codechef.com/certificates/public/f887df0',
    color: '#0056D2'
  },
  {
    id: 'cert-8',
    name: 'Computation Theory',
    provider: 'Infosys',
    providerImage: '/subskills/Infosys_logo.svg.webp',
    verifyUrl: import.meta.env.VITE_CERT_DRIVE_COMPUTATION_THEORY,
    color: '#00EA64'
  },
  {
    id: 'cert-9',
    name: 'MERN stack with GenAI',
    provider: 'W3Grads(The Angaar Batch)',
    providerImage: '/subskills/angaari_logo.png',
    verifyUrl: import.meta.env.VITE_CERT_DRIVE_MERN_GENAI,
    color: '#7F52FF'
  },
  {
    id: 'cert-10',
    name: 'Responsive Web Design',
    provider: 'FreeCodeCamp',
    providerImage: '/subskills/FreeCodeCamp_logo.png',
    verifyUrl: import.meta.env.VITE_CERT_DRIVE_WEB_DESIGN,
    color: '#7F52FF'
  }
];

const CertCard = ({ cert, index, glowIntensity }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  // Pendulum swing animation — staggered
  const pendulumAnimation = {
    rotate: [-2, 2, -2],
    transition: {
      duration: 3 + index * 0.3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: index * 0.25
    }
  };

  return (
    <div ref={cardRef}  className="flex flex-col items-center flex-shrink-0" style={{ transformOrigin: 'top center' }}>
      {/* Connector thread from rope to card */}
      <div
        className="w-[1px] h-8 md:h-12 transition-all duration-700"
        style={{
          background: `linear-gradient(to bottom, ${cert.color}80, ${cert.color}20)`,
          boxShadow: glowIntensity > 0 ? `0 0 ${8 * glowIntensity}px ${cert.color}` : 'none'
        }}
      />

      {/* The Dangling Card */}
      <motion.div
        animate={pendulumAnimation}
        style={{ transformOrigin: 'top center' }}
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="w-[140px] md:w-[160px] glass-panel rounded-xl border border-mercury-800/50 hover:border-mercury-500/50 overflow-hidden transition-colors duration-300 group"
          style={{
            boxShadow: glowIntensity > 0
              ? `0 4px ${20 * glowIntensity}px ${cert.color}40`
              : '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          {/* Card Visual */}
          <div className="w-full h-[80px] md:h-[100px] relative overflow-hidden bg-mercury-900/60">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-40 group-hover:opacity-70 transition-opacity duration-500"
              style={{ backgroundImage: `url(${cert.providerImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Card Info */}
          <div className="p-3 md:p-4">
            <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: cert.color }}>
              {cert.provider}
            </p>
            <p className="text-xs text-mercury-200 font-medium leading-tight line-clamp-2">
              {cert.name}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* EXPANDED: Full Detail Modal/Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="mt-3 overflow-hidden w-[280px] md:w-[320px]"
          >
            <div className="glass-panel rounded-2xl border border-mercury-700/50 overflow-hidden">
              {/* 70% — Provider Image */}
              <div className="w-full h-[180px] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cert.providerImage})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent" />
              </div>

              {/* 30% — Certificate Info & Verify */}
              <div className="p-5 bg-mercury-900/80 backdrop-blur-md">
                <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: cert.color }}>
                  {cert.provider}
                </p>
                <h5 className="text-base font-bold text-mercury-100 mb-4">
                  {cert.name}
                </h5>
                <motion.a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 0 20px ${cert.color}50`
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all duration-300"
                  style={{
                    color: cert.color,
                    borderColor: `${cert.color}50`,
                    backgroundColor: `${cert.color}10`
                  }}
                >
                  <ShieldCheck size={14} /> Verify Protocol <ExternalLink size={12} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Certifications({ glowIntensity = 0 }) {
  return (
    <section id="certifications" className="w-full py-32 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.3em] mb-4">Verified Credentials</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-mercury-200">Validated <br /><span className="text-mercury-600 font-light">Protocols.</span></h3>
        </div>

        {/* ── THE FIBER-OPTIC ROPE ── */}
        <div className="relative">
          {/* The Rope Line */}
          <motion.div
            animate={{
              boxShadow: glowIntensity > 0
                ? `0 0 ${15 * glowIntensity}px rgba(0,234,255,${0.4 * glowIntensity}), 0 0 ${30 * glowIntensity}px rgba(0,234,255,${0.2 * glowIntensity})`
                : '0 0 10px rgba(0,234,255,0.2), 0 0 20px rgba(0,234,255,0.1)'
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
          />

          {/* Dangling Cards Container */}
          <div className="flex flex-nowrap items-start justify-start  gap-6 md:gap-8 mt-0 overflow-x-auto overflow-y-visible pb-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {certifications.map((cert, idx) => (
              <CertCard key={cert.id} cert={cert} index={idx} glowIntensity={glowIntensity} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
