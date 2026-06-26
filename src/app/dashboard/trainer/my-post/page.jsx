

import {  getMyForum } from '@/lib/actions/api/forum';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyPostPage =async () => {

 const userSession=await auth.api.getSession({
        headers: await headers()
    })
    const user=userSession?.user
    const myPostForum=await getMyForum(`?userId=6a3aed9c8050cef07d063957`)
    console.log(myPostForum)
console.log(userSession?.user)
    return (
        <div>
           <h1> my post pages</h1> 
        </div>
    );
};

export default MyPostPage;