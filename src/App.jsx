import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import WorkCards from './components/WorkCards';
import Platforms from './components/Platforms';
import Terminal from './components/Terminal';
import TechArsenal from './components/TechArsenal';
import ProjectVault from './components/ProjectVault';
import Academics from './components/Academics';
import Certifications from './components/Certifications';
import PersonalHub from './components/PersonalHub';
import SystemFooter from './components/SystemFooter';
import Header from './components/Header';


function App() {
  const [shattered, setShattered] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [forceExpandAcademics, setForceExpandAcademics] = useState(false);
  const [certGlow, setCertGlow] = useState(0);

  useEffect(() => {
    if (!isBooting) return;

    const logs = [
      "Initializing Neural Weights...",
      "Booting Android Kernel...",
      "Compiling Web Assets...",
      "Securing Mainframe Node...",
      "Bypassing Security Protocols...",
      "Injecting Mercury Stylesheets...",
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowWelcome(true), 600);
        setTimeout(() => setIsBooting(false), 2500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isBooting]);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    // Make lenis globally accessible for Terminal navigation
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  const handleNavigate = (selector) => {
    if (window.lenis) {
      window.lenis.scrollTo(selector, { duration: 1.5 });
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-1000 ${(isBooting) ? 'bg-black crt overflow-hidden max-h-screen' : 'bg-dark-bg text-mercury-200'}`}>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isBooting ? (
          <motion.div
            key="boot-sequence"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 w-full min-h-screen flex items-center justify-center bg-black/90 pointer-events-auto"
          >
            <div className="border border-green-500/30 p-8 max-w-2xl w-full mx-4 bg-black/50 relative shadow-[0_0_30px_rgba(0,255,0,0.1)] overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-50 z-10"></div>

              <div className="font-mono text-green-500 text-sm md:text-base flex flex-col gap-2 min-h-[350px] relative z-20">
                {bootLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4"
                  >
                    <span className="opacity-50 text-xs mt-1">[{String((i + 1) * 0.42).padEnd(5, '0')}]</span>
                    <span>{log}</span>
                  </motion.div>
                ))}

                {showWelcome ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12 text-center text-2xl md:text-4xl font-bold tracking-widest text-green-400 border-y border-green-500/30 py-6"
                  >
                    WELCOME YOSOBANTA
                  </motion.div>
                ) : (
                  <div className="mt-2 flex gap-4">
                    <span className="opacity-50 text-xs mt-1">[{String((bootLogs.length + 1) * 0.42).padEnd(5, '0')}]</span>
                    <span className="animate-pulse">_</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.main
            key="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className={`w-full ${shattered ? 'pointer-events-none blur-sm' : ''}`}
          >
            <Header />
            <div id="home">
              <HeroSection onShatter={() => setShattered(true)} />
            </div>


            <TechArsenal />

            <div id="projects">
              <WorkCards />
            </div>


            <Platforms />

            <div id="area-of-work">
              <ProjectVault />
            </div>


            <Academics forceExpandAll={forceExpandAcademics} />

            <Certifications glowIntensity={certGlow} />

            <PersonalHub />



            <SystemFooter />
          </motion.main>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shattered && !isBooting && (
          <Terminal
            onClose={() => setShattered(false)}
            onNavigate={handleNavigate}
            onAcademicsExpand={() => {
              setForceExpandAcademics(true);
              setTimeout(() => setForceExpandAcademics(false), 3000);
            }}
            onVerify={() => {
              setCertGlow(3);
              setTimeout(() => setCertGlow(0), 4000);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
