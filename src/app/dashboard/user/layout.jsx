import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const userLayout =async ({children}) => {
    const session=await auth.api.getSession({
        headers: await headers()
    })
    const user= session?.user
    console.log(user)
    if(!user ||  user.role !=="user" ){
        redirect("/logIn")
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default userLayout;