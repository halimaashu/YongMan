import React from 'react';
import { Card } from "@heroui/react";
import { ScalesBalanced, Person, CircleCheck, TriangleExclamation, FileText } from '@gravity-ui/icons';

export default function TermsPage() {
  const lastUpdated = "June 30, 2026";

  const termsSections = [
    {
      icon: <Person className="w-5 h-5 text-blue-400" />,
      title: "1. User Accounts & Eligibility",
      description: "When creating an account on our platform, you agree to provide accurate, up-to-date credentials. You are entirely responsible for safeguarding your account access data and monitoring all activity under your profile."
    },
    {
      icon: <CircleCheck className="w-5 h-5 text-emerald-400" />,
      title: "2. Acceptable Platform Use",
      description: "Users are free to participate in community forums. However, posting inappropriate, defamatory, or copyright-infringing material is strictly prohibited. Management reserves the right to moderate or remove any content without notice."
    },
    {
      icon: <TriangleExclamation className="w-5 h-5 text-amber-400" />,
      title: "3. Content Moderation & Deletion",
      description: "Platform administrators retain absolute authority to enforce guidelines. Inappropriate actions or repeated violation of our community standards can result in post deletion, temporary restrictions, or permanent account termination."
    },
    {
      icon: <ScalesBalanced className="w-5 h-5 text-purple-400" />,
      title: "4. Limitation of Liability",
      description: "This service is provided on an 'as-is' and 'as-available' basis. We make no guarantees regarding uninterrupted runtimes or total server uptime, and hold no liability for user-generated content published in open forums."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="space-y-3 border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-2 text-zinc-500 text-sm font-semibold tracking-wide uppercase">
            <FileText className="w-4 h-4" />
            <span>Platform Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* TERMS SECTIONS LOOP */}
        <div className="space-y-4">
          {termsSections.map((section, index) => (
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

        {/* FOOTER ACCEPTANCE NOTE */}
        <div className="text-center pt-4">
          <p className="text-xs text-zinc-600 max-w-md mx-auto">
            By continuing to access or use our web application, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please refrain from using the platform.
          </p>
        </div>

      </div>
    </div>
  );
}