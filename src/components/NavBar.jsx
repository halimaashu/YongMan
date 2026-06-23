'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Gravity UI Icons Integration
import { Bars, CircleXmarkFill, ArrowRightFromSquare, ArrowChevronRight } from '@gravity-ui/icons'; 
import { authClient } from '@/lib/auth-client';

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Authentication Context Placeholder Data
  // Replace these values later with: const { user, loading, logout } = useAuth();
  const { data: session } = authClient.useSession()
  // const user = {
  //   name: "Ashik",
  //   email: "ashik@yongman.com",
  //   role: "admin", // Options: "user" | "trainer" | "admin"
  //   image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
  // };
  const user=session?.user
  const loading = false;
  const logout =async () => {
    await authClient.signOut();
  };

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Classes', href: '/classes' },
    { name: 'Community Forum', href: '/forum' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#161A23] bg-[#0A0B0E]/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* 1. Brand Logo & Identity */}
          <Link href="/" className="flex items-center gap-2.5 group select-none">
            <div className="relative overflow-hidden rounded-lg p-0.5 transition-transform group-hover:scale-105">
              <Image 
                src="/YongMan-logo.png" 
                height={38} 
                width={38} 
                alt="YongMan Platform Logo"
                className="drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]"
              />
            </div>
            <h1 className="text-lg font-black tracking-widest text-white uppercase">
              Young<span className="text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">Man</span>
            </h1>
          </Link>

          {/* 2. Desktop Navigation Architecture */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-wider font-semibold transition-all duration-200 hover:text-[#00E5FF] ${
                  isActive(link.href) 
                    ? 'text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]' 
                    : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Conditional Role-Based Dashboard Pipeline */}
            {!loading && user && (
              <Link
                href={`/dashboard/${user.role}`}
                className={`text-xs uppercase tracking-wider font-semibold transition-all duration-200 hover:text-[#00E5FF] ${
                  isActive(`/dashboard/${user.role}`) 
                    ? 'text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]' 
                    : 'text-gray-400'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* 3. Authentication & User Status Panel (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#00E5FF] border-t-transparent"></div>
            ) : user ? (
              <div className="flex items-center gap-3 bg-[#161A23] pl-2 pr-3 py-1 rounded-full border border-gray-800/60">
                <div className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-[#00E5FF]/70">
                  <Image 
                    src={user.image} 
                    alt={`${user.name}'s profile avatar`} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col max-w-[90px]">
                  <span className="text-xs font-bold text-gray-200 truncate">{user.name}</span>
                  <span className="text-[9px] uppercase font-black text-[#00E5FF] tracking-widest">{user.role}</span>
                </div>
                <div className="w-[1px] h-4 bg-gray-700/60 mx-0.5" />
                <button 
                  onClick={logout}
                  className="text-gray-400 hover:text-red-400 transition-colors p-0.5"
                  title="Logout Session"
                >
                  <ArrowRightFromSquare width={14} height={14} />
                </button>
              </div>
            ) : (
              <Link 
                href="/logIn"
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold uppercase tracking-wider rounded-lg group bg-gradient-to-br from-[#00E5FF] to-blue-600 text-white transition-all hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]"
              >
                <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#0A0B0E] rounded-md group-hover:bg-opacity-0">
                  Login
                </span>
              </Link>
            )}
          </div>

          {/* 4. Mobile Adaptive Controller Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#161A23] hover:text-white transition-colors"
              aria-label="Toggle Main Menu"
            >
              {isOpen ? <CircleXmarkFill width={22} height={22} className="text-[#00E5FF]" /> : <Bars width={22} height={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Layout Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden border-t border-[#161A23] bg-[#0A0B0E] px-4 py-4 space-y-2.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
                isActive(link.href) 
                  ? 'bg-[#161A23] text-[#00E5FF]' 
                  : 'text-gray-400 hover:bg-[#161A23] hover:text-white'
              }`}
            >
              {link.name}
              <ArrowChevronRight width={14} height={14} className="opacity-40" />
            </Link>
          ))}

          {/* Mobile Dashboard Controller Integration */}
          {!loading && user && (
            <Link
              href={`/dashboard/${user.role}`}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
                isActive(`/dashboard/${user.role}`) 
                  ? 'bg-[#161A23] text-[#00E5FF]' 
                  : 'text-gray-400 hover:bg-[#161A23] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Dashboard</span>
                <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
                  {user.role}
                </span>
              </div>
              <ArrowChevronRight width={14} height={14} className="opacity-40" />
            </Link>
          )}

          {/* Mobile Profile & Action Layout */}
          <div className="pt-4 mt-2 border-t border-gray-800/60">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#00E5FF]">
                    <Image src={user.image} alt={user.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">{user.name}</h2>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-950/20 border border-red-500/20 px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-950/40 transition-colors"
                >
                  <ArrowRightFromSquare width={14} height={14} />
                  Logout Account
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full block text-center rounded-lg bg-gradient-to-r from-[#00E5FF] to-blue-600 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/10"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;