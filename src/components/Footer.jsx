'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Envelope, MapPin, Handset ,Xmark} from '@gravity-ui/icons';

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

  // Modern Minimal Custom SVG for the X Platform Logo
  const XLogo = () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  return (
    <footer className="w-full bg-[#0A0B0E] border-t border-[#161A23] text-gray-400 text-sm px-4 sm:px-6 lg:px-8">
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
                  className="drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]"
                />
              </motion.div>
              <h2 className="text-base font-black tracking-widest text-white uppercase">
                Yong<span className="text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">Man</span>
              </h2>
            </Link>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed tracking-wide">
              An optimized dark architectural playground designed to keep modern developers moving, scaling, and tracking physical wellness cycles.
            </p>
          </div>

          {/* Column 2: Quick Links Directory */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-[#00E5FF] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Context */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs text-gray-400 font-medium">
              <li className="flex items-center gap-2.5">
                <MapPin className="text-[#00E5FF] opacity-80" width={14} height={14} />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Handset className="text-[#00E5FF] opacity-80" width={14} height={14} />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Envelope className="text-[#00E5FF] opacity-80" width={14} height={14} />
                <span className="truncate">support@yongman.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Networks & Channels */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest">
              Channels
            </h4>
            <div className="flex items-center gap-2">
              {/* X Platform Interaction Target */}
              <Button
                isIconOnly
                aria-label="X Profile"
                className="w-8 h-8 rounded-lg min-w-8 bg-[#161A23] text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 transition-all duration-300"
                as={Link}
                href="https://x.com"
                target="_blank"
              >
                <Xmark />
              </Button>
            </div>
          </div>

        </div>

        {/* Lower Metadata Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
          <div>
            © {currentYear} <span className="text-gray-400 font-bold">YongMan</span>. All Rights Reserved.
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