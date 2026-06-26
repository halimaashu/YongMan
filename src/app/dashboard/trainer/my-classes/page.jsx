import GymClassCard from "@/components/class/GymClassCard";
import { FetchServer } from "@/lib/actions/core/mutation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const TrainerOwmClassPage = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  
  console.log(userSession?.user);
  const user = userSession?.user;
  
  // Fetch class arrays safely based on user context identity
  const myClass = await FetchServer(`/api/myClass?userId=${user?.id}`);
  console.log(myClass, "from my class pages");

  // Determine if we have actual valid class items to render
  const hasClasses = Array.isArray(myClass) && myClass.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Class Pages</h1>
      
      {hasClasses ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myClass.map((classData) => {
            return <GymClassCard key={classData._id} classData={classData} />;
          })}
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col justify-center items-center rounded-xl border border-dashed border-default-200 p-8">
          <h2 className="text-xl font-medium text-default-600 text-center">
            You havent added any classes yet.
          </h2>
        </div>
      )}
    </div>
  );
};

export default TrainerOwmClassPage;