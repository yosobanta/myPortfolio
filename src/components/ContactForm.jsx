import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const inputFields = [
  { id: 'sender', label: 'Sender_ID', placeholder: 'Your Name', type: 'text' },
  { id: 'frequency', label: 'Frequency', placeholder: 'your.email@domain.com', type: 'email' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({ sender: '', frequency: '', packet: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sender || !formData.frequency || !formData.packet) return;

    setStatus("sending");
    setProgress(10);

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.sender,
          email: formData.frequency,
          message: formData.packet,
        }),
      });

      if (response.ok) {
        setProgress(100);

        setTimeout(() => {
          setStatus("success");

          // clear form automatically
          setFormData({
            sender: "",
            frequency: "",
            packet: "",
          });

        }, 500);

      } else {
        setStatus("error");
      }

    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus('idle');
    setProgress(0);
    setFormData({ sender: '', frequency: '', packet: '' });
  };

  return (
    <div className="w-full h-full">
      {/* Editor Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-mercury-800/40 bg-mercury-900/40">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[10px] font-mono text-mercury-600 ml-3">uplink_terminal.sh</span>
      </div>

      {/* Editor Body */}
      <div className="p-5 md:p-8 font-mono text-sm">
        {/* Line Numbers + Code-style form */}
        <div className="flex flex-col gap-4">
          {/* Comment */}
          <p className="text-mercury-600 text-xs">
            <span className="text-mercury-700 mr-3 select-none">01</span>
            {'// Establish uplink connection'}
          </p>

          {inputFields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-2">
              <span className="text-mercury-700 text-xs w-6 text-right select-none">{String(i + 2).padStart(2, '0')}</span>
              <span className="text-purple-400">const</span>
              <span className="text-cyan-400">{field.label}</span>
              <span className="text-mercury-500">=</span>
              <input
                type={field.type}
                value={formData[field.id]}
                onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                placeholder={`"${field.placeholder}"`}
                className="flex-1 bg-mercury-900/40 border border-mercury-800/50 rounded-lg px-3 py-2 text-mercury-200 text-sm font-mono placeholder:text-mercury-700 focus:outline-none focus:border-mercury-500/50 transition-colors"
                disabled={status !== 'idle'}
              />
            </div>
          ))}

          {/* Message textarea */}
          <div className="flex gap-2">
            <span className="text-mercury-700 text-xs w-6 text-right select-none pt-2">04</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-purple-400">const</span>
                <span className="text-cyan-400">Data_Packet</span>
                <span className="text-mercury-500">=</span>
              </div>
              <textarea
                value={formData.packet}
                onChange={(e) => setFormData(prev => ({ ...prev, packet: e.target.value }))}
                placeholder={'"Your message..."'}
                rows={4}
                className="w-full bg-mercury-900/40 border border-mercury-800/50 rounded-lg px-3 py-2 text-mercury-200 text-sm font-mono placeholder:text-mercury-700 focus:outline-none focus:border-mercury-500/50 transition-colors resize-none"
                disabled={status !== 'idle'}
              />
            </div>
          </div>

          {/* Separator */}
          <p className="text-mercury-700 text-xs">
            <span className="text-mercury-700 mr-3 select-none">05</span>
            {'// ─────────────────────────────'}
          </p>

          {/* Submit / Status */}
          <div className="flex items-center gap-2">
            <span className="text-mercury-700 text-xs w-6 text-right select-none">06</span>

            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.button
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,100,0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl border border-green-500/40 bg-green-500/10 text-green-400 font-mono text-sm uppercase tracking-widest hover:border-green-400/60 transition-all"
                >
                  [ EXECUTE_TRANSMISSION ]
                </motion.button>
              )}

              {status === 'sending' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-3 text-yellow-400 text-xs mb-2">
                    <span className="animate-pulse">⟩</span> UPLOADING... {Math.min(100, Math.floor(progress))}%
                  </div>
                  <div className="w-full h-1.5 bg-mercury-800/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-500 to-green-400 rounded-full"
                      style={{ width: `${Math.min(100, progress)}%` }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  <p className="text-green-400 text-sm mb-3">
                    ✓ SIGNAL_RECEIVED: <span className="font-bold">SUCCESS</span>
                  </p>
                  <button
                    onClick={reset}
                    className="text-xs text-mercury-500 hover:text-mercury-300 transition-colors underline underline-offset-4"
                  >
                    [ RESET_TERMINAL ]
                  </button>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  <p className="text-red-400 text-sm mb-3">
                    ✕ TRANSMISSION_FAILED
                  </p>

                  <button
                    onClick={reset}
                    className="text-xs text-mercury-500 hover:text-mercury-300 transition-colors underline underline-offset-4"
                  >
                    [ RETRY_CONNECTION ]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
