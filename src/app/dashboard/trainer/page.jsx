import React from 'react';
import Image from 'next/image';
// Importing Gravity UI Icons
import { GraduationCap, Display, Envelope, PersonFill } from '@gravity-ui/icons';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const TrainerPage = async () => {
    // Fetch user session safely on the server side
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const totalClasses = 10;
    const totalStudents = 100;
    
    // Named 'stats' to match the template keys used below
    const stats = { totalClasses, totalStudents }; 
    const trainerData = { ...session?.user, stats };

    // Fallbacks to avoid crashing if user values are missing or null
    const profileImage = trainerData?.image || trainerData?.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
    const trainerName = trainerData?.name || "Trainer User";
    const trainerEmail = trainerData?.email || "No email available";
    const trainerRole = trainerData?.role || "Trainer";

    return (
        <div className="max-w-7xl mx-auto p-6 font-sans ]">
            {/* Header Section */}
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold ">Dashboard Overview</h1>
                <p className="text-sm text-slate-500 mt-1">Welcome back, coach!</p>
            </header>

            <hr className="border-slate-200 mb-8" />

            {/* Profile & Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Profile Details Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100">
                            <Image 
                                src={profileImage} 
                                alt={trainerName} 
                                fill
                                sizes="64px"
                                className="object-cover"
                                priority // Speeds up LCP for above-the-fold content
                            />
                        </div>
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                            {trainerRole}
                        </span>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-slate-700">
                            <PersonFill size={18} className="text-slate-400" />
                            <span className="text-sm font-semibold">{trainerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Envelope size={18} className="text-slate-400" />
                            <span className="text-sm truncate">{trainerEmail}</span>
                        </div>
                    </div>
                </div>

                {/* Stat Card 1: Total Classes */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-50 rounded-lg flex items-center justify-center">
                            <Display size={24} className="text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">Total Classes</span>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900 tracking-tight">
                            {trainerData.stats.totalClasses}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Active sessions created</p>
                    </div>
                </div>

                {/* Stat Card 2: Total Students */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-center">
                            <GraduationCap size={24} className="text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">Total Students</span>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900 tracking-tight">
                            {trainerData.stats.totalStudents}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Enrolled across all classes</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrainerPage;