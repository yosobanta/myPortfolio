import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  {
    text: '"The only way to do great work is to love what you do."',
    author: '— Steve Jobs',
  },
  {
    text: '"Code is like humor. When you have to explain it, it\'s bad."',
    author: '— Cory House',
  },
  {
    text: '"First, solve the problem. Then, write the code."',
    author: '— John Johnson',
  },
  {
    text: '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."',
    author: '— Martin Fowler',
  },
  {
    text: '"The best error message is the one that never shows up."',
    author: '— Thomas Fuchs',
  },
  {
    text: '"In the middle of difficulty lies opportunity."',
    author: '— Albert Einstein',
  },
];

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-6 px-6 md:px-12 min-h-[30vh] max-h-[40vh] flex items-center justify-center border-t border-b border-mercury-800/20">
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 6 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -6 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="text-center"
          >
            <p
              className="text-sm md:text-lg lg:text-xl leading-relaxed font-light tracking-wide"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 20s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {quotes[currentIndex].text}
            </p>
            <p
              className="mt-3 text-[10px] md:text-xs font-mono tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 20s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: 0.7,
              }}
            >
              {quotes[currentIndex].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
