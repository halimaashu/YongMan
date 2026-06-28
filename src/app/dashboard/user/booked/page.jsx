import BookedCallsTable from '@/components/class/BookedCallsTable';
import { myBookedClass } from '@/lib/actions/api/bookedClass';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const page =async () => {
    const session=await auth.api.getSession({
        headers: await headers()
    })
    const user=session?.user
    if(!user){
        redirect("/logIn")
    }
    console.log(user,"from booked class")
    const myClass=await myBookedClass(user.id)
    
    return (
        <div>
            <h1 className='text-2xl font-bold text-center'>My booked All Class</h1>
            <BookedCallsTable myClass={myClass} />
        </div>
    );
};

export default page;