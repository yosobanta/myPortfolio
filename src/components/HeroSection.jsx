import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls } from '@react-three/drei';
import CVButton from './CVButton';
import resumePdf from '../assets/cv3.pdf';

const MercuryBlob = () => {
  return (
    <PresentationControls
      global
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 1500 }}
      rotation={[0, 0.3, 0]}
      polar={[-Math.PI / 3, Math.PI / 3]}
      azimuth={[-Math.PI / 1.4, Math.PI / 2]}
    >
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshPhysicalMaterial
            color="#e0e0e0"
            metalness={1}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>
    </PresentationControls>
  );
};

export default function HeroSection({ onShatter }) {
  const userEmail = import.meta.env.VITE_USER_EMAIL || "mahapatrayosobanta6@gmail.com";
  
  const socials = [
    { icon: <Github size={20} />, href: "https://github.com/yosobanta" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/yoso/" },
    { icon: <Mail size={20} />, href: `mailto:${userEmail}` },
  ];

  const yosobantaText = "YOSOBANTA";

  // 3D Tilt Effect Logic
  const boundingRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col pt-24 px-6 md:px-12 lg:px-24">
      {/* 3D Canvas Background Element - placed behind text */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40 md:opacity-80 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#B5C4D8" />
          <MercuryBlob />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full flex-grow pb-12 gap-12 pt-16">

        {/* LEFT COLUMN: Avatar & Socials (approx 30%) */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-12 z-20">
          <motion.div
            ref={boundingRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-mercury-600/20 to-dark-bg/80 border border-mercury-800/50 shadow-2xl relative overflow-hidden group cursor-pointer"
          >
            {/* Inner frame parallax */}
            <motion.div
              style={{ translateZ: "50px" }}
              className="absolute inset-4 rounded-xl border border-mercury-500/30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              {/* Glassmorphic Avatar Icon */}
              <motion.div 
                className="w-full h-full flex items-end justify-center relative overflow-hidden rounded-xl"
                initial={{ opacity: 0.35, scale: 1 }}
                whileHover={{ opacity: 0.55, scale: 1.03 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Soft ambient backlight behind avatar */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-mercury-200/10 rounded-full blur-2xl group-hover:bg-mercury-200/20 transition-all duration-700" />
                
                <svg viewBox="0 0 24 24" className="w-[65%] h-[65%] mb-[-5%] overflow-visible relative z-10" style={{ filter: 'drop-shadow(0 -4px 12px rgba(255,255,255,0.05)) blur(0.3px)' }}>
                  <defs>
                    <linearGradient id="avatarGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                      <stop offset="30%" stopColor="#e5e7eb" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="8" r="4.8" fill="url(#avatarGlass)" />
                  <path d="M4.5 24C4.5 18 7.5 14.5 12 14.5C16.5 14.5 19.5 18 19.5 24" fill="url(#avatarGlass)" />
                </svg>
              </motion.div>
            </motion.div>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>

          {/* Social Icons with Staggered Bobbing */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="flex gap-6 z-20"
          >
            {socials.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                animate={{
                  y: [0, -8, 0],
                  transition: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.2
                  }
                }}
                className="interactable text-mercury-500 hover:text-mercury-100 hover:scale-110 transition-colors transform duration-300 p-3 glass-panel rounded-full relative"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Typography & Main CTA */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center md:items-start"
          >
            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full border border-mercury-600/50 text-mercury-400 text-xs font-mono mb-8 uppercase tracking-widest"
            >
              System Status: Online
            </motion.div> */}

            <h1 className="flex flex-col mb-8 pointer-events-none md:-ml-2 text-center md:text-left w-full overflow-hidden pt-4 pb-12 -mt-4">
              <span className="text-3xl md:text-4xl lg:text-5xl font-light text-mercury-400 mb-2 font-mono italic">
                Hi from
              </span>
              <div className="flex justify-center md:justify-start overflow-visible pt-2 pb-6 w-full">
                {yosobantaText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    animate={{
                      y: [0, -18, 0],
                      rotate: [0, Math.random() > 0.5 ? -4 : 4, 0]
                    }}
                    transition={{
                      duration: 3 + (char === 'O' ? 0.5 : 0),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                    whileHover={{
                      y: -30,
                      scale: 1.1,
                      color: "#ffffff",
                      transition: { type: "spring", stiffness: 300, damping: 10 }
                    }}
                    className="text-[clamp(4rem,10vw,9rem)] font-bold tracking-tighter text-gradient-mercury leading-[0.8] origin-bottom inline-block cursor-default select-none pointer-events-auto"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>

            <p className="text-2xl md:text-4xl text-mercury-300 max-w-2xl leading-relaxed text-center md:text-left mb-12 relative z-20" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: '400' }}>
              Curious about how things work, stubborn enough to build them myself.
            </p>

            <div className="flex flex-col md:flex-row items-stretch justify-center md:justify-start w-full gap-4 max-w-[540px]">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                onClick={onShatter}
                className="interactable relative flex items-center justify-center group glass-panel px-6 py-4 rounded-full text-mercury-100 font-medium tracking-wide uppercase text-sm transition-all duration-300 mercury-glow z-30 overflow-hidden w-full md:flex-1 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-transparent"
              >
                <span className="relative z-10 transition-colors group-hover:text-red-100">Enter Terminal Mode</span>
                <div className="absolute inset-0 w-full h-full bg-red-500/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </motion.button>

              <div className="flex w-full md:w-auto mt-4 md:mt-0">
                <CVButton resumeUrl={resumePdf} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
