'use client';

import React from 'react';
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowLeft } from '@gravity-ui/icons';
import Link from 'next/link';

// Container staggered layout animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Subtle radar pulse effect
const pulseVariant = {
  animate: {
    scale: [0.95, 1.05, 0.95],
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function NotFoundPage() {
  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center px-4 py-12 bg-background select-none relative overflow-hidden">
      
      {/* Structural Minimal Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Single ultra-soft clean ambient light ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Card Wrap */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full z-10"
      >
        <Card className="border border-divider/70 bg-background/40 backdrop-blur-xl shadow-xl overflow-visible p-3">
          
          <Card.Header className="flex flex-col items-center text-center pt-8 pb-4 relative">
            
            {/* Unique Visual Indicator: Minimal geometric status circle instead of raw huge text */}
            <div className="relative w-20 h-20 flex items-center justify-center mb-6">
              <motion.div 
                variants={pulseVariant}
                animate="animate"
                className="absolute inset-0 border border-primary/30 rounded-full" 
              />
              <div className="absolute inset-2 border border-dashed border-divider rounded-full" />
              <span className="font-mono text-sm tracking-wider font-semibold text-primary">
                ERR:04
              </span>
            </div>

            <Card.Title className="text-xl font-semibold text-foreground tracking-tight block">
              Resource Unavailable
            </Card.Title>

            <Card.Description className="text-sm text-default-400 max-w-[85%] leading-relaxed mt-2 block font-normal">
              The exact routing index or requested uniform resource locator could not be verified by the system core.
            </Card.Description>
          </Card.Header>

          {/* Technical Data Break Line */}
          <Card.Content className="py-2 px-6 flex justify-center items-center">
            <div className="flex items-center justify-center gap-3 w-full my-1 text-[10px] font-mono text-default-400 tracking-widest uppercase">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-divider" />
              <span>Status Code 404</span>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-divider" />
            </div>
          </Card.Content>

          <Card.Footer className="pb-6 pt-4 flex flex-col gap-4">
            {/* Highly Polished Clean Button Layout */}
            <motion.div 
              variants={itemVariants} 
              className="w-full"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <Button 
                as={Link} 
                href="/" 
                variant="bordered"
                size="lg"
                radius="md"
                className="w-full font-medium border-default-200 hover:border-primary/50 text-foreground transition-colors bg-background/50 backdrop-blur-sm"
                startContent={<ArrowLeft className="w-4 h-4 text-default-500" />}
              >
                Return to Dashboard
              </Button>
            </motion.div>
            
            <motion.p 
              variants={itemVariants} 
              className="text-[11px] font-mono text-default-400/80 text-center w-full tracking-normal"
            >
              Session active. Ready for redirection parameters.
            </motion.p>
            <Link
            href={"/"}>
            <Button>Go back</Button>
            </Link>
          </Card.Footer>

        </Card>
      </motion.div>
    </div>
  );
}