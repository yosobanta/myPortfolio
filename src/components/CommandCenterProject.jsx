import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Brain, Network, Smartphone, Database, Layers, Cpu, FileCode2, Scan, GitMerge, Globe, Server, Monitor, Cog } from 'lucide-react';

// Map tech names to icons
const techIconMap = {
  "PyTorch": Brain,
  "TensorFlow": Brain,
  "Python": FileCode2,
  "FastAPI": Server,
  "YOLOv8": Scan,
  "React": Layers,
  "Node.js": Server,
  "MongoDB": Database,
  "Next.js": Globe,
  "Docker": Cpu,
  "Redis": Database,
  "D3.js": Network,
  "Tailwind": FileCode2,
  "Framer Motion": Cog,
  "Kotlin": Smartphone,
  "Firebase": Database,
  "C++": FileCode2,
  "OpenCV": Scan,
  "Scikit-learn": Brain,
  "Express": Server,
  "GraphQL": Network,
  "Socket.io": Globe,
  "Linux": Monitor,
};

const sectionKeys = ['context', 'architecture', 'specialization', 'stack', 'metrics'];
const sectionLabels = {
  context: 'Context',
  architecture: 'Architecture',
  specialization: 'Specialization',
  stack: 'Stack',
  metrics: 'Metrics',
};

// Neural Pulse animation for active nav item
const pulseVariants = {
  active: {
    opacity: [0.4, 1, 0.4],
    textShadow: [
      "0 0 4px rgba(255,255,255,0.1)",
      "0 0 20px rgba(255,255,255,0.6)",
      "0 0 4px rgba(255,255,255,0.1)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  inactive: {
    opacity: 0.4,
    textShadow: "0 0 0px rgba(255,255,255,0)",
    transition: { duration: 0.4 }
  }
};

export default function CommandCenterProject({ project, index }) {
  const containerRef = useRef(null);
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState(sectionKeys[0]);

  // Scroll progress for this project block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers = [];
    sectionKeys.forEach((key) => {
      const el = sectionRefs.current[key];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(key);
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (key) => {
    const el = sectionRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const themeColor = project.themeColor || '#b5c4d8';
  const hasLive = project.liveUrl && project.liveUrl !== '#';
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="w-full mb-32 relative"
    >
      {/* ─── FULL-WIDTH PROJECT HEADER ─── */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-mercury-800/40">
        <div className="flex items-center gap-5">
          <span className="text-mercury-600 font-mono text-sm opacity-50">0{index + 1}</span>
          <div>
            <h4 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-mercury-100">
              {project.title}
            </h4>
            {project.type && (
              <span
                className="text-xs font-mono uppercase tracking-[0.2em] mt-1 inline-block px-3 py-1 rounded-full border"
                style={{ color: themeColor, borderColor: `${themeColor}40` }}
              >
                {project.type}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {project.liveUrl && (
            <motion.a
              href={hasLive ? project.liveUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={hasLive ? {
                scale: 1.05,
                boxShadow: `0 0 20px ${themeColor}50, inset 0 0 20px ${themeColor}10`
              } : {}}
              whileTap={hasLive ? { scale: 0.95 } : {}}
              className={`interactable glass-panel px-6 py-3 rounded-xl text-mercury-200 font-mono text-sm uppercase tracking-widest flex items-center gap-3 border transition-all duration-300
  ${hasLive
                  ? "border-mercury-700/50 hover:border-mercury-400/80 cursor-pointer"
                  : "border-mercury-800/40 opacity-40 cursor-not-allowed pointer-events-none"
                }`}
            >
              <ExternalLink size={16} />
              {hasLive ? "Live Demo" : "Preview Soon"}
            </motion.a>
          )}
          {project.sourceUrl && (
            <motion.a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 20px ${themeColor}50, inset 0 0 20px ${themeColor}10`
              }}
              whileTap={{ scale: 0.95 }}
              className="interactable glass-panel px-6 py-3 rounded-xl text-mercury-200 font-mono text-sm uppercase tracking-widest flex items-center gap-3 border border-mercury-700/50 hover:border-mercury-400/80 transition-all duration-300"
            >
              <Github size={16} /> Source Code
            </motion.a>
          )}
        </div>
      </div>

      {/* ─── DUAL-PANE LAYOUT ─── */}
      <div className="flex flex-col md:flex-row w-full relative min-h-[500px]">

        {/* LEFT: 25% Sticky Vertical Navbar */}
        <div className="md:w-1/4 w-full md:sticky md:top-24 md:self-start pr-6 md:pr-0 mb-8 md:mb-0">
          <nav className="flex md:flex-col gap-3 md:gap-6">
            {sectionKeys.map((key) => {
              const isActive = activeSection === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  variants={pulseVariants}
                  animate={isActive ? 'active' : 'inactive'}
                  className={`interactable text-left font-mono text-sm uppercase tracking-widest transition-colors duration-300 relative whitespace-nowrap ${isActive ? 'text-mercury-100' : 'text-mercury-600 hover:text-mercury-400'
                    }`}
                >
                  <span className="flex items-center gap-3">
                    {/* Active dot indicator */}
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'scale-100' : 'scale-0'
                        }`}
                      style={{ backgroundColor: isActive ? themeColor : 'transparent' }}
                    />
                    {sectionLabels[key]}
                  </span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* CENTER: 2px Vertical Progress Bar */}
        <div className="hidden md:block w-[2px] mx-6 relative bg-mercury-800/30 rounded-full self-stretch">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full origin-top"
            style={{
              scaleY: scaleY,
              backgroundColor: themeColor,
              boxShadow: `0 0 12px ${themeColor}, 0 0 30px ${themeColor}60`,
              height: '100%',
            }}
          />
        </div>

        {/* RIGHT: 75% Content Sections */}
        <div className="md:w-3/4 w-full flex flex-col gap-16 pl-0 md:pl-6">

          {/* ── CONTEXT (Problem) ── */}
          <div ref={(el) => (sectionRefs.current.context = el)} className="scroll-mt-24">
            <div className="glass-panel rounded-2xl p-8 md:p-10 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: themeColor }}>
                Context — The Problem
              </h5>
              <p className="text-mercury-300 text-lg leading-relaxed font-light">
                {project.sections.context}
              </p>
            </div>
          </div>

          {/* ── ARCHITECTURE (Solution) ── */}
          <div ref={(el) => (sectionRefs.current.architecture = el)} className="scroll-mt-24">
            <div className="glass-panel rounded-2xl p-8 md:p-10 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-2" style={{ color: themeColor }}>
                Architecture — The Solution
              </h5>
              {project.projectCategory && (
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-mercury-700/50 text-mercury-500 mb-6">
                  {project.projectCategory}
                </span>
              )}
              <p className="text-mercury-300 text-lg leading-relaxed font-light">
                {project.sections.architecture}
              </p>
            </div>
          </div>

          {/* ── SPECIALIZATION (Uniqueness) ── */}
          <div ref={(el) => (sectionRefs.current.specialization = el)} className="scroll-mt-24">
            <div className="glass-panel rounded-2xl p-8 md:p-10 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: themeColor }}>
                Specialization — What Makes It Unique
              </h5>
              <p className="text-mercury-300 text-lg leading-relaxed font-light">
                {project.sections.specialization}
              </p>
            </div>
          </div>

          {/* ── STACK (Technologies) ── */}
          <div ref={(el) => (sectionRefs.current.stack = el)} className="scroll-mt-24">
            <div className="glass-panel rounded-2xl p-8 md:p-10 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-8" style={{ color: themeColor }}>
                Stack — Technologies
              </h5>
              <div className="flex flex-wrap gap-6">
                {project.sections.stack.map((tech, i) => {
                  const IconComponent = techIconMap[tech] || Cpu;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.15, y: -4 }}
                      className="flex flex-col items-center gap-2 group cursor-default"
                    >
                      <div
                        className="p-4 rounded-xl border border-mercury-700/50 bg-mercury-900/40 backdrop-blur-sm group-hover:border-mercury-400/60 transition-all duration-300"
                        style={{ boxShadow: `0 0 0px transparent` }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${themeColor}40`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0px transparent`; }}
                      >
                        <IconComponent size={32} className="text-mercury-300 group-hover:text-mercury-100 transition-colors" />
                      </div>
                      <span className="text-[11px] font-mono text-mercury-500 group-hover:text-mercury-300 transition-colors tracking-wider">
                        {tech}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── METRICS (Impact/Results) ── */}
          <div ref={(el) => (sectionRefs.current.metrics = el)} className="scroll-mt-24">
            <div className="glass-panel rounded-2xl p-8 md:p-10 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-8" style={{ color: themeColor }}>
                Metrics — Impact & Results
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {project.sections.metrics.map((metric, i) => (
                  <div key={i} className="text-center p-4">
                    <p className="text-3xl md:text-4xl font-black text-mercury-100 mb-2" style={{ textShadow: `0 0 20px ${themeColor}30` }}>
                      {metric.value}
                    </p>
                    <p className="text-xs font-mono text-mercury-500 uppercase tracking-widest">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
