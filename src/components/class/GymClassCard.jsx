'use strict';

import React from 'react';
import { Card } from "@heroui/react";
// Importing Gravity UI Icons
import { Calendar, Clock, Layers, Flame,CircleDollar } from '@gravity-ui/icons';
import Image from 'next/image';
import Link from 'next/link';

export default function GymClassCard({classData}) {
  // Your data object
//   const classData = {
//     _id: "6a3d3de47f538a0319d2307f",
//     className: "Ninja Warrior Training",
//     category: "adventure",
//     difficulty: "advanced",
//     duration: "4day/3Night",
//     price: "14000",
//     scheduleTime: "13:00",
//     description: "Obstacle course training inspired by TV ninja warrior challenges for ultimate agility and grit.",
//     scheduleDays: ["monday", "wednesday", "friday", "saturday"],
//     imageUrl: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop",
//     status: "approved",
//     userId: "6a3aed9c8050cef07d063957"
//   };

  // Capitalize helper for days/difficulty
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Card className="max-w-[400px] border border-default-200 bg-background/60 dark:bg-default-100/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden group">
      
      {/* Visual Header Image wrapper inside Card */}
      <div className="relative overflow-hidden h-[220px] w-full">
        <Image
          alt={classData.className}
          fill
          className="object-cover w-full h-full rounded-md transform transition-transform duration-500 group-hover:scale-110"
          src={classData.imageUrl}
        />
        {/* Difficulty and Category Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md bg-black/40 text-white border border-white/20 capitalize ${classData.difficulty === 'advanced' ? 'text-red-400' : 'text-primary'}`}>
            <Flame className="w-3.5 h-3.5 text-[#00E5FF]" />
            {classData.difficulty}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md bg-black/40 text-white border border-white/20 capitalize">
            {classData.category}
          </span>
        </div>
      </div>

      {/* 1. CARD HEADER */}
      <Card.Header className="px-5 pt-4 pb-2 flex flex-col items-start gap-1">
        {/* Card.Title contains Title and Price layout */}
        <Card.Title className="w-full flex justify-between items-start gap-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
          <span>{classData.className}</span>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-[#00E5FF] flex items-center">
            <CircleDollar fontSize={40} className="w-3.5 h-3.5 text-[#00E5FF]"/>
            {Number(classData.price).toLocaleString()}
          </span>
        </Card.Title>
        
        {/* Card.Description holds the duration subtitle */}
        <Card.Description className="text-xs font-medium text-default-400">
          Duration: {classData.duration}
        </Card.Description>
      </Card.Header>

      {/* 2. CARD CONTENT */}
      <Card.Content className="px-5 py-2 flex flex-col gap-4">
        {/* Main description paragraph */}
        <p className="text-sm text-default-500 line-clamp-2 leading-relaxed">
          {classData.description}
        </p>

        <hr className="border-default-100" />

        {/* Schedule metadata details */}
        <div className="grid grid-cols-2 gap-y-2 text-sm font-medium text-default-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00E5FF]" />
            <span>{classData.scheduleTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-xs truncate">
              {classData.scheduleDays.map(d => capitalize(d.slice(0, 3))).join(', ')}
            </span>
          </div>
        </div>
      </Card.Content>

      {/* 3. CARD FOOTER */}
      <Card.Footer className="px-5 pb-5 pt-2">
        <Link
        href={`/classes/${classData._id}`} 
          className="w-full bg-gradient-to-r from-[#00E5FF] to-violet-500 hover:from-[#00E5FF]0 hover:to-[#00E5FF] text-white font-bold rounded-xl py-3 shadow-lg shadow-orange-500/20 transition-all transform active:scale-98 cursor-pointer text-center text-sm"
          
        >
          View Detail
        </Link>
      </Card.Footer>
    </Card>
  );
}