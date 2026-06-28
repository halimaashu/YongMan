'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from "@heroui/react";
import { motion } from 'framer-motion';
import { HeartFill, TerminalLine, Person, FileQuestion, ShieldCheck } from '@gravity-ui/icons';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
};

export default function OverviewClientWrapper({
  user,
  bookedCount,
  favoriteCount,
  applicationsList = []
}) {
  
  // 1. Sort applications to ensure the absolute newest application is displayed first
  const sortedApplications = [...applicationsList].sort((a, b) => {
    return new Date(b.createAt || 0) - new Date(a.createAt || 0);
  });

  // 2. The primary status to display is the latest one
  const latestApplication = sortedApplications[0];
  const overallStatus = latestApplication?.status || "Not Applied";

  // Dynamic status colors helper function
  const getStatusColor = (status) => {
    switch (String(status || '').toLowerCase().trim()) {
      case 'approved': 
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50';
      case 'pending': 
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50';
      case 'rejected': 
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50';
      default: 
        return 'bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-400';
    }
  };

  // Helper to safely format string dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return "Recent";
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
    >
      
      {/* ================= STATISTICS SECTION ================= */}
      <motion.div variants={itemVariants} className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Card className="shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-md transition-shadow">
          <Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <Card.Title className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Booked Classes</Card.Title>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-950/40 rounded-lg">
              <TerminalLine className="text-green-600 dark:text-green-400 w-5 h-5" />
            </div>
          </Card.Header>
          <Card.Content className="pt-2">
            <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{bookedCount}</div>
          </Card.Content>
          <Card.Footer className="text-xs text-neutral-400 dark:text-neutral-500 pt-0">Live updated schedules</Card.Footer>
        </Card>

        <Card className="shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-md transition-shadow">
          <Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <Card.Title className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Favorites</Card.Title>
            </div>
            <div className="p-2 bg-red-50 dark:bg-red-950/40 rounded-lg">
              <HeartFill className="text-red-600 dark:text-red-400 w-5 h-5" />
            </div>
          </Card.Header>
          <Card.Content className="pt-2">
            <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{favoriteCount}</div>
          </Card.Content>
          <Card.Footer className="text-xs text-neutral-400 dark:text-neutral-500 pt-0">Pinned to your interest boards</Card.Footer>
        </Card>
      </motion.div>

      {/* ================= PROFILE DETAILS CARD ================= */}
      <motion.div variants={itemVariants} className="md:row-span-2">
        <Card className="shadow-sm border border-neutral-100 dark:border-neutral-800 h-full">
          <Card.Header className="flex flex-col items-center pt-8 pb-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <Image
                height={85}
                width={85}
                src={user?.image || '/YongMan-logo.png'}
                alt="profile picture"
                className="relative rounded-full border-2 border-white dark:border-neutral-900 object-cover aspect-square shadow-sm"
              />
            </div>
            <Card.Title className="mt-4 text-xl font-bold text-neutral-900 dark:text-neutral-50 text-center">
              {user?.name || "Anonymous User"}
            </Card.Title>
          </Card.Header>

          <Card.Content className="space-y-4 px-6 py-2 border-t border-b border-neutral-50 dark:border-neutral-800/60">
            <div className="flex items-center gap-3 text-sm">
              <Person className="text-neutral-400 w-4 h-4 shrink-0" />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-600 dark:text-neutral-300">
                {user?.email || "No email assigned"}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
                <ShieldCheck className="text-neutral-400 w-4 h-4" />
                <span>Account Role</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50 capitalize">
                {user?.role || "User"}
              </span>
            </div>
          </Card.Content>
          <Card.Footer className="bg-neutral-50/50 dark:bg-neutral-900/30 px-6 py-4">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">● Active Access</span>
          </Card.Footer>
        </Card>
      </motion.div>

      {/* ================= TRAINER APPLICATION LOGS SECTION (LOOP) ================= */}
      <motion.div variants={itemVariants} className="md:col-span-2 space-y-4">
        <Card className="shadow-sm border border-neutral-100 dark:border-neutral-800">
          <Card.Header className="flex flex-row items-center justify-between pb-3">
            <div>
              <Card.Title className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                Trainer Application History
              </Card.Title>
              <Card.Description className="text-xs text-neutral-400">
                Review your current state and all past submissions ({sortedApplications.length})
              </Card.Description>
            </div>
            <div className={`text-xs font-medium px-3 py-1 rounded-md border uppercase tracking-wider ${getStatusColor(overallStatus)}`}>
              Current: {overallStatus}
            </div>
          </Card.Header>

          <Card.Content className="pt-2 pb-4 space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {sortedApplications.length === 0 ? (
              <p className="text-sm text-neutral-400 dark:text-neutral-500 italic py-4">
                You have not initiated any trainer applications yet.
              </p>
            ) : (
              // looping through all application items securely using standard .map loop
              sortedApplications.map((app, index) => {
                const appStatus = String(app.status || '').toLowerCase().trim();
                
                return (
                  <div 
                    key={app._id || index} 
                    className={`p-4 rounded-xl border transition-all ${
                      index === 0 
                        ? 'border-neutral-200 bg-neutral-50/60 dark:border-neutral-800 dark:bg-neutral-900/40 ring-1 ring-neutral-200 dark:ring-neutral-800' 
                        : 'border-neutral-100 dark:border-neutral-800/40 bg-transparent opacity-75'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-400 uppercase">
                          {index === 0 ? '★ Latest Request' : `Submission #${sortedApplications.length - index}`}
                        </span>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border uppercase ${getStatusColor(app.status)}`}>
                        {app.status || 'Pending'}
                      </span>
                    </div>

                    {/* Data Items Display */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3 text-neutral-600 dark:text-neutral-300">
                      <div>
                        <span className="text-neutral-400 block">Specialty:</span>
                        <span className="font-semibold capitalize text-neutral-800 dark:text-neutral-200">{app.specialty || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Experience:</span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">{app.experience || 0} Years</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-neutral-400 block">Date Filed:</span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formatDate(app.createAt)}</span>
                      </div>
                    </div>

                    {/* Feedback Conditional Rendering based on status type inside the loop */}
                    {appStatus === 'rejected' && (
                      <div className="mt-2 rounded-lg bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100/70 dark:border-rose-900/20 p-3">
                        <div className="text-xs font-semibold text-rose-800 dark:text-rose-400 flex items-center gap-1.5">
                          <FileQuestion className="w-3.5 h-3.5" />
                          Admin Feedback:
                        </div>
                        <p className="mt-1 text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
                          {app.feedback || "Your details were reviewed. Please correct your experience requirements and try re-submitting."}
                        </p>
                      </div>
                    )}

                    {appStatus === 'pending' && index === 0 && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-1">
                        ⚡ This submission is actively being processed by support staff.
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </Card.Content>
          <Card.Footer className="hidden" />
        </Card>
      </motion.div>

    </motion.div>
  );
}