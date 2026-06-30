'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Envelope, MapPin, Handset } from '@gravity-ui/icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Classes', href: '/classes' },
    { name: 'Community Forum', href: '/forum' },
    { name: 'Dashboard', href: '/dashboard/user' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  // Modern, high-fidelity SVG icon definitions for the socials array
  const socialLinks = [
    {
      name: 'X (Twitter)',
      href: 'https://x.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/halimaashu',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ashkrahman/',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#0A0B0E] border-t border-[#161A23] text-gray-400 text-sm px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative top ambient glow to catch the eye */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-12 bg-[#00E5FF] opacity-[0.03] blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto pt-16 pb-8">
        
        {/* Main Footer Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-12 border-b border-[#161A23]">
          
          {/* Column 1: Identity Panel */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 select-none group">
              <motion.div 
                className="relative overflow-hidden rounded-lg p-0.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image 
                  src="/YongMan-logo.png" 
                  height={34} 
                  width={34} 
                  alt="YongMan Platform Logo"
                  className=""
                />
              </motion.div>
              <h2 className="text-base font-black tracking-widest text-white uppercase transition-all duration-300 group-hover:tracking-[0.2em]">
                Young<span className="text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">Man</span>
              </h2>
            </Link>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed tracking-wide">
              An optimized dark architectural playground designed to keep modern developers moving, scaling, and tracking physical wellness cycles.
            </p>
          </div>

          {/* Column 2: Quick Links Directory */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-4 after:h-[2px] after:bg-[#00E5FF]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-[#00E5FF] transition-all duration-200 hover:pl-1 flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Context */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-4 after:h-[2px] after:bg-[#00E5FF]">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs text-gray-400 font-medium">
              <li className="flex items-center gap-2.5 group">
                <MapPin className="text-[#00E5FF] opacity-80 group-hover:scale-110 transition-transform" width={14} height={14} />
                <span className="group-hover:text-gray-300 transition-colors">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5 group">
                <Handset className="text-[#00E5FF] opacity-80 group-hover:scale-110 transition-transform" width={14} height={14} />
                <span className="group-hover:text-gray-300 transition-colors">+880 1975665249</span>
              </li>
              <li className="flex items-center gap-2.5 group">
                <Envelope className="text-[#00E5FF] opacity-80 group-hover:scale-110 transition-transform" width={14} height={14} />
                <span className="truncate group-hover:text-gray-300 transition-colors">halima520ashu@gmail.com.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Enhanced Social Networks Section */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-4 after:h-[2px] after:bg-[#00E5FF]">
              Connect With Us
            </h4>
            <div className="flex items-center flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  isIconOnly
                  aria-label={social.name}
                  className="w-9 h-9 rounded-xl min-w-9 bg-[#12161F] text-gray-400 hover:text-[#00E5FF] border border-[#1E2433] hover:border-[#00E5FF]/40 hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300"
                  as={Link}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

        </div>

        {/* Lower Metadata Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
          <div>
            © {currentYear} <span className="text-gray-400 font-bold">YoungMan</span>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-gray-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;