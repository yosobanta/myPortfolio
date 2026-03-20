import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  
  SiCplusplus, SiC, SiKotlin, SiPython, SiReact, SiNodedotjs,
  SiTailwindcss, SiDocker, SiKubernetes, SiMongodb, SiFirebase, SiNextdotjs,
  SiJavascript, SiTypescript, SiGo, SiRender, SiSpring, SiPostgresql, SiRedis, SiMui, SiGraphql,
  SiFigma, SiGithub, SiLinux, SiGit
} from "react-icons/si";
import { FaJava, FaAws, FaHtml5 } from "react-icons/fa";

import { IoLogoVercel } from "react-icons/io5";

const categories = [
  {
    title: "Languages",
    skills: [
      { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
      { name: "Java", icon: <FaJava />, color: "#f89820" },
      { name: "Kotlin", icon: <SiKotlin />, color: "#7F52FF" },
      { name: "JS", icon: <SiJavascript />, color: "#F7DF1E" },
      { name: "C", icon: <SiC />, color: "#A8B9CC" },
      { name: "Bash", icon: <SiLinux />, color: "#FCC624" },
      { name: "SQL", icon: <SiPostgresql />, color: "#336791" }
    ] // 10 icons: Pyramid (1, 2, 3, 4)
  },
  {
    title: "Frontend Core",
    skills: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "HTML", icon: <FaHtml5 />, color: "#007FFF" },
      { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
      // { name: "GraphQL", icon: <SiGraphql />, color: "#E10098" }
    ] // 6 icons: Pyramid (1, 2, 3)
  },
  {
    title: "Backend Core",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      // { name: "Spring", icon: <SiSpring />, color: "#6DB33F" },
      { name: "Express", icon: <SiNodedotjs />, color: "#eeeeee" },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "Postgres", icon: <SiPostgresql />, color: "#336791" }
    ] // 6 icons: Pyramid (1, 2, 3)
  },
  {
    title: "Platform & Tools",
    skills: [
      { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
      { name: "Render", icon: <SiRender/>, color: "#326ce5" },
      { name: "Vercel", icon: <IoLogoVercel />, color: "#FF9900" },
      { name: "Git", icon: <SiGit />, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff" }
    ] // 5 icons
  }
];

const SkillIcon = ({ skill }) => {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center cursor-pointer w-14 h-16 md:w-16 md:h-20"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div 
        variants={{ 
          hover: { 
            scale: 1.15,
            rotate: [0, -3, 3, -3, 3, 0],
            transition: { 
              duration: 0.5,
              rotate: { repeat: Infinity, duration: 0.4, ease: "linear" }
            }
          },
          rest: {
            scale: 1,
            rotate: 0,
            transition: { duration: 0.2 }
          }
        }}
        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-2xl md:text-3xl relative z-20 transition-colors duration-300 backdrop-blur-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.6)] flex-shrink-0"
      >
        <span style={{ color: skill.color }}>{skill.icon}</span>
        
        {/* Strictly hover-only colored box shadow */}
        <motion.div
          variants={{ 
            rest: { opacity: 0 },
            hover: { opacity: 1 } 
          }}
          className="absolute inset-0 rounded-full z-0 pointer-events-none"
          style={{ boxShadow: `0px 10px 25px ${skill.color}90` }}
        />
      </motion.div>
      
      {/* Absolute Tooltip Name */}
      <motion.div 
        variants={{ 
          rest: { opacity: 0, y: 5, scale: 0.9 },
          hover: { opacity: 1, y: 0, scale: 1 }
        }}
        transition={{ duration: 0.2 }}
        className="absolute -bottom-10 md:-bottom-12 flex flex-col items-center pointer-events-none z-50 whitespace-nowrap"
      >
        <div className="px-3 py-1.5 rounded-md bg-black/95 border border-white/15 shadow-2xl">
          <span 
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-white"
            style={{ textShadow: `0 0 8px ${skill.color}90` }}
          >
            {skill.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const AdaptiveLayout = ({ skills }) => {
  const count = skills.length;
  let rows = [];

  if (count === 3) rows = [[skills[0]], [skills[1], skills[2]]];
  else if (count === 4) rows = [[skills[0], skills[1]], [skills[2], skills[3]]];
  else if (count === 5) rows = [[skills[0], skills[1]], [skills[2], skills[3], skills[4]]];
  else if (count === 6) rows = [[skills[0], skills[1], skills[2]], [skills[3], skills[4], skills[5]]];
  else if (count === 7) rows = [[skills[0], skills[1]], [skills[2], skills[3], skills[4]], [skills[5], skills[6]]];
  else {
    // 8 or more, default to balanced chunking width wrap
    let i = 0;
    while (i < count) {
      rows.push(skills.slice(i, i + 4));
      i += 4;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 md:gap-4 relative z-10 w-full mb-2">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="flex justify-center gap-4 md:gap-5">
          {row.map((skill, sIdx) => (
            <SkillIcon key={sIdx} skill={skill} />
          ))}
        </div>
      ))}
    </div>
  );
}

const CategoryCard = ({ category, isCenter }) => {
  return (
    <div
      className="w-[340px] md:w-[380px] lg:w-[400px] h-auto md:h-auto rounded-2xl p-6 relative flex flex-col items-center flex-shrink-0 mx-auto transition-all duration-700 bg-mercury-950/40 border border-mercury-800/40 backdrop-blur-sm"
      style={{
        boxShadow: isCenter ? "0 20px 40px rgba(0,0,0,0.5)" : "0 10px 20px rgba(0,0,0,0.3)"
      }}
    >
      <h4 className="text-lg md:text-xl font-bold tracking-wide text-mercury-200 text-center uppercase mb-4">
        {category.title}
      </h4>
      <div className="w-full flex items-center justify-center">
        <AdaptiveLayout skills={category.skills} />
      </div>
    </div>
  );
}

export default function TechArsenal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const len = categories.length;

  const handleDragEnd = (e, info) => {
    const swipe = info.offset.x;
    const velocity = info.velocity.x;
    // Accurate scroll snap math responding directly to horizontal displacement or flick velocity threshold
    if (swipe < -50 || velocity < -200) {
      setActiveIndex((prev) => (prev + 1) % len);
    } else if (swipe > 50 || velocity > 200) {
      setActiveIndex((prev) => (prev - 1 + len) % len);
    }
  };

  return (
    <section id="arsenal" className="w-full py-40 overflow-hidden relative z-10 border-y border-mercury-800/20 bg-[#060606] flex flex-col items-center">
      {/* Background radial gradient to push deep matte layout */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.6)_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full mb-16 relative z-20 text-center">
        <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.4em] mb-4">Core Architecture</h2>
        <h3 className="text-4xl md:text-6xl font-bold text-mercury-200 tracking-tight">Technical <span className="text-mercury-700 font-light italic">Stage.</span></h3>
      </div>

      {/* Stage Geometry explicitly setting massive 1200px perspective */}
      <div className="relative w-full min-h-[450px] flex items-center justify-center transform-gpu mt-8" style={{ perspective: "1200px" }}>

        {/* Arrow Navigation */}
        <div className="absolute inset-y-0 left-2 right-2 md:left-8 md:right-8 flex items-center justify-between z-40 pointer-events-none">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + len) % len)}
            className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-mercury-300 hover:text-white bg-black/40 hover:bg-white/10 transition-all border border-white/20 hover:scale-110 shadow-2xl backdrop-blur-md"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % len)}
            className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-mercury-300 hover:text-white bg-black/40 hover:bg-white/10 transition-all border border-white/20 hover:scale-110 shadow-2xl backdrop-blur-md"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {categories.map((category, idx) => {
            let offset = idx - activeIndex;
            if (offset < -1) offset += len;
            if (offset > 1) offset -= len;

            const isCenter = offset === 0;
            const isRight = offset === 1;
            const isLeft = offset === -1;
            const isHidden = !isCenter && !isRight && !isLeft;

            // Target scale layout mapping locally over base scale matrix
            const scale = isCenter ? 1.5 : 1.1;

            // Pinned securely to extreme left and right offset tracks 
            const x = isCenter ? "0%" : (isLeft ? "-35vw" : (isRight ? "35vw" : (offset < 0 ? "-100vw" : "100vw")));
            const zIndex = isCenter ? 30 : (isHidden ? 0 : 10);
            const opacity = isCenter ? 1 : (isHidden ? 0 : 0.4);
            // Rotational matrix corresponding to realistic outward cuboid placement
            const rotateY = isCenter ? 0 : (isLeft ? -40 : (isRight ? 40 : 0));

            return (
              <motion.div
                key={category.title}
                initial={false}
                animate={{
                  x,
                  scale,
                  opacity,
                  rotateY,
                  zIndex,
                  filter: isCenter ? 'grayscale(0%)' : 'grayscale(60%) contrast(0.8)'
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  mass: 0.8
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => { if (!isCenter && !isHidden) setActiveIndex(idx); }}
                className={`absolute w-full h-full flex justify-center items-center ${isCenter ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${isHidden ? 'pointer-events-none' : ''}`}
                style={{
                  transformStyle: "preserve-3d" // Allows deep component tilt tracking inside
                }}
              >
                <div className="w-full flex justify-center">
                  <CategoryCard category={category} isCenter={isCenter} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Smart Pagination indicator block */}
      <div className="flex justify-center gap-4 mt-20 relative z-20">
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-16 h-[2px] rounded-full transition-all duration-500 ${activeIndex === idx ? 'bg-mercury-300 scale-110' : 'bg-mercury-800/50 hover:bg-mercury-600'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
