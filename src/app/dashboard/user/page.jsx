import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { myBookedClass } from '@/lib/actions/api/bookedClass';
import { getAllFavoriteClass } from '@/lib/actions/api/favorite';
import { myTrainerForm } from '@/lib/actions/api/user';
import OverviewClientWrapper from '@/components/admin/user/OverviewClientWrapper';

const UserOverViewPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const id = session?.user?.id;
  const user = session?.user;

  // Fetch data in parallel
  const [myClass, myFavoriteClass, myFormArray] = await Promise.all([
    id ? myBookedClass(id) : Promise.resolve([]),
    id ? getAllFavoriteClass(id) : Promise.resolve([]),
    id ? myTrainerForm(id) : Promise.resolve([])
  ]);

  const bookedCount = myClass?.length || 0;
  const favoriteCount = myFavoriteClass?.length || 0;

  // Safely ensure we have a valid array to pass
  const applicationsList = Array.isArray(myFormArray) ? myFormArray : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <header className="mb-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          Dashboard Overview
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Welcome back! Here is what is happening with your account.
        </p>
      </header>

      <OverviewClientWrapper 
        user={user}
        bookedCount={bookedCount}
        favoriteCount={favoriteCount}
        applicationsList={applicationsList}
      />
    </div>
  );
};

export default UserOverViewPage;