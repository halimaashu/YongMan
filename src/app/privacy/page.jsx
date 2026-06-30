import React from 'react';
import { Card } from "@heroui/react";
import { ShieldCheck, Eye, Lock, FileText, ArrowLeft } from '@gravity-ui/icons';

export default function PrivacyPage() {
  const lastUpdated = "June 30, 2026";

  const policySections = [
    {
      icon: <Eye className="w-5 h-5 text-emerald-400" />,
      title: "1. Information We Collect",
      description: "We collect information you provide directly to us when creating an account, publishing community forum posts, or communicating with platform administration. This includes your name, profile image, and email address."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      title: "2. How We Use Your Data",
      description: "Your information is utilized to maintain your account profile, safely render your community actions, handle moderation requirements efficiently, and ensure compliance with platform guidelines."
    },
    {
      icon: <Lock className="w-5 h-5 text-rose-400" />,
      title: "3. Data Security & Retention",
      description: "We employ industry-standard security mechanics to protect your credentials. Forum data remains active on our platform until deleted by you or removed by an authorized administrator."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="space-y-3 border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-2 text-zinc-500 text-sm font-semibold tracking-wide uppercase">
            <FileText className="w-4 h-4" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* POLICY CONTENT LOOP */}
        <div className="space-y-4">
          {policySections.map((section, index) => (
            <Card 
              key={index} 
              className="border border-zinc-900 bg-zinc-950/40 backdrop-blur-md rounded-2xl shadow-sm hover:border-zinc-800 transition-all duration-200"
            >
              <Card.Header className="flex items-center gap-3 p-5 border-b border-zinc-900/40">
                <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800/60 flex items-center justify-center">
                  {section.icon}
                </div>
                <div>
                  <Card.Title className="text-base sm:text-lg font-bold text-zinc-100">
                    {section.title}
                  </Card.Title>
                </div>
              </Card.Header>
              <Card.Content className="p-5 pt-4">
                <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                  {section.description}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* COMPLIANCE NOTE FOOTER */}
        <div className="text-center pt-4">
          <p className="text-xs text-zinc-600 max-w-md mx-auto">
            By using this platform, you acknowledge and agree to the terms listed in this privacy document. For further administration queries, contact support.
          </p>
        </div>

      </div>
    </div>
  );
}