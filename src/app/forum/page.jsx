// import CommunityForumPage from '@/components/forum/CommunityForumPage ';
import ForumPostCard from '@/components/forum/ForumPostCard';
import { getAllForum } from '@/lib/actions/api/forum';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const AllCommunityFromPage =async () => {
    const allForumPost=await getAllForum()
    console.log(allForumPost,"from forumpagesssssssssss")
    const session=await auth.api.getSession({
        headers: await headers()
    })
    const isAuthenticated=session?.user
    return (
        <div>
            thuis is foram pahes
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{
                allForumPost.map((post)=><ForumPostCard key={post._id} isAuthenticated={isAuthenticated} post={post}></ForumPostCard>)
                
                }</div>
        </div>
    );
};

export default AllCommunityFromPage;