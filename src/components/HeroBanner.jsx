'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { ArrowRight, PlayFill } from '@gravity-ui/icons';

const HeroBanner = () => {
  // Animation presets for sequential fade-ins
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#0A0B0E] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      
      {/* Background Neon Accent Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00E5FF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      
      {/* Tech Grid Pattern Layer overlaying the background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161A23_1px,transparent_1px),linear-gradient(to_bottom,#161A23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* Main Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
      >
        {/* Animated Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] uppercase font-black tracking-widest text-[#00E5FF] bg-[#00E5FF]/5 border border-[#00E5FF]/20 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            👋 Inspiring Peak Performance
          </span>
        </motion.div>

        {/* Hero Headline (Updated with Gene Tunney quote) */}
        <motion.h2 
          variants={itemVariants}
          className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight max-w-3xl mx-auto"
        >
          To enjoy the glow of <br className="hidden sm:inline" /> good health, 
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-cyan-400 to-blue-500 drop-shadow-[0_0_30px_rgba(0,229,255,0.25)]">
            you must exercise.
          </span>
        </motion.h2>

        {/* Hero Paragraph Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="max-w-lg mx-auto text-sm sm:text-base text-gray-400 font-medium leading-relaxed tracking-wide italic"
        >
          — Gene Tunney
        </motion.p>

        {/* CTA Action Panel Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {/* Neon Action Button */}
         <Link  href="/classes">
          <Button
       
           
            className="w-full sm:w-auto h-12 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#00E5FF] hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] flex items-center justify-center gap-2 group"
          >
            Explore Classes
            <ArrowRight width={14} height={14} className="transition-transform group-hover:translate-x-1" />
          </Button> 
         </Link>

          {/* Border-Glow Outline Action Button */}
         <Link href="/forum">
          <Button 
           
            
            variant="bordered"
            className="w-full sm:w-auto h-12 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white border-none p-0.5 bg-gradient-to-br from-gray-800 to-gray-700/50 hover:from-[#00E5FF] hover:to-blue-600 transition-all duration-300"
          >
            <span className="flex items-center justify-center w-full h-full px-6 bg-[#0A0B0E] rounded-[7px] gap-2 text-gray-300 hover:text-white transition-colors">
              <PlayFill width={12} height={12} className="text-gray-400" />
              Watch Demo
            </span>
          </Button>
         </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;