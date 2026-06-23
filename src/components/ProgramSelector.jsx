'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';
import { ArrowChevronRight } from '@gravity-ui/icons';

const ProgramSelector = () => {
  const [activeTab, setActiveTab] = useState('cst');

  const tracks = {
    cst: {
      tag: "Neural Processing",
      title: "Mental Endurance & Focus",
      desc: "Workouts tailored specifically for high-stress developers, engineers, and digital architects looking to reset cognition cycles.",
      duration: "4 Weeks",
      intensity: "Adaptive Baseline",
    },
    strength: {
      tag: "Kinetic Drive",
      title: "Hypertrophy & Conditioning",
      desc: "Engineered high-output tracks built to break plateaus, accelerate metabolic rates, and build raw explosive muscle density.",
      duration: "8 Weeks",
      intensity: "High Velocity",
    },
    mobility: {
      tag: "Biomechanics",
      title: "Postural Spine Mechanics",
      desc: "Reverse the structural damage of long desktop sitting blocks. Restores full range hip, shoulder, and kinetic mobility parameters.",
      duration: "6 Weeks",
      intensity: "Low Impact / High Yield",
    }
  };

  return (
    <section className="py-24 w-full bg-[#0A0B0E] border-t border-[#161A23] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative localized accent subtle flare */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Controller Stack */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-[#00E5FF]">
              Target Optimization
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white mt-1">
              Select Your Pipeline
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {Object.keys(tracks).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all duration-300 relative ${
                  activeTab === key
                    ? 'bg-[#161A23] border-[#00E5FF] text-white'
                    : 'bg-transparent border-gray-900 text-gray-500 hover:text-gray-300 hover:border-gray-800'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider">
                  {key === 'cst' ? 'Developer Focus Track' : key === 'strength' ? 'Kinetic Conditioning' : 'Biomechanical Restore'}
                </span>
                <ArrowChevronRight 
                  width={14} 
                  height={14} 
                  className={`transition-transform duration-300 ${activeTab === key ? 'text-[#00E5FF] translate-x-1' : 'opacity-30'}`} 
                />
                
                {/* Active neon subtle border accent slider layer */}
                {activeTab === key && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 rounded-xl border border-[#00E5FF] pointer-events-none shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                    style={{ zIndex: 10 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Adaptive Preview Screen */}
        <div className="lg:col-span-7 bg-[#0F111A] border border-[#161A23] rounded-2xl p-6 sm:p-10 min-h-[320px] flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.3)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-block px-2.5 py-0.5 rounded text-[9px] uppercase font-black tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                {tracks[activeTab].tag}
              </div>
              
              <div className="space-y-2">
                <h4 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {tracks[activeTab].title}
                </h4>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                  {tracks[activeTab].desc}
                </p>
              </div>

              {/* Specs Sub-row */}
              <div className="pt-4 border-t border-[#161A23] grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-black text-gray-500 block">Duration Scope</span>
                  <span className="text-xs font-bold text-gray-200 mt-0.5 block">{tracks[activeTab].duration}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black text-gray-500 block">Stress Profile</span>
                  <span className="text-xs font-bold text-gray-200 mt-0.5 block">{tracks[activeTab].intensity}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-8">
            <Button
              className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider text-black bg-[#00E5FF] hover:bg-cyan-400 h-11 px-6 rounded-lg transition-all"
            >
              Initialize This Track
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProgramSelector;