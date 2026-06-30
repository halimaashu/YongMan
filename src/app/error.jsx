"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { CircleExclamation, ArrowRotateLeftNumber5, ClockArrowRotateLeft } from '@gravity-ui/icons';

const Error = ({ error, reset }) => {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center p-4 text-zinc-100 selection:bg-red-500/30">
      {/* Glow Effect Ambient Background */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center opacity-20 overflow-hidden">
        <div className="w-[400px] h-[400px] bg-red-600 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-zinc-950/40 border border-zinc-800/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl relative z-10"
      >
        {/* Animated Icon Container */}
        <motion.div 
          initial={{ rotate: -15, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
        >
          <CircleExclamation className="w-8 h-8" />
        </motion.div>

        {/* Text Content */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-black tracking-tight text-white mb-2"
        >
          Something Went Wrong
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-zinc-400 font-normal leading-relaxed mb-8 max-w-xs mx-auto"
        >
          {error?.message || "An unexpected error occurred while executing this operation. Please try again or return home."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 justify-center"
        >
          {reset && (
            <Button
              size="md"
              onClick={() => reset()}
              className="w-full sm:w-auto bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl px-5 h-11 transition-all flex items-center justify-center gap-2"
            >
              <ClockArrowRotateLeft className="w-4 h-4" />
              Try Again
            </Button>
          )}
          
          <Button
            size="md"
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold rounded-xl px-5 h-11 transition-all flex items-center justify-center gap-2"
          >
            <ArrowRotateLeftNumber5 className="w-4 h-4" />
            Go Back Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;