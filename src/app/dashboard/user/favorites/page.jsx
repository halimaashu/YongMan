import FavoriteClassTable from '@/components/admin/user/FavoriteClassTable';
import GymClassCard from '@/components/class/GymClassCard';
import { getAllFavoriteClass } from '@/lib/actions/api/favorite';
import { auth } from '@/lib/auth';
import { redirect } from 'next/dist/server/api-utils';
import { headers } from 'next/headers';
import React from 'react';

const page =async () => {
    const session=await auth.api.getSession({
        headers: await headers()
    })
    const user=session?.user
    if(!user){
        redirect("/signIn")
        return

    }
    const getFavoriteClass=await getAllFavoriteClass(user?.id)
    console.log(getFavoriteClass,"my favorite class")
    return (
        <div>
           <FavoriteClassTable data={getFavoriteClass}/>
        </div>
    );
};

export default page;