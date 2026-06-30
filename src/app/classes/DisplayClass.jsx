"use client"

import GymClassCard from "@/components/class/GymClassCard";

const DisplayClass = ({ classes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {classes?.map((singleClass) => (
        <GymClassCard key={singleClass._id} classData={singleClass} />
      ))}
    </div>
  );
};

export default DisplayClass;