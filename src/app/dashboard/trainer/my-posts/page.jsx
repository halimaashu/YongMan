import DelteteForumPostButton from "@/components/forum/DelteteForumPostButton";
import ForumPostCard from "@/components/forum/ForumPostCard";
import { getMyForum } from "@/lib/actions/api/forum";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import React from "react";

const MyPostPage = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  const user = userSession?.user;
  const myPostForum = await getMyForum(`?userId=${user?.id}`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 border-b border-divider pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-default-900">
          My Posts
        </h1>
        <p className="text-sm text-default-500 mt-1">
          Manage, review, or remove the forum topics you have created.
        </p>
      </div>

      {/* Grid Layout */}
      {myPostForum && myPostForum.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myPostForum.map((post) => (
            <div 
              key={post._id || post.id} 
              className="flex flex-col justify-between rounded-xl border border-divider bg-content1 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Forum Content Body */}
              <div className="flex-1">
                <ForumPostCard post={post} />
              </div>

              {/* Action Button Container */}
              <div className="mt-4 pt-4 border-t border-divider">
               <DelteteForumPostButton post={post}/>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center min-h-[300px] rounded-xl border border-dashed border-divider p-8 text-center bg-content2">
          <p className="text-default-500 font-medium">You haven't published any posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyPostPage;