import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Brain, Network, Smartphone, Database, Layers, Cpu, FileCode2, Scan, GitMerge, Globe, Server, Monitor, Cog, Lock, AlignEndVertical, AppWindow } from 'lucide-react';
import { SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiJsonwebtokens, SiPython, SiScikitlearn, SiPandas, SiNumpy, SiJupyter, SiLinux, SiGreensock, SiFramer, SiJavascript, SiVite, SiCplusplus, SiFirebase, SiDocker, SiNextdotjs, SiRedis, SiTensorflow, SiPytorch, SiFastapi, SiGraphql, SiSocketdotio, SiOpencv, SiKotlin, SiKotlin as SiKotlin2 } from 'react-icons/si';

// Map tech names to icons and their brand colors
const techIconMap = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express.js": { icon: SiExpress, color: "#FFFFFF" },
  "Express": { icon: SiExpress, color: "#FFFFFF" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "JWT": { icon: SiJsonwebtokens, color: "#FFFFFF" },
  "REST APIs": { icon: Network, color: "#A3A3A3" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "Scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
  "Pandas": { icon: SiPandas, color: "#E8EAF6" },
  "NumPy": { icon: SiNumpy, color: "#4D77CF" },
  "Matplotlib": { icon: FileCode2, color: "#11557C" },
  "Jupyter Notebook": { icon: SiJupyter, color: "#F37626" },
  "OS": { icon: Monitor, color: "#A3A3A3" },
  "Mutex": { icon: Lock, color: "#A3A3A3" },
  "Semaphores": { icon: AlignEndVertical, color: "#A3A3A3" },
  "Tkinter": { icon: AppWindow, color: "#A3A3A3" },
  "Concurrency": { icon: Network, color: "#A3A3A3" },
  "GSAP": { icon: SiGreensock, color: "#88CE02" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "Vite": { icon: SiVite, color: "#646CFF" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  "PyTorch": { icon: SiPytorch, color: "#EE4C2C" },
  "TensorFlow": { icon: SiTensorflow, color: "#FF6F00" },
  "FastAPI": { icon: SiFastapi, color: "#009688" },
  "YOLOv8": { icon: Scan, color: "#00FFFF" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  "Docker": { icon: SiDocker, color: "#2496ED" },
  "Redis": { icon: SiRedis, color: "#DC382D" },
  "D3.js": { icon: Network, color: "#F9A03C" },
  "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
  "Kotlin": { icon: SiKotlin, color: "#7F52FF" },
  "Firebase": { icon: SiFirebase, color: "#FFCA28" },
  "OpenCV": { icon: SiOpencv, color: "#5C3EE8" },
  "GraphQL": { icon: SiGraphql, color: "#E10098" },
  "Socket.io": { icon: SiSocketdotio, color: "#FFFFFF" },
  "Linux": { icon: SiLinux, color: "#FCC624" },
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

function ContextSection({ project, themeColor }) {
  const [showVideo, setShowVideo] = useState(!!project.video);
  const videoRef = useRef(null);

  if (!project.video) {
    return <p className="text-mercury-300 text-sm leading-snug font-light">{project.sections.context}</p>;
  }

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {showVideo ? (
          <motion.div
            key="video-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="w-full rounded-xl overflow-hidden border border-mercury-800/40 bg-black"
          >
            <motion.video
              ref={videoRef}
              src={project.video}
              autoPlay
              muted
              playsInline
              onEnded={() => setShowVideo(false)}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '400px' }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="text-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col"
          >
            <p className="text-mercury-300 text-sm leading-snug font-light">
              {project.sections.context}
            </p>
            <div className="flex justify-end mt-6">
              <motion.button
                onClick={() => setShowVideo(true)}
                whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${themeColor}40`, color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                className="text-[10px] uppercase font-mono tracking-widest px-4 py-2 rounded-lg border border-mercury-800/50 hover:border-mercury-600 transition-all flex items-center gap-2 bg-mercury-900/40"
                style={{ color: themeColor }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                </svg>
                Replay Demo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const highlightText = (text, themeColor) => {
  if (typeof text !== 'string') return text;
  
  const keywords = ['role-based auth', 'OTP', 'AI insights', 'clustering algorithms', 'heuristic optimization', 'POSIX threads', 'synchronization primitives', 'motion libraries', 'scroll-driven animations', 'real time', 'real-time', 'MERN stack', 'machine learning', 'JWT'];
  const regex = new RegExp(`(${keywords.map(k => k.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
  
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (keywords.some(k => k.toLowerCase() === part.toLowerCase())) {
      return (
        <span 
          key={i}
          className="font-mono text-[10px] sm:text-[11px] px-1 py-0.5 mx-0.5 rounded transition-all duration-300 inline-block align-baseline"
          style={{ 
            color: themeColor, 
            backgroundColor: `${themeColor}15`, 
            border: `1px solid ${themeColor}40` 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 10px ${themeColor}60`;
            e.currentTarget.style.backgroundColor = `${themeColor}25`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.backgroundColor = `${themeColor}15`;
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

function ArchitectureSection({ project, themeColor }) {
  const titleUpper = project.title.toUpperCase();
  let nodes = [];

  if (titleUpper.includes("LAST-MILE")) {
    nodes = [
      { id: 'ord', label: 'Orders', tooltip: 'Incoming delivery requests' },
      { id: 'clus', label: 'Clustering', tooltip: 'K-Means grouping' },
      { id: 'opt', label: 'Route Optimization', tooltip: 'TSP algorithms' },
      { id: 'eta', label: 'ETA Prediction', tooltip: 'Traffic & time variables' },
      { id: 'disp', label: 'Dispatch', tooltip: 'Agent assignment' },
    ];
  } else if (titleUpper.includes("MULTI-THREADED")) {
    nodes = [
      { id: 'task', label: 'Task Queue', tooltip: 'Incoming processes' },
      { id: 'sched', label: 'Scheduler', tooltip: 'Thread assignment' },
      { id: 'exec', label: 'Execution', tooltip: 'Parallel processing' },
      { id: 'sync', label: 'Sync / Mutex', tooltip: 'Resource locking' },
      { id: 'done', label: 'Completion', tooltip: 'Thread joined' },
    ];
  } else {
    // Default / Web App flow
    nodes = [
      { id: 'user', label: 'User', tooltip: 'Client requests' },
      { id: 'front', label: 'Frontend', tooltip: 'React UI' },
      { id: 'api', label: 'API', tooltip: 'Routing & Security' },
      { id: 'db', label: 'Database', tooltip: 'Storage' },
      { id: 'ai', label: 'AI Engine', tooltip: 'Calculations' },
    ];
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full py-6 md:py-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 border border-mercury-800/30 rounded-xl bg-mercury-900/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        {nodes.map((n, i) => (
          <React.Fragment key={n.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
              className="relative group cursor-default z-10"
            >
              <div
                className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-mercury-800/60 bg-mercury-900/40 backdrop-blur-md flex items-center justify-center text-[10px] sm:text-xs font-mono text-mercury-300 transition-all duration-300 group-hover:bg-mercury-800/60 group-hover:-translate-y-1"
                style={{ '--tw-shadow-color': `${themeColor}00` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 20px ${themeColor}40`;
                  e.currentTarget.style.borderColor = `${themeColor}80`;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgb(163, 163, 163)';
                }}
              >
                {n.label}
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-mercury-900 border border-mercury-700 px-2 py-1 rounded text-[9px] w-max z-20 text-mercury-200 shadow-xl translate-y-2 group-hover:translate-y-0">
                {n.tooltip}
              </div>
            </motion.div>
            
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
                className="text-mercury-700 hidden sm:block z-10"
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path 
                    d="M0 6H22M22 6L16 1M22 6L16 11" 
                    stroke="currentColor" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                  />
                </svg>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="text-mercury-400 text-sm leading-relaxed font-light opacity-80 transition-opacity hover:opacity-100">
        {highlightText(project.sections.architecture, themeColor)}
      </p>
    </div>
  );
}

function SpecializationSection({ project, themeColor }) {
  const titleUpper = project.title.toUpperCase();
  let features = [];
  
  if (titleUpper.includes("MEDIVAULT")) {
    features = [
      { id: 'otp', title: 'OTP Sharing', desc: 'Time-limited access blocks for documents.', isInteractive: true },
      { id: 'ai', title: 'AI Health Score', desc: 'Predictive modeling on medical context.' },
      { id: 'sec', title: 'Secure Access', desc: 'Role-based hierarchical viewing.' },
      { id: 'vis', title: 'Insights Visualization', desc: 'Chart-based trend tracking.' }
    ];
  } else if (titleUpper.includes("LAST-MILE")) {
    features = [
      { id: 'opt', title: 'Dynamic Planners', desc: 'Recalculating mid-delivery routes.', isInteractive: true },
      { id: 'clust', title: 'K-Means Clusters', desc: 'Geographic order batching.' },
      { id: 'heur', title: 'TSP Heuristics', desc: 'Minimizing travel graphs.' },
      { id: 'sim', title: 'Live Simulation', desc: 'Real-time traffic adaptation.' }
    ];
  } else if (titleUpper.includes("MULTI-THREADED")) {
    features = [
      { id: 'sched', title: 'Thread Scheduler', desc: 'Visual timeline of thread lifecycles.', isInteractive: true },
      { id: 'race', title: 'Contention', desc: 'Simulated race conditions.' },
      { id: 'lock', title: 'Mutex Locks', desc: 'Real-time state tracking of semaphores.' },
      { id: 'dead', title: 'Deadlock Checks', desc: 'Circular wait prevention.' }
    ];
  } else {
    features = [
      { id: 'boot', title: 'Boot Sequence', desc: 'OS-style cinematic startup.', isInteractive: true },
      { id: 'scroll', title: 'Motion Scroll', desc: 'Weighted momentum on scroll events.' },
      { id: 'ui', title: 'Modular UI', desc: 'Lightweight component system.' },
      { id: 'load', title: 'Dynamic Loading', desc: 'Seamless SPA transitions.' }
    ];
  }

  const [interactiveState, setInteractiveState] = useState({});

  const handleInteractiveClick = (id) => {
    if (interactiveState[id]) return;
    setInteractiveState(prev => ({ ...prev, [id]: 1 }));
    setTimeout(() => {
      setInteractiveState(prev => ({ ...prev, [id]: 2 }));
      setTimeout(() => setInteractiveState(prev => ({ ...prev, [id]: 0 })), 4000);
    }, 600);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <p className="text-mercury-400 text-sm leading-relaxed font-light opacity-80 hover:opacity-100 transition-opacity">
        {project.sections.specialization}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {features.map((feat, i) => (
          <motion.div
            key={feat.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: i * 0.1 + 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -2, boxShadow: `0 8px 24px -10px ${themeColor}50` }}
            className="p-4 rounded-xl border border-mercury-800/40 bg-mercury-900/20 backdrop-blur-sm flex flex-col gap-2 relative overflow-hidden group transition-all duration-300 min-h-[90px]"
          >
            <div className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: themeColor }} />
            
            <h6 className="text-[11px] font-mono text-mercury-200 uppercase tracking-widest">{feat.title}</h6>
            <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500">
               <p className="text-xs text-mercury-500 font-light mt-1">
                 {feat.desc}
               </p>
            </div>

            {feat.isInteractive && (
              <div className="mt-2 pt-2 border-t border-mercury-800/30">
                {!interactiveState[feat.id] && (
                  <button 
                    onClick={() => handleInteractiveClick(feat.id)}
                    className="text-[9px] uppercase tracking-widest px-3 py-1.5 mt-1 rounded border border-mercury-700/50 text-mercury-400 hover:text-white hover:border-mercury-500 transition-colors bg-mercury-900/40"
                  >
                    {titleUpper.includes("MEDIVAULT") ? "Generate Access" : "Execute Module"}
                  </button>
                )}
                {interactiveState[feat.id] === 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-[9px] uppercase font-mono text-amber-500 mt-1 py-1.5 flex items-center gap-2"
                  >
                    <Cog size={12} className="animate-spin" /> Processing...
                  </motion.div>
                )}
                {interactiveState[feat.id] === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[10px] font-mono mt-1 py-1 px-2.5 rounded border inline-flex items-center gap-2 animate-pulse"
                    style={{ backgroundColor: `${themeColor}15`, borderColor: `${themeColor}40`, color: themeColor, textShadow: `0 0 8px ${themeColor}80` }}
                  >
                    {titleUpper.includes("MEDIVAULT") ? (
                      `OTP: ${Math.floor(100000 + Math.random() * 900000)}`
                    ) : (
                      "OK: ACTIVE"
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function CommandCenterProject({ project, index }) {
  const containerRef = useRef(null);
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState(sectionKeys[0]);

  // Scroll progress for this project block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
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
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: themeColor }}>
                Context — The Problem
              </h5>
              <ContextSection project={project} themeColor={themeColor} />
            </div>
          </div>

          {/* ── ARCHITECTURE (Solution) ── */}
          <div ref={(el) => (sectionRefs.current.architecture = el)} className="scroll-mt-24">
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: themeColor }}>
                Architecture — The Solution
              </h5>
              <ArchitectureSection project={project} themeColor={themeColor} />
            </div>
          </div>

          {/* ── SPECIALIZATION (Uniqueness) ── */}
          <div ref={(el) => (sectionRefs.current.specialization = el)} className="scroll-mt-24">
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: themeColor }}>
                Specialization — What Makes It Unique
              </h5>
              <SpecializationSection project={project} themeColor={themeColor} />
            </div>
          </div>

          {/* ── STACK (Technologies) ── */}
          <div ref={(el) => (sectionRefs.current.stack = el)} className="scroll-mt-24">
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: themeColor }}>
                Stack — Technologies
              </h5>
              <div className="flex flex-wrap gap-6">
                {project.sections.stack.map((tech, i) => {
                  const techData = techIconMap[tech] || { icon: Cpu, color: '#A3A3A3' };
                  const IconComponent = techData.icon;
                  const iconColor = techData.color;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.15, y: -4 }}
                      className="flex flex-col items-center gap-2 group cursor-default"
                    >
                      <div
                        className="w-16 h-16 rounded-full border border-mercury-700/50 flex items-center justify-center bg-mercury-900/40 backdrop-blur-sm group-hover:border-mercury-400/60 transition-all duration-300 relative overflow-hidden"
                        style={{ boxShadow: `0 0 0px transparent` }}
                        onMouseEnter={(e) => { 
                          e.currentTarget.style.boxShadow = `0 0 20px ${iconColor}40`;
                          e.currentTarget.style.borderColor = `${iconColor}80`;
                        }}
                        onMouseLeave={(e) => { 
                          e.currentTarget.style.boxShadow = `0 0 0px transparent`;
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        }}
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: iconColor }} />
                        <IconComponent size={28} color={iconColor} className="transition-transform group-hover:scale-110 duration-300 z-10" />
                      </div>
                      <span 
                        className="text-[11px] font-mono text-mercury-500 group-hover:text-mercury-200 transition-colors tracking-wider flex items-center gap-1.5"
                      >
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
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-mercury-800/40 hover:border-mercury-600/40 transition-colors duration-500">
              <h5 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: themeColor }}>
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
