"use client";

import React from 'react';
import Image from 'next/image';
import { Card, Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import Link from 'next/link';

const Banner = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="relative w-full min-h-[90vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-950 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20 lg:py-24">

      {/* 1. HIGH-VISIBILITY GYM BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/young-man-banner.avif"
          alt="Gym Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-right-top md:object-center opacity-65 contrast-115 brightness-95 scale-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />
      </div>

      {/* 2. FLEXIBLE DESIGN GRID */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 xl:gap-16 items-center"
      >

        {/* LEFT SIDE: TYPOGRAPHY & CALL TO ACTIONS */}
        <div className="lg:col-span-12 flex flex-col items-center text-center space-y-4 sm:space-y-6">

          <motion.div variants={fadeInUp} className="w-full">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
              PUSH YOUR LIMITS <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00E5FF] via-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,229,255,0.15)]">
                DEFINE YOURSELF
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-md sm:max-w-xl font-medium leading-relaxed drop-shadow"
          >
            Track your progress, book elite trainers, and join high-octane sessions tailored entirely to your fitness goals. Your journey starts now.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2"
          >
            <Link href="/classes">
            <Button
              size="lg"
              className="w-full sm:w-auto font-bold tracking-wide text-zinc-950 px-8 rounded-xl bg-[#00E5FF] shadow-lg shadow-[#00E5FF]/20 hover:bg-[#00E5FF]/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              endContent={<ArrowRight className="w-4 h-4 text-zinc-950 font-bold" />}
            >
              Browse All Classes
            </Button>
            </Link>

           <Link href="/about">
             <Button
               size="lg"
               className="w-full sm:w-auto font-bold tracking-wide text-zinc-950 px-8 rounded-xl  shadow-lg shadow-zinc-900/20  hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
               endContent={<ArrowRight className="w-4 h-4 text-zinc-950 font-bold" />}
             >
               Learn More
             </Button>
           </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;