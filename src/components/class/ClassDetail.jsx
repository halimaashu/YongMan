'use client';

import React from 'react';
import { Card, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { Clock, Calendar, Flame, Layers, CircleDollar } from '@gravity-ui/icons';
import Image from 'next/image';

// Framer motion variants for clean staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ClassDetail({ classDetail }) {
    console.log(classDetail,"from my de-----------------")
  
  const handleBooking = () => {
    alert(`Booking initialized for ${classDetail.className}!`);
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Animated Image Wrapper */}
          <motion.div variants={itemVariants} className="w-full h-[300px] md:h-[450px] relative overflow-hidden rounded-2xl shadow-md">
            <Image
              fill
              src={classDetail.imageUrl}
              alt={classDetail.className}
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </motion.div>

          {/* Title & Badges */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Chip color="primary" variant="flat" className="capitalize">
                {classDetail.category}
              </Chip>
              <Chip 
                color={classDetail.difficulty === 'beginner' ? 'success' : 'warning'} 
                variant="dot" 
                className="capitalize"
              >
                {classDetail.difficulty}
              </Chip>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {classDetail.className}
            </h1>
          </motion.div>

          <hr className="border-divider" />

          {/* Description Section */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-xl font-semibold">About this class</h2>
            <p className="text-default-600 leading-relaxed">{classDetail.description}</p>
          </motion.div>

          <hr className="border-divider" />

          {/* Schedule Specs Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-default-50 rounded-xl">
              <span className="text-primary text-xl"><Clock className='text-green-600' /></span>
              <div>
                <p className="text-xs text-default-400 font-medium">Duration</p>
                <p className="text-sm font-semibold">{classDetail.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-default-50 rounded-xl">
              <span className="text-primary text-xl"><Flame  className='text-red-600'/></span>
              <div>
                <p className="text-xs text-default-400 font-medium">Time</p>
                <p className="text-sm font-semibold">{classDetail.scheduleTime} Class</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-default-50 rounded-xl col-span-2">
              <span className="text-primary text-xl"><Calendar className='text-[#00E5FF]' /></span>
              <div>
                <p className="text-xs text-default-400 font-medium">Days Available</p>
                <p className="text-sm font-semibold capitalize">
                  {classDetail.scheduleDays?.join(', ')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Dynamic Sticky Action Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="sticky top-6 border border-divider shadow-sm">
            <Card.Header className="flex flex-col items-start gap-1 p-6 pb-0">
              <Card.Title className="text-default-500 font-medium text-sm">
                Total Price
              </Card.Title>
              {/* FIX 1: Changed inner elements to spans to safely nest inside Card.Description */}
              <Card.Description className="w-full">
                <span className="flex items-center text-3xl font-bold text-[#00E5FF]">
                  <CircleDollar className="w-6 h-6 mr-1" />
                  <span>{classDetail.price}</span>
                </span>
              </Card.Description>
            </Card.Header>

            {/* FIX 2: Replaced custom text inner layouts with clean structural div configurations */}
            <Card.Content className="p-6 space-y-4">
              <hr className="border-divider" />
              <div className="space-y-3 text-sm text-default-600">
                <div className="flex justify-between">
                  <span>Standard Registration</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-success font-medium capitalize">{classDetail.status}</span>
                </div>
              </div>
            </Card.Content>

            <Card.Footer className="p-6 pt-0 flex flex-col gap-2">
              {/* MUST HAVE: Book Now Button */}
              <form action={"/api/payment"} method='POST'>
     
              <input type='hidden' name="price" value={classDetail.price} readOnly />
              <input type='hidden' name="title" value={classDetail.className} readOnly />
              <input type='hidden' name="productId" value={classDetail._id} readOnly />
                  <Button 
                  type='submit'
                color="primary" 
                size="lg" 
                className="w-full font-bold shadow-lg shadow-primary/20"
                onClick={handleBooking}
              >
                Book Now
              </Button>
              </form>
            
              <span className="text-center text-xs text-default-400 w-full mt-1">
                Instant confirmation • Secure checkout
              </span>
            </Card.Footer>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  );
}