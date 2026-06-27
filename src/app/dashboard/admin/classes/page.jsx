import React from 'react';
import { getAllClass } from '@/lib/actions/api/class';
import ClassTable from '@/components/admin/ClassTable';


const Page = async () => {
    // Fetch data directly on the server
    const AllClass = await getAllClass() || [];
    
    return (
        <div className="min-h-screen bg-[#09090b] p-8 flex justify-center items-start">
            <div className="w-full max-w-7xl">
                <ClassTable initialClasses={AllClass} />
            </div>
        </div>
    );
};

export default Page;