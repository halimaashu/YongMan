'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@heroui/react';
import { ChartLine, Flame, ShieldCheck, Trolley } from '@gravity-ui/icons';

const ActivityMatrix = () => {
  const metrics = [
    {
      title: "Total Burnt",
      description: "+12.4% today",
      value: "1,248,390 kcal",
      icon: <Flame className="text-[#00E5FF]" width={20} height={20} />,
      glow: "hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] hover:border-[#00E5FF]/30",
    },
    {
      title: "Active Routines",
      description: "Peak hour traffic",
      value: "84 active now",
      icon: <ChartLine className="text-blue-500" width={20} height={20} />,
      glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:border-blue-500/30",
    },
    {
      title: "Success Rate",
      description: "Community average",
      value: "98.2% Streak",
      icon: <ShieldCheck className="text-emerald-400" width={20} height={20} />,
      glow: "hover:shadow-[0_0_25px_rgba(52,211,153,0.15)] hover:border-emerald-400/30",
    },
    {
      title: "Club Records",
      description: "This month alone",
      value: "342 Shattered",
      icon: <Trolley className="text-amber-400" width={20} height={20} />,
      glow: "hover:shadow-[0_0_25px_rgba(251,191,36,0.15)] hover:border-amber-400/30",
    },
  ];

  return (
    <section className="py-24 w-full bg-[#0A0B0E] border-t border-[#161A23] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-[#00E5FF]">
              Live Engine Core
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white mt-1">
              Platform Activity Matrix
            </h3>
          </div>
          <p className="text-sm text-gray-400 max-w-md font-medium leading-relaxed">
            Real-time metric telemetry streaming from our active community framework. Your efforts map directly into the network.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
            >
              <Card className={`bg-[#0F111A] border border-[#161A23] rounded-xl transition-all duration-300 p-2 group ${metric.glow}`}>
                
                {/* 1. Header Wrapper Block */}
                <Card.Header className="flex items-center justify-between gap-4 pb-2">
                  <div className="space-y-0.5">
                    <Card.Title className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      {metric.title}
                    </Card.Title>
                    <Card.Description className="text-[11px] font-semibold text-gray-400 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-current animate-ping" />
                      {metric.description}
                    </Card.Description>
                  </div>
                  <div className="p-2 rounded-lg bg-[#161A23]/60 border border-gray-800 transition-colors group-hover:bg-[#161A23]">
                    {metric.icon}
                  </div>
                </Card.Header>

                {/* 2. Main Payload Value Content Block */}
                <Card.Content className="pt-2 pb-4">
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                    {metric.value}
                  </h4>
                </Card.Content>

              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ActivityMatrix;