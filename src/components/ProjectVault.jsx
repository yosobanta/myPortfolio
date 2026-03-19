import React from 'react';
import CommandCenterProject from './CommandCenterProject';

import medivaultVideo from '../assets/medivault.mp4';
import lastMileVideo from '../assets/Last_mile_delivery.mp4';
import osVideo from '../assets/OS.mp4';
import portfolioVideo from '../assets/portfolio.mp4';

const vaultProjects = [

  {
    title: 'MEDIVAULT',
    type: 'Full Stack Web Application',
    projectCategory: 'Healthcare / MERN Platform',
    themeColor: '#60a5fa', // blue
    liveUrl: 'https://medi-vault-ten.vercel.app/',
    sourceUrl: 'https://github.com/SweetyBiju/MediVault.git',
    video: medivaultVideo,
    sections: {
      context: 'Medical records are often scattered across hospitals, labs, and personal storage systems, making it difficult for patients to securely manage and share their health data with doctors when required. Patients need a centralized platform that enables secure document storage, controlled access sharing, and intelligent insights from their health records.',
      architecture: 'Developed using the MERN stack with React and Tailwind for the frontend and Node.js/Express with MongoDB for the backend. The system implements role-based authentication, secure document upload, OTP-based document sharing with expiry, and AI-powered health insights. Documents are stored with metadata indexing, and the dashboard provides real-time record tracking, appointment management, and doctor communication.',
      specialization: 'The system introduces time-limited OTP access links for medical documents, enabling patients to grant temporary access to doctors without permanently sharing files. It also integrates an AI health scoring module that analyzes uploaded records and displays trends through interactive visualizations.',
      stack: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
      metrics: [
        { value: '10+', label: 'Dashboard Modules' },
        { value: 'OTP', label: 'Secure Sharing' },
        { value: 'Role-Based', label: 'Access Control' },
        { value: 'AI', label: 'Health Insights' },
        { value: 'Drag-Drop', label: 'File Upload' },
        { value: 'Real-Time', label: 'Record Tracking' }
      ]
    }
  },
  {
    title: 'LAST-MILE DELIVERY OPTIMIZATION',
    type: 'Machine Learning',
    projectCategory: 'ML / Logistics Optimization',
    themeColor: '#34d399', // green
    liveUrl: '#',
    sourceUrl: 'https://github.com/GopalVashishta/Route-Optimization-for-E-Commerce-ML.git',
    video: lastMileVideo,
    sections: {
      context: 'Last-mile delivery accounts for the most expensive segment of the logistics chain due to inefficient route planning, traffic variability, and dynamic delivery requests. Logistics companies require intelligent systems that can predict optimal routes and delivery sequences in real time to reduce fuel cost and delivery delays.',
      architecture: 'Built a machine learning pipeline that analyzes historical delivery data, traffic conditions, and order clusters to generate optimized delivery routes. The system combines clustering algorithms for delivery grouping and a heuristic optimization approach inspired by the Traveling Salesman Problem to minimize travel distance and time.',
      specialization: 'Unlike static route planners, the model dynamically recalculates routes when new orders arrive or traffic conditions change, enabling adaptive scheduling for delivery agents and improving overall route efficiency.',
      stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebook'],
      metrics: [
        { value: '18%', label: 'Distance Reduction' },
        { value: '96%', label: 'Accurate' },
        { value: '1.5 lakh+', label: 'Data Entries' },
        { value: 'K-Means', label: 'Clustering Model' },
        { value: 'XGBoost', label: 'Regression' },
        { value: 'Dynamic', label: 'Replanning' }
      ]
    }
  },
  {
    title: 'REAL-TIME MULTI-THREADED APPLICATION SIMULATOR',
    type: 'Systems Programming',
    projectCategory: 'Operating Systems / Concurrency',
    themeColor: '#f59e0b', // amber
    liveUrl: '#',
    sourceUrl: 'https://github.com/yosobanta/Real-Time-Multi-threaded-Application-Simulator',
    video: osVideo,
    sections: {
      context: 'Modern software systems rely heavily on concurrent processing, where multiple threads execute tasks simultaneously. Understanding thread scheduling, synchronization, and resource contention is critical for building high-performance applications.',
      architecture: 'Implemented a multi-threaded simulation framework in C++ using POSIX threads and synchronization primitives. The simulator models concurrent processes executing tasks with shared resources while demonstrating thread scheduling, race conditions, mutex locks, and deadlock prevention mechanisms.',
      specialization: 'The system visualizes thread execution timelines and resource contention scenarios, allowing developers to observe how different synchronization techniques affect throughput and performance in concurrent applications.',
      stack: ['Python', 'OS', 'Mutex', 'Semaphores', 'Tkinter', 'Concurrency'],
      metrics: [
        { value: '10+', label: 'Concurrent Threads' },
        { value: 'Mutex', label: 'Synchronization' },
        { value: 'Real-Time', label: 'Thread Execution' },
        { value: 'Deadlock', label: 'Simulation Cases' },
        { value: 'Low-Latency', label: 'Task Scheduling' },
        { value: 'OS-Level', label: 'Concurrency Model' }
      ]
    }
  },
  {
    title: 'DEVELOPER CINEMATIC PORTFOLIO',
    type: 'Interactive Web Experience',
    projectCategory: 'Frontend / Creative Development',
    themeColor: '#f472b6', // pink
    liveUrl: '#',
    sourceUrl: '#',
    video: portfolioVideo,
    sections: {
      context: 'Traditional developer portfolios often present projects as static pages, failing to capture the user’s attention or reflect the developer’s creativity. Modern web experiences require immersive interfaces that blend animation, interaction, and storytelling.',
      architecture: 'Built a single-page portfolio using React with Tailwind CSS and motion libraries such as GSAP and Framer Motion. The interface includes a cinematic startup screen with an OS-like boot sequence, interactive cursor trails, scroll-driven animations, and modular sections presenting projects, skills, and experiences.',
      specialization: 'The portfolio mimics a lightweight operating system interface where modules load dynamically, creating a narrative-driven browsing experience rather than a traditional static website.',
      stack: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'JavaScript', 'Vite'],
      metrics: [
        { value: '60fps', label: 'Animation Smoothness' },
        { value: 'Interactive', label: 'Boot Sequence' },
        { value: 'Scroll', label: 'Motion Effects' },
        { value: 'Modular', label: 'UI Components' },
        { value: 'Dynamic', label: 'Content Loading' },
        { value: 'SPA', label: 'Architecture' }
      ]
    }
  }
];

export default function ProjectVault() {
  return (
    <section id="projects" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-dark-bg z-10 relative">
      <div className="max-w-7xl mx-auto">

        <div className="mb-24">
          <h2 className="text-sm font-mono text-mercury-500 uppercase tracking-[0.3em] mb-4">Archive</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-mercury-200">The <span className="text-mercury-600 font-light">Vault.</span></h3>
        </div>

        <div className="flex flex-col">
          {vaultProjects.map((project, idx) => (
            <CommandCenterProject key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
