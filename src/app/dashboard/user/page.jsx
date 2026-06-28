import { myBookedClass } from '@/lib/actions/api/bookedClass';
import { auth } from '@/lib/auth';
import { HeartFill, TerminalLine } from '@gravity-ui/icons';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const UserOverViewPage =async () => {
    const session=await auth.api.getSession({
        headers: await headers()
    })
    const id=session?.user?.id
    console.log(id,"from user dashboard")
    const myClass=await myBookedClass(id)
    console.log(myClass,"from my user detail pages")
    return (
        <div>
          <div className="md:flex justify-center gap-5 ">
            <div className="border p-20">
                
                <h1 className='flex items-center gap-2 text-2xl'> Total booked class</h1>
               <h1 className='text-2xl flex items-center gap-3'> <TerminalLine className='text-green-500'/> {myClass.length}</h1>

            </div>
            <div className="border p-20">
               <h1 className='text-2xl font-medium'> Total favorite Class</h1>
                <HeartFill className='text-red-600'/>
            </div>
           
          </div>
             <div className="border p-20">
               <h1 className='text-2xl font-bold'> trainer application state    </h1>
               <h1 className='text-2xl'> reasons:</h1>

            </div>
            <div className="profile">
                <Image
                height={50}
                width={50}
                src={'/YongMan-logo.png'}
                alt='user image'
                className='rounded-full mx-auto'/>
               <div className="flex items-center gap-2.5 mx-auto">
                 <h1 className='text-2xl font-bold text-center'>user nmae</h1>
                 <h1 className='border border-green-500  inline p-1 rounded-md'>user role</h1>
               </div>

                
            </div>
        </div>
    );
};

export default UserOverViewPage;