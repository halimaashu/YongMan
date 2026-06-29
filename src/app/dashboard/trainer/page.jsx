
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

// HeroUI v3 Components (Dot-notation structure)
import { Card, Avatar, Chip, Separator } from "@heroui/react";

// Gravity UI Icons
import { GraduationCap, Display, Envelope, PersonFill } from '@gravity-ui/icons';
import { FetchServer } from '@/lib/actions/core/mutation';
import { myAllSellClass } from '@/lib/actions/api/bookedClass';
import PieChartWithCustomizedLabel from '@/components/admin/trainer/PieChartWithCustomizedLabel';

const TrainerPage = async () => {
    // Fetch user session safely on the server side
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user=session?.user
    const myClass = await FetchServer(`/api/myClass?userId=${user?.id}`);
    const myStudent=await myAllSellClass(user?.id)

    const totalClasses =myClass.length;
    const totalStudents = myStudent.length;
    
    const stats = { totalClasses, totalStudents }; 
    const trainerData = { ...session?.user, stats };

    // Fallbacks to avoid crashing
    const profileImage = trainerData?.image || trainerData?.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
    const trainerName = trainerData?.name || "Trainer User";
    const trainerEmail = trainerData?.email || "No email available";
    const trainerRole = trainerData?.role || "Trainer";

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 font-sans text-foreground transition-colors duration-300">
            
            {/* Header Section */}
            <header className="mb-6">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-default-900 via-default-800 to-default-700 dark:from-white dark:to-default-400 bg-clip-text text-transparent">
                    Dashboard Overview
                </h1>
                <p className="text-sm font-medium text-default-500 mt-1">
                    Welcome back, <span className="text-emerald-500 font-semibold">Coach!</span> Ready for todays sessions?
                </p>
            </header>

            <Separator className="my-6 bg-default-200/60 dark:bg-default-100/30" />

            {/* Profile & Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Profile Details Card */}
                <Card className="border border-default-100 bg-content1 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                    <Card.Header className="flex flex-row justify-between items-start pb-2">
                        <div className="flex flex-col">
                            <Card.Title className="text-lg font-bold text-foreground">Profile</Card.Title>
                            <Card.Description className="text-xs text-default-400">Your account metrics</Card.Description>
                        </div>
                        <Chip color="success" variant="flat" size="sm" className="font-bold uppercase tracking-wider">
                            {trainerRole}
                        </Chip>
                    </Card.Header>

                    <Card.Content className="py-4 flex items-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-emerald-500/20 shadow-sm rounded-full">
                            <Avatar.Image src={profileImage} alt={trainerName} className="object-cover" />
                            <Avatar.Fallback className="bg-emerald-500/10 text-emerald-500 font-semibold text-lg">
                                {trainerName.charAt(0)}
                            </Avatar.Fallback>
                        </Avatar>
                        
                        <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-foreground">
                                <PersonFill size={16} className="text-default-400 flex-shrink-0" />
                                <span className="text-sm font-bold truncate">{trainerName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-default-500">
                                <Envelope size={16} className="text-default-400 flex-shrink-0" />
                                <span className="text-xs font-medium truncate">{trainerEmail}</span>
                            </div>
                        </div>
                    </Card.Content>
                    
                    <Card.Footer className="pt-2 border-t border-default-100 text-xs text-default-400">
                        Profile synchronized via Auth
                    </Card.Footer>
                </Card>

                {/* Stat Card 1: Total Classes */}
                <Card className="border border-default-100 bg-content1 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                    <Card.Header className="flex items-center gap-4 pb-2">
                        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center ring-4 ring-emerald-500/5">
                            <Display size={22} />
                        </div>
                        <div>
                            <Card.Title className="text-sm font-semibold text-default-600 dark:text-default-300">Total Classes</Card.Title>
                            <Card.Description className="text-xs text-default-400 uppercase tracking-wider font-medium">Management</Card.Description>
                        </div>
                    </Card.Header>

                    <Card.Content className="py-4">
                        <div className="text-4xl font-black text-foreground tracking-tight">
                            {trainerData.stats.totalClasses}
                        </div>
                    </Card.Content>

                    <Card.Footer className="pt-2 border-t border-default-100 text-xs text-default-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                        Active sessions created
                    </Card.Footer>
                </Card>

                {/* Stat Card 2: Total Students */}
                <Card className="border border-default-100 bg-content1 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                    <Card.Header className="flex items-center gap-4 pb-2">
                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center ring-4 ring-blue-500/5">
                            <GraduationCap size={22} />
                        </div>
                        <div>
                            <Card.Title className="text-sm font-semibold text-default-600 dark:text-default-300">Total Students</Card.Title>
                            <Card.Description className="text-xs text-default-400 uppercase tracking-wider font-medium">Roster</Card.Description>
                        </div>
                    </Card.Header>

                    <Card.Content className="py-4">
                        <div className="text-4xl font-black text-foreground tracking-tight">
                            {trainerData.stats.totalStudents}
                        </div>
                    </Card.Content>

                    <Card.Footer className="pt-2 border-t border-default-100 text-xs text-default-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                        Enrolled across all classes
                    </Card.Footer>
                </Card>

            </div>
            <div className="mx-auto">
                <PieChartWithCustomizedLabel totalStudents={totalStudents}  totalClasses={totalClasses}/>
            </div>
        </div>
    );
};

export default TrainerPage;