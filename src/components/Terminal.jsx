import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = {
  projects: "Navigating to Projects Vault...",
  academics: "Loading Academic Records...",
  verify: "Activating Credential Verification Protocol...",
  contact: "Fetching Contact Protocol...",
  cv: "Downloading CV data packet...",
  arsenal: "Deploying Technical Arsenal...",
  help: "Listing available commands...",
  clear: "Clearing terminal output."
};

export default function Terminal({ onClose, onNavigate, onAcademicsExpand, onVerify }) {
  const [history, setHistory] = useState([
    { type: 'system', text: '> TermLink Protocol Active' },
    { type: 'system', text: '> Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add user input to history
    setHistory(prev => [...prev, { type: 'user', text: `> ${cmd}` }]);

    if (trimmed === 'clear') {
      setTimeout(() => setHistory([]), 100);
      return;
    }

    if (trimmed === 'help') {
      setHistory(prev => [
        ...prev,
        { type: 'response', text: 'AVAILABLE COMMANDS:' },
        ...Object.keys(COMMANDS).map(k => ({ type: 'response', text: `  ${k.padEnd(10)} - ${COMMANDS[k]}` }))
      ]);
      return;
    }

    if (trimmed === 'projects') {
      setHistory(prev => [...prev, { type: 'response', text: 'Initializing route to Projects Vault...' }]);
      setTimeout(() => {
        onClose();
        onNavigate('#projects');
      }, 800);
      return;
    }

    if (trimmed === 'arsenal') {
      setHistory(prev => [...prev, { type: 'response', text: 'Deploying Technical Arsenal grid...' }]);
      setTimeout(() => {
        onClose();
        onNavigate('#arsenal');
      }, 800);
      return;
    }

    if (trimmed === 'academics') {
      setHistory(prev => [...prev, { type: 'response', text: 'Expanding Academic Records... Navigate to Knowledge Vault.' }]);
      if (onAcademicsExpand) onAcademicsExpand();
      setTimeout(() => {
        onClose();
        onNavigate('#academics');
      }, 800);
      return;
    }

    if (trimmed === 'verify') {
      setHistory(prev => [...prev, { type: 'response', text: 'Activating Credential Verification Protocol... Illuminating all certificates.' }]);
      if (onVerify) onVerify();
      setTimeout(() => {
        onClose();
        onNavigate('#certifications');
      }, 800);
      return;
    }

    if (trimmed === 'contact') {
      setHistory(prev => [
        ...prev,
        { type: 'response', text: '----- COMMS CHANNEL -----' },
        { type: 'response', text: 'EMAIL: hello@yosobanta.dev' },
        { type: 'response', text: 'GITHUB: github.com/yosobanta' },
        { type: 'response', text: 'LINKEDIN: linkedin.com/in/yosobanta' },
        { type: 'response', text: '-------------------------' }
      ]);
      return;
    }

    if (trimmed === 'cv') {
      setHistory(prev => [...prev, { type: 'response', text: 'Initiating Secure File Transfer: CV.pdf ...' }]);
      setTimeout(() => {
        // Simulate download / open link
        // window.open('/assets/Yosobanta_CV.pdf', '_blank');
        alert("CV Download Triggered!");
      }, 600);
      return;
    }

    // Command not found
    setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${trimmed}` }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <motion.div 
      key="terminal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 w-full min-h-screen flex items-center justify-center font-mono p-4 md:p-8 bg-black/95 backdrop-blur-md pointer-events-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-3xl w-full h-[70vh] flex flex-col border border-green-500/30 rounded-lg overflow-hidden bg-black/80 shadow-[0_0_40px_rgba(0,255,0,0.15)] relative">
        
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30 z-10"></div>
        
        {/* Terminal Header */}
        <div className="w-full h-8 bg-green-500/10 border-b border-green-500/30 flex items-center px-4 justify-between select-none relative z-20">
          <span className="text-green-500/80 text-xs">YOSOBANTA_OS v2.0.4</span>
          <button 
            onClick={onClose}
            className="text-green-500 hover:text-red-500 transition-colors"
          >
            [X]
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 text-sm text-green-500 flex flex-col gap-1 relative z-20 custom-scrollbar">
          {history.map((log, idx) => (
            <div 
              key={idx} 
              className={`whitespace-pre-wrap ${log.type === 'error' ? 'text-red-400' : ''}`}
            >
              {log.text}
            </div>
          ))}
          
          <form onSubmit={onSubmit} className="flex mt-2">
            <span className="mr-2">&gt;</span>
            <input 
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-green-500 font-mono focus:ring-0 p-0 m-0"
              spellCheck="false"
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </motion.div>
  );
}
