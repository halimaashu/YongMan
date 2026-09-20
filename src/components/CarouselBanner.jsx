'use client';

import { Anton } from "next/font/google";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import Link from 'next/link';
import { ProgressBar } from '@heroui/react';

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const slides = [
  {
    id: 1,
    tag: 'OPEN 24 / 7',
    headingLine1: 'YOUR HOUR.',
    headingLine2: 'YOUR RULES.',
    description:
      'No queues, no closing time. Members train whenever the work calls — the floor never sleeps and neither do your goals.',
    primaryBtnText: 'CLAIM FREE SESSION',
    secondaryBtnText: 'EXPLORE PROGRAMS',
    image: '/image1.jpg',
  },
  {
    id: 2,
    tag: 'FIGHT CAMP',
    headingLine1: 'HIT FIRST.',
    headingLine2: 'HIT HARD.',
    description:
      'Bag work, pad rounds and conditioning built by former fighters. Sweat out the day in sixty raw minutes.',
    primaryBtnText: 'JOIN FIGHT CAMP',
    secondaryBtnText: 'EXPLORE PROGRAMS',
    image: '/image2.jpg',
  },
  {
    id: 3,
    tag: 'STRENGTH CLUB',
    headingLine1: 'LIFT HEAVY.',
    headingLine2: 'LIVE LIGHTER.',
    description:
      'Barbell-first programming with coaches who count every rep. Build real strength that carries into everything else.',
    primaryBtnText: 'START LIFTING',
    secondaryBtnText: 'EXPLORE PROGRAMS',
    image: '/image3.jpg',
  },
];

const CarouselBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  // Progress Bar and Auto-play timer
  useEffect(() => {
    const stepTime = 50; // Update progress every 50ms
    const totalDuration = 6000; // 6 seconds per slide
    const increment = (stepTime / totalDuration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <div className={`${anton.variable} relative w-full h-[85vh] min-h-[550px] bg-black text-white overflow-hidden flex items-center select-none`}>
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.headingLine1}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            {/* Vignette gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col items-start space-y-6">
        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 border border-zinc-700/80 bg-black/40 backdrop-blur-sm px-3 py-1 text-xs tracking-widest font-mono text-zinc-300 uppercase">
          <span className="h-2 w-2 rounded-full bg-[#ff551f] animate-pulse"></span>
          <span>{currentSlide.tag}</span>
        </div>

        {/* Dynamic Main Headings using Anton Font */}
        <div className="font-[family-name:var(--font-anton)] uppercase leading-none text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight">
          <div className="text-white">{currentSlide.headingLine1}</div>
          <div className="text-[#ff551f]">{currentSlide.headingLine2}</div>
        </div>

        {/* Description */}
        <p className="max-w-xl text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
          {currentSlide.description}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap gap-4 items-center">
          <Link href="/logIn">
            <button className="bg-[#ff551f] hover:bg-[#e04412] text-black font-bold uppercase tracking-wider text-sm px-6 py-3.5 transition duration-200 rounded-md">
              {currentSlide.primaryBtnText}
            </button>
          </Link>
          <Link href="/classes">
            <button className="bg-transparent hover:bg-white/10 border border-zinc-600 text-white font-bold uppercase tracking-wider text-sm px-6 py-3.5 transition duration-200 rounded-md">
              {currentSlide.secondaryBtnText}
            </button>
          </Link>
        </div>
      </div>

      {/* Top Hero UI Progress Bar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <ProgressBar value={progress} aria-label="Slide Progress" className="w-full">
          <ProgressBar.Track className="h-1 bg-white/10 rounded-none">
            <ProgressBar.Fill className="bg-[#ff551f] transition-all duration-75 ease-linear" />
          </ProgressBar.Track>
        </ProgressBar>
      </div>

      {/* Navigation Controls (Gravity UI Icons) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white flex items-center justify-center transition-all duration-200 focus:outline-none"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white flex items-center justify-center transition-all duration-200 focus:outline-none"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setProgress(0);
            }}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentIndex ? 'w-8 bg-[#ff551f]' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselBanner;