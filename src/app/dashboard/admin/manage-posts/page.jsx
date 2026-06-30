import React from 'react';
import { getAllForum } from '@/lib/actions/api/forum';
import PostModerationTable from '@/components/admin/PostModerationTable';


const Page = async () => {
  // Fetch platform data from server action
  const allPost = (await getAllForum()) || [];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in text-zinc-100">
      <PostModerationTable initialPosts={allPost} />
    </div>
  );
};

export default Page;