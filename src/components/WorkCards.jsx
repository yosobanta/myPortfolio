import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Brain, Network, Smartphone, Database, Layers, GitMerge, FileCode2, Cpu, Scan } from 'lucide-react';

const projects = [
  {
    title: 'Machine Learning',
    description: 'PyTorch, TensorFlow, Scikit-learn, Neural Networks',
    year: '2025',
    role: 'AI Engineer',
    categoryType: 'ML',
    bgImage: '/bg_ml.png',
    subSkills: ["Computer Vision", "NLP", "Supervised", "Unsupervised"]
  },
  {
    title: 'Android App Development',
    description: 'Kotlin, Jetpack Compose, Firebase, UI/UX',
    year: '2024',
    role: 'Mobile Developer',
    categoryType: 'ANDROID',
    bgImage: '/bg_android.png',
    subSkills: ["Jetpack Compose", "XML Layouts", "Retrofit", "Room DB"]
  },
  {
    title: 'Full-Stack Web Development',
    description: 'React, Node.js, MongoDB, Next.js',
    year: '2024',
    role: 'Software Engineer',
    categoryType: 'WEB',
    bgImage: '/bg_web.png',
    subSkills: ["MERN Stack", "Database Architecture", "API Design", "Socket.io"]
  },
  {
    title: 'DSA',
    description: 'C++, Algorithms, Data Structures, Competitive Programming',
    year: '2023',
    role: 'Problem Solver',
    categoryType: 'DSA',
    bgImage: '/bg_dsa.png',
    subSkills: ["Dynamic Programming", "Graph Theory", "Greedy", "Recursion"]
  }
];

// Map specific sub-skills to rich graphics
const SkillIconGraphic = ({ skill }) => {
  const iconMap = {
    "Computer Vision": <Scan size={48} />,
    "NLP": <Brain size={48} />,
    "Supervised": <Network size={48} />,
    "Unsupervised": <Layers size={48} />,
    "Jetpack Compose": <Smartphone size={48} />,
    "XML Layouts": <FileCode2 size={48} />,
    "Retrofit": <Network size={48} />,
    "Room DB": <Database size={48} />,
    "MERN Stack": <Layers size={48} />,
    "Database Architecture": <Database size={48} />,
    "API Design": <Network size={48} />,
    "Socket.io": <Scan size={48} />,
    "Dynamic Programming": <Brain size={48} />,
    "Graph Theory": <Network size={48} />,
    "Greedy": <Cpu size={48} />,
    "Recursion": <GitMerge size={48} />
  };

  return iconMap[skill] || <Cpu size={48} />;
};

// const SkillLoop = ({ skills, categoryType, bgImage }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isInteracting, setIsInteracting] = useState(false);
//   const len = skills.length;

//   // Auto-scroll logic that pauses on interaction
//   React.useEffect(() => {
//     if (isInteracting) return;

//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % len);
//     }, 4000); // Auto-advance every 4 seconds

//     return () => clearInterval(interval);
//   }, [len, isInteracting]);

//   const handleDragStart = () => setIsInteracting(true);

//   const handleDragEnd = (e, info) => {
//     setIsInteracting(false);
//     const swipe = info.offset.y;
//     const velocity = info.velocity.y;

//     // Calculate how many items to move based on physical swipe velocity (momentum)
//     let moveBy = 0;
//     if (swipe < -30 || velocity < -500) {
//       moveBy = Math.ceil(Math.abs(velocity) / 800) || 1;
//       setActiveIndex((prev) => (prev + moveBy) % len);
//     } else if (swipe > 30 || velocity > 500) {
//       moveBy = Math.ceil(Math.abs(velocity) / 800) || 1;
//       // Handle JS modulo negative numbers correctly
//       setActiveIndex((prev) => (prev - moveBy + len * moveBy) % len);
//     }
//   };

//   const handleWheel = (e) => {
//     setIsInteracting(true);
//     // User requested inverted physical scrolling matching intuitive mapping:
//     // Scroll Up -> Cards move Up (activeIndex + 1)
//     if (e.deltaY < 0) setActiveIndex((prev) => (prev + 1) % len);
//     else if (e.deltaY > 0) setActiveIndex((prev) => (prev - 1 + len) % len);

//     // Resume auto-scroll after a short delay since wheel events don't have a clear "end"
//     setTimeout(() => setIsInteracting(false), 1000);
//   };

//   return (
//     <div 
//       className="absolute inset-0 overflow-hidden w-full h-full pointer-events-auto rounded-xl md:rounded-2xl bg-black"
//       onWheel={handleWheel}
//       onMouseEnter={() => setIsInteracting(true)}
//       onMouseLeave={() => setIsInteracting(false)}
//       style={{ perspective: "1200px" }}
//     >
//       <div className="relative w-full h-full flex items-center justify-center group" style={{ transformStyle: "preserve-3d" }}>

//         <AnimatePresence initial={false}>
//           {skills.map((skill, idx) => {
//             let offset = idx - activeIndex;
//             if (offset < -1) offset += len;
//             if (offset > 1) offset -= len;

//             const isCenter = offset === 0;
//             const isTop = offset === -1;
//             const isBottom = offset === 1;
//             const isHidden = !isCenter && !isTop && !isBottom;

//             // Geometry physics for the 3D Vertical Cylinder Drum Effect
//             const y = isCenter ? "0%" : (isTop ? "-100%" : (isBottom ? "100%" : (offset < 0 ? "-200%" : "200%")));
//             const rotateX = isCenter ? 0 : (isTop ? 60 : (isBottom ? -60 : (offset < 0 ? 90 : -90)));
//             const opacity = isCenter ? 1 : (isHidden ? 0 : 0.8);
//             const scale = isCenter ? 1 : 0.95;
//             const zIndex = isCenter ? 30 : 10;

//             const currentBg = (() => {
//               const fileMap = {
//                 "Computer Vision": "/subskills/computer_vision2.png",
//                 "NLP": "/subskills/NLP.webp",
//                 "Supervised": "/subskills/supervised_learning.png",
//                 "Dynamic Programming": "/subskills/DP.png",
//                 "Graph Theory": "/subskills/graph.jpg",
//                 "Greedy": "/subskills/greedy.png",
//                 "Recursion": "/subskills/trees.png",
//                 "Jetpack Compose": "/subskills/jetpack_compose.png",
//                 "XML Layouts": "/subskills/androidstudio.png",
//                 "Retrofit": "/subskills/android.png",
//                 "Room DB": "/subskills/kotlin.png",
//                 "MERN Stack": "/subskills/MERN.png",
//                 "Database Architecture": "/subskills/database.png",
//                 "API Design": "/subskills/postman.png"
//               };
//               return fileMap[skill] || bgImage;
//             })();

//             return (
//               <motion.div
//                 key={skill}
//                 initial={false}
//                 animate={{ y, rotateX, opacity, scale, zIndex, transformOrigin: "50% 50% -100px" }}
//                 transition={{ type: "spring", stiffness: 200, damping: 25 }}
//                 drag="y"
//                 dragConstraints={{ top: 0, bottom: 0 }}
//                 dragElastic={0.4}
//                 onDragStart={handleDragStart}
//                 onDragEnd={handleDragEnd}
//                 onClick={() => { if (!isCenter && !isHidden) setActiveIndex(idx); }}
//                 className={`absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing ${isHidden ? 'pointer-events-none' : ''}`}
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 {/* 100% Saturation Card Fill */}
//                 <div className={`w-full h-full flex flex-col items-center justify-center gap-6 relative overflow-hidden transition-all duration-700 bg-black`}>

//                   {/* Contained Background Image with Overlay */}
//                   {currentBg && (
//                     <div 
//                       className="absolute inset-0 z-0 pointer-events-none bg-contain bg-no-repeat bg-center"
//                       style={{ backgroundImage: `url(${currentBg})` }}
//                     >
//                       <div className={`absolute inset-0 transition-colors duration-700 ${isCenter ? 'bg-black/40' : 'bg-black/60'}`} />
//                     </div>
//                   )}

//                   {/* Central Glow / Bloom specifically for the active center card */}
//                   <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-10 ${isCenter ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(181,196,216,0.15)_0%,transparent_60%)]`} />

//                   {/* Graphic Design Implementation inside the sub-card */}
//                   <motion.div 
//                     className={`text-mercury-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-transform duration-500 z-20 ${isCenter ? 'scale-110' : 'scale-[0.85] opacity-60'}`}
//                   >
//                     <SkillIconGraphic skill={skill} />
//                   </motion.div>

//                   {/* High-contrast Typography */}
//                   <span className={`text-2xl md:text-4xl lg:text-5xl px-4 font-mono tracking-widest font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-mercury-600 text-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] z-20 transition-all duration-500 ${!isCenter && 'opacity-70 blur-[1px]'}`}>
//                     {skill}
//                   </span>

//                   {/* Subtle Border Overlay for Depth */}
//                   <div className={`absolute inset-0 pointer-events-none border transition-all duration-700 z-30 ${isCenter ? 'border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]' : 'border-white/5'}`} />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

const SkillLoop = ({ skills, categoryType, bgImage }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const wheelLock = useRef(false);
  const len = skills.length;

  // Auto scroll
  React.useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % len);
    }, 4000);

    return () => clearInterval(interval);
  }, [len, isInteracting]);

  // --- Drag interaction ---
  const handleDragStart = () => setIsInteracting(true);

  const handleDragEnd = (e, info) => {
    setIsInteracting(false);

    const swipePower = Math.abs(info.offset.y) * info.velocity.y;

    if (swipePower < -3000) {
      setActiveIndex((prev) => (prev + 1) % len);
    }
    else if (swipePower > 3000) {
      setActiveIndex((prev) => (prev - 1 + len) % len);
    }
  };

  // --- Wheel interaction (throttled) ---
  const handleWheel = (e) => {
    if (wheelLock.current) return;

    wheelLock.current = true;
    setIsInteracting(true);

    if (e.deltaY < 0) {
      setActiveIndex((prev) => (prev + 1) % len);
    } else {
      setActiveIndex((prev) => (prev - 1 + len) % len);
    }

    setTimeout(() => {
      wheelLock.current = false;
      setIsInteracting(false);
    }, 450);
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden w-full h-full pointer-events-auto rounded-xl md:rounded-2xl bg-black"
      onWheel={handleWheel}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatePresence initial={false}>
          {skills.map((skill, idx) => {
            let offset = idx - activeIndex;
            if (offset < -1) offset += len;
            if (offset > 1) offset -= len;

            const isCenter = offset === 0;
            const isTop = offset === -1;
            const isBottom = offset === 1;
            const isHidden = !isCenter && !isTop && !isBottom;

            const y = isCenter ? "0%" : (isTop ? "-100%" : (isBottom ? "100%" : (offset < 0 ? "-200%" : "200%")));
            const rotateX = isCenter ? 0 : (isTop ? 60 : (isBottom ? -60 : (offset < 0 ? 90 : -90)));
            const opacity = isCenter ? 1 : (isHidden ? 0 : 0.8);
            const scale = isCenter ? 1 : 0.95;
            const zIndex = isCenter ? 30 : 10;

            return (
              <motion.div
                key={skill}
                initial={false}
                animate={{
                  y,
                  rotateX,
                  opacity,
                  scale,
                  zIndex,
                  transformOrigin: "50% 50% -100px"
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                  mass: 0.9
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.25}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isCenter && !isHidden) setActiveIndex(idx);
                }}
                className={`absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing ${isHidden ? 'pointer-events-none' : ''}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card content remains unchanged */}
                {(() => {
                  const fileMap = {
                    "Computer Vision": "/subskills/computer_vision2.png",
                    "NLP": "/subskills/NLP.webp",
                    "Supervised": "/subskills/supervised_learning.png",
                    "Dynamic Programming": "/subskills/DP.png",
                    "Graph Theory": "/subskills/graph.jpg",
                    "Greedy": "/subskills/greedy.png",
                    "Recursion": "/subskills/trees.png",
                    "Jetpack Compose": "/subskills/jetpack_compose.png",
                    "XML Layouts": "/subskills/androidstudio.png",
                    "Retrofit": "/subskills/android.png",
                    "Room DB": "/subskills/kotlin.png",
                    "MERN Stack": "/subskills/MERN.png",
                    "Database Architecture": "/subskills/database.png",
                    "API Design": "/subskills/postman.png"
                  };

                  const currentBg = fileMap[skill] || bgImage;

                  return (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-6 relative overflow-hidden transition-all duration-700 bg-black">

                      {/* Background */}
                      <div
                        className="absolute inset-0 z-0 pointer-events-none bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${currentBg})` }}
                      >
                        <div className={`absolute inset-0 transition-colors duration-700 ${isCenter ? 'bg-black/40' : 'bg-black/60'}`} />
                      </div>

                      {/* Glow */}
                      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-10 ${isCenter ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(181,196,216,0.15)_0%,transparent_60%)]`} />

                      {/* Icon */}
                      <motion.div
                        className={`text-mercury-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-transform duration-500 z-20 ${isCenter ? 'scale-110' : 'scale-[0.85] opacity-60'}`}
                      >
                        <SkillIconGraphic skill={skill} />
                      </motion.div>

                      {/* Skill name */}
                      <span className={`text-2xl md:text-4xl lg:text-5xl px-4 font-mono tracking-widest font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-mercury-600 text-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] z-20 transition-all duration-500 ${!isCenter && 'opacity-70 blur-[1px]'}`}>
                        {skill}
                      </span>

                      {/* Border */}
                      <div className={`absolute inset-0 pointer-events-none border transition-all duration-700 z-30 ${isCenter ? 'border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]' : 'border-white/5'}`} />

                    </div>
                  );
                })()}

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

const WorkCard = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  // Use a lerp factor (spring) to smooth the parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Normalize transform speed so they don't disconnect visually
  const yImage = useTransform(smoothProgress, [0, 1], [30, -30]);
  const yText = useTransform(smoothProgress, [0, 1], [-15, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Alternating Sequence: Right-Left-Right-Left for the Placard (Image).
  // Index 0: Placard on Right -> flex-row-reverse
  // Index 1: Placard on Left -> flex-row
  const isRightPlacard = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col ${isRightPlacard ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 w-full min-h-[80vh] py-20`}
    >
      <motion.div
        style={{ y: yImage }}
        className="w-full md:w-1/2 aspect-[4/3] glass-panel rounded-2xl overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-mercury-600/20 to-dark-bg/80 mix-blend-overlay z-10 pointer-events-none" />
        <div className={`w-full h-full bg-gradient-to-${isRightPlacard ? 'tr' : 'bl'} from-mercury-900/60 via-[#0a0a0a]/80 to-black group-hover:scale-105 transition-transform duration-1000 ease-in-out flex flex-col items-center justify-center relative overflow-hidden`} >

          {/* Infinitely Sliding Full-Sized Sub-cards */}
          <SkillLoop skills={project.subSkills} bgImage={project.bgImage} />
        </div>

        {/* Remove year stamp based on user request */}
      </motion.div>

      <motion.div
        style={{ y: yText }}
        className={`w-full md:w-1/2 flex flex-col justify-center ${isRightPlacard ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}
      >
        <div className={`flex items-center gap-4 mb-6 ${isRightPlacard ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-mercury-500 font-mono text-sm">0{index + 1}</span>
          <div className="h-[1px] w-12 bg-mercury-700" />
          <span className="text-mercury-400 text-xs uppercase tracking-widest">{project.role}</span>
        </div>

        <h3 className="text-4xl md:text-6xl font-bold mb-6 text-mercury-100 tracking-tight">
          {project.title}
        </h3>

        <p className="text-xl text-mercury-400 font-light leading-relaxed max-w-lg mb-10">
          {project.description}
        </p>

        {/* <button className={`interactable ${isRightPlacard ? 'self-end' : 'self-start'} py-3 text-mercury-100 border-b border-mercury-600 hover:border-mercury-100 transition-colors uppercase tracking-widest text-sm font-medium flex items-center gap-2 group`}>
          {isRightPlacard ? (
            <><span className="group-hover:-translate-x-2 transition-transform duration-300">←</span>since 2025</>
          ) : (
            <>View Details <span className="group-hover:translate-x-2 transition-transform duration-300">→</span></>
          )}
        </button> */}
      </motion.div>
    </motion.div>
  );
};

export default function WorkCards() {
  return (
    <section className="w-full py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
      <div className="mb-24">
        <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.3em] mb-4">Core Competencies</h2>
        <h3 className="text-5xl md:text-7xl font-bold text-mercury-200">Technical <br /><span className="text-mercury-600 font-light">Arsenal.</span></h3>
      </div>

      <div className="flex flex-col gap-12">
        {projects.map((project, idx) => (
          <WorkCard key={idx} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
