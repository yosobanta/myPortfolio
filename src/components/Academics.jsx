import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

/* ─── DATA ─────────────────────────────────────────────────────── */

const academicEntries = [
  {
    id: 'college',
    years: '2023 — Present',
    degree: 'B.Tech Computer Science & Engineering',
    institution: 'Lovely Profressional University',
    grade: 'CGPA: 8.2 / 10.0',
    status: 'ACTIVE',
    subjects: [
      'Machine Learning',
      'Android development',
      'Data Structures & Algorithms',
      'Machine Learning',
      'Operating Systems',
      'Database Management',
      'Computer Networks',
      'Software Engineering',
    ],
  },
  {
    id: '12th',
    years: '2021 — 2023',
    degree: 'Higher Secondary (XII) — Science',
    institution: 'Ramakrishna Mission Vidyapith,Deoghar',
    grade: 'Percentage: 90%',
    status: 'COMPLETED',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
  },
  {
    id: '10th',
    years: '2015 — 2021',
    degree: 'Secondary (X)',
    institution: 'Ramakrishna Mission Vidyapith,Purulia',
    grade: 'Percentage: 94.5%',
    status: 'COMPLETED',
    subjects: ['Mathematics', 'Science', 'Geography','History', 'English', 'Bengali'],
  },
];

const trainingEntries = [
  {
    id: 'angaar-mern',
    years: 'June — July 2025',
    title: 'MERN Stack with GenAI',
    organization: 'The Angaar Batch',
    orgLink: 'https://theangaarbatch.in',
    duration: '7 Weeks',
    status: 'COMPLETED',
    certificateUrl: import.meta.env.VITE_CERT_DRIVE_MERN_GENAI,
    highlights: [
      'MongoDB & Mongoose',
      'Express.js & REST APIs',
      'React.js & State Management',
      'Node.js & Authentication',
      'Generative AI Integration',
      'Full-Stack Deployment',
    ],
  },
];

/* ─── COLLAPSIBLE SECTION HEADER ──────────────────────────────── */

const SectionHeader = ({ label, index, isOpen, toggle }) => {
  const prefix = String(index).padStart(2, '0');
  return (
    <motion.button
      onClick={toggle}
      className="w-full flex items-center gap-4 py-5 px-6 rounded-xl
                 border border-mercury-800/40 bg-mercury-900/60 backdrop-blur-sm
                 cursor-pointer select-none group transition-colors duration-300
                 hover:border-mercury-600/50 hover:bg-mercury-800/40"
      whileTap={{ scale: 0.995 }}
    >
      {/* Section title — left aligned */}
      <span className="font-mono text-sm md:text-base uppercase tracking-[0.25em] font-bold flex-1 text-left text-mercury-300 group-hover:text-mercury-100 transition-colors duration-300">
        {prefix}. {label}
      </span>

      {/* +/- button — right side, bold */}
      <motion.span
        animate={{
          textShadow: isOpen
            ? '0 0 8px rgba(181,196,216,0.5), 0 0 16px rgba(181,196,216,0.25)'
            : '0 0 4px rgba(181,196,216,0.2)',
        }}
        transition={{ duration: 0.4 }}
        className="font-mono text-2xl font-black w-10 h-10 flex items-center justify-center rounded-lg
                   border border-mercury-700/50 bg-mercury-800/60 text-mercury-200 flex-shrink-0
                   group-hover:border-mercury-500/60 group-hover:text-mercury-100 transition-all duration-300"
      >
        {isOpen ? '−' : '+'}
      </motion.span>
    </motion.button>
  );
};

/* ─── TIMELINE NODE ───────────────────────────────────────────── */

const TimelineNode = ({ isActive }) => (
  <motion.div
    animate={{
      boxShadow: isActive
        ? [
            '0 0 4px rgba(181,196,216,0.3)',
            '0 0 14px rgba(181,196,216,0.7)',
            '0 0 4px rgba(181,196,216,0.3)',
          ]
        : '0 0 4px rgba(181,196,216,0.15)',
    }}
    transition={isActive ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : {}}
    className="relative z-10 flex-shrink-0"
  >
    <div
      className="w-[14px] h-[14px] rounded-full border-2"
      style={{
        backgroundColor: isActive ? '#b5c4d8' : '#3a4556',
        borderColor: isActive ? '#c0cfe0' : '#505d6d',
      }}
    />
  </motion.div>
);

/* ─── ACADEMIC MILESTONE CARD ────────────────────────────────── */

const AcademicMilestone = ({ entry, index, total }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = entry.status === 'ACTIVE';

  return (
    <div className="relative flex items-stretch">
      {/* ── left: vertical backbone ── */}
      <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: 30 }}>
        {/* continuous spine — runs the entire height of this milestone */}
        {index > 0 && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-mercury-700/40 to-mercury-600/30"
            style={{ height: 12 }}
          />
        )}

        {/* node */}
        <div className="mt-[10px]">
          <TimelineNode isActive={isActive} />
        </div>

        {/* spine continues below node to bottom of card */}
        {index < total - 1 && (
          <div className="flex-1 w-[1px] bg-gradient-to-b from-mercury-600/30 to-mercury-700/30" />
        )}
      </div>

      {/* ── horizontal branch ── */}
      <div className="flex items-start pt-[14px] flex-1 min-w-0">
        <div
          className="flex-shrink-0 mt-[3px]"
          style={{
            width: 28,
            height: 1,
            background: 'linear-gradient(to right, rgba(181,196,216,0.35), rgba(181,196,216,0.1))',
          }}
        />

        {/* ── card ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
          className="flex-1 ml-2 mb-4"
        >
          <div
            className="cursor-pointer rounded-xl border border-mercury-800/40 bg-mercury-900/50 backdrop-blur-sm
                       transition-all duration-300 hover:border-mercury-600/40 hover:bg-mercury-800/30 overflow-hidden"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Header strip — always visible */}
            <div className="flex items-center gap-4 md:gap-6 py-4 px-5">
              <span className="font-mono text-xs md:text-sm font-bold text-mercury-400 tracking-wider w-[120px] md:w-[140px] flex-shrink-0">
                {entry.years}
              </span>
              <span className="text-base md:text-lg font-semibold text-mercury-100 tracking-wide flex-1">
                {entry.degree}
              </span>
              <span
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border flex-shrink-0 hidden md:inline-block ${
                  isActive
                    ? 'text-green-400 border-green-500/40 bg-green-500/10'
                    : 'text-mercury-500 border-mercury-700/50 bg-mercury-900/30'
                }`}
              >
                {entry.status}
              </span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-mercury-500 text-sm flex-shrink-0"
              >
                ▾
              </motion.span>
            </div>

            {/* Expanded details — INSIDE the same card */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-mercury-800/40 px-5 py-5 md:px-7 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      <div className="flex-1">
                        <p className="text-mercury-500 text-[10px] font-mono uppercase tracking-widest mb-1">Institution</p>
                        <p className="text-mercury-200 text-base font-light mb-4">{entry.institution}</p>
                        <p className="text-mercury-500 text-[10px] font-mono uppercase tracking-widest mb-1">Grade</p>
                        <p className="text-mercury-100 text-lg font-bold">{entry.grade}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-mercury-500 text-[10px] font-mono uppercase tracking-widest mb-2">Core Subjects</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.subjects.map((subj, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-mono px-3 py-1 rounded-full border border-mercury-700/50 text-mercury-400 bg-mercury-800/40
                                         hover:text-mercury-200 hover:border-mercury-500/50 transition-colors"
                            >
                              {subj}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── TRAINING MILESTONE CARD ────────────────────────────────── */

const TrainingMilestone = ({ entry, index, total }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isUpcoming = entry.status === 'UPCOMING';

  return (
    <div className="relative flex items-stretch">
      {/* vertical backbone */}
      <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: 30 }}>
        {index > 0 && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-mercury-700/40 to-mercury-600/30"
            style={{ height: 12 }}
          />
        )}
        <div className="mt-[10px]">
          <TimelineNode isActive={isUpcoming} />
        </div>
        {index < total - 1 && (
          <div className="flex-1 w-[1px] bg-gradient-to-b from-mercury-600/30 to-mercury-700/30" />
        )}
      </div>

      {/* horizontal branch */}
      <div className="flex items-start pt-[14px] flex-1 min-w-0">
        <div
          className="flex-shrink-0 mt-[3px]"
          style={{
            width: 28,
            height: 1,
            background: 'linear-gradient(to right, rgba(181,196,216,0.35), rgba(181,196,216,0.1))',
          }}
        />

        {/* card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
          className="flex-1 ml-2 mb-4"
        >
          <div
            className="cursor-pointer rounded-xl border border-mercury-800/40 bg-mercury-900/50 backdrop-blur-sm
                       transition-all duration-300 hover:border-mercury-600/40 hover:bg-mercury-800/30 overflow-hidden"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Header strip */}
            <div className="flex items-center gap-4 md:gap-6 py-4 px-5">
              <span className="font-mono text-xs md:text-sm font-bold text-mercury-400 tracking-wider w-[120px] md:w-[140px] flex-shrink-0">
                {entry.years}
              </span>
              <span className="text-base md:text-lg font-semibold text-mercury-100 tracking-wide flex-1">
                {entry.title}
              </span>
              <span
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border flex-shrink-0 hidden md:inline-block ${
                  isUpcoming
                    ? 'text-amber-400 border-amber-500/40 bg-amber-500/10'
                    : 'text-mercury-500 border-mercury-700/50 bg-mercury-900/30'
                }`}
              >
                {entry.status}
              </span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-mercury-500 text-sm flex-shrink-0"
              >
                ▾
              </motion.span>
            </div>

            {/* Expanded details — INSIDE the same card */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-mercury-800/40 px-5 py-5 md:px-7 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      <div className="flex-1">
                        <p className="text-mercury-500 text-[10px] font-mono uppercase tracking-widest mb-1">Organization</p>
                        <a
                          href={entry.orgLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-mercury-200 text-base font-light mb-4 block hover:text-mercury-100 hover:underline transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {entry.organization} ↗
                        </a>
                        <p className="text-mercury-500 text-[10px] font-mono uppercase tracking-widest mb-1 mt-3">Duration</p>
                        <p className="text-mercury-100 text-lg font-bold">{entry.duration}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-mercury-500 text-[10px] font-mono uppercase tracking-widest mb-2">Modules Covered</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-mono px-3 py-1 rounded-full border border-mercury-700/50 text-mercury-400 bg-mercury-800/40
                                         hover:text-mercury-200 hover:border-mercury-500/50 transition-colors"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* View Certificate */}
                    <motion.a
                      href={entry.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, boxShadow: '0 0 16px rgba(181,196,216,0.2)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-5 flex items-center justify-center gap-2 w-full md:w-auto md:inline-flex py-3 px-8 rounded-xl text-xs font-mono uppercase tracking-widest
                                 border border-mercury-600/40 bg-mercury-800/30 text-mercury-300
                                 hover:text-mercury-100 hover:border-mercury-500/50 transition-all duration-300"
                    >
                      <ExternalLink size={14} /> View Certificate
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── MAIN SECTION ────────────────────────────────────────────── */

export default function Academics({ forceExpandAll = false }) {
  const [academicOpen, setAcademicOpen] = useState(true);
  const [trainingOpen, setTrainingOpen] = useState(false);

  return (
    <section id="academics" className="w-full py-32 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="mb-20">
          <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.3em] mb-4">Education</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-mercury-200">
            Learning <br />
            <span className="text-mercury-600 font-light">Ledger.</span>
          </h3>
        </div>

        {/* ── PILLAR 1 : ACADEMIC LOG ── */}
        <div className="mb-8">
          <SectionHeader
            label="ACADEMIC_LOG"
            index={1}
            isOpen={academicOpen}
            toggle={() => setAcademicOpen(!academicOpen)}
          />
          <AnimatePresence>
            {academicOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                className="overflow-hidden"
              >
                <div className="pt-6 pl-2 md:pl-6">
                  {academicEntries.map((entry, idx) => (
                    <AcademicMilestone key={entry.id} entry={entry} index={idx} total={academicEntries.length} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── PILLAR 2 : TRAINING PROTOCOLS ── */}
        <div>
          <SectionHeader
            label="TRAINING_PROTOCOLS"
            index={2}
            isOpen={trainingOpen}
            toggle={() => setTrainingOpen(!trainingOpen)}
          />
          <AnimatePresence>
            {trainingOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                className="overflow-hidden"
              >
                <div className="pt-6 pl-2 md:pl-6">
                  {trainingEntries.map((entry, idx) => (
                    <TrainingMilestone key={entry.id} entry={entry} index={idx} total={trainingEntries.length} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
