import CommentSection from '@/components/forum/CommunityForumPage ';
import ForumPostCard from '@/components/forum/ForumPostCard';
import { getForumPostDetail } from '@/lib/actions/api/forum';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';


const forumDetailPage = async ({ params }) => {
    const { id } = await params;
    const forumPostDetail = await getForumPostDetail(id);

    const session=await auth.api.getSession({
        headers: await headers()
    })

    // Dynamic mock user session containing profile image details
    // const user = { 
    //     id: "user_123", 
    //     name: "Ashik",
    //     avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80" 
    // }; 
    const user=session?.user;
    const isAuthenticated = !!user;

    if (!forumPostDetail) {
        return <div className="text-center p-8 text-neutral-400">Post not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <ForumPostCard 
                post={forumPostDetail} 
                isAuthenticated={isAuthenticated} 
                userId={user?.id}
            />

            <CommentSection
                postId={id} 
                isAuthenticated={isAuthenticated} 
                currentUser={user}
            />
        </div>
    );
};

export default forumDetailPage;