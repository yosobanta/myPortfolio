import React from 'react';
import ContactForm from './ContactForm';
import PlaylistPlayer from './PlaylistPlayer';

export default function HumanProtocolFooter() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.3em] mb-4">Transmit Signal</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-mercury-200">Contact <span className="text-mercury-600 font-light">& Frequencies.</span></h3>
        </div>

        {/* 60/40 Split */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Left 60% — Uplink Terminal */}
          <div className="lg:w-[60%] w-full glass-panel rounded-2xl border border-mercury-800/40 overflow-hidden">
            <ContactForm />
          </div>

          {/* Right 40% — Playlist Player */}
          <div className="lg:w-[40%] w-full glass-panel rounded-2xl border border-mercury-800/40 overflow-hidden">
            <PlaylistPlayer />
          </div>
        </div>
      </div>
    </section>
  );
}
