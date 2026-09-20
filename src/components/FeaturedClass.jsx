import React from 'react';
import GymClassCard from './class/GymClassCard';
import { getAllApprovedClass } from '@/lib/actions/api/class';
import Link from 'next/link';

const FeaturedClass =async () => {
 const classs=await getAllApprovedClass()
 const allClass=classs.data.slice(-6)
 

    return (
        <div className='mx-auto w-11/12'>
            <h1 className='text-[#ff551f] font-bold text-center m-5'>. FEATURED CLASS .</h1>
            <div className= " grid md:grid-cols-2  lg:grid-cols-3 gap-5 p-3 ">
                {
                    allClass?.map((singleClass)=> (
                        <GymClassCard key={singleClass._id} classData={singleClass}/>
                    ))
                }
            </div>
            <Link href={"/classes"}>
            <button className='text-white font-medium bg-[#ff551f] rounded-md border-none px-10 py-3 mx-auto flex items-center justify-center mt-10'>
                Browse all Class
            </button>
            </Link>

        </div>
    );
};

export default FeaturedClass;