// @/app/forum/page.js (or wherever your path is)
import ForumPostCard from '@/components/forum/ForumPostCard';

import { getAllForum } from '@/lib/actions/api/forum';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const AllCommunityFromPage = async () => {
    const allForumPost = await getAllForum();
    
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const isAuthenticated = session?.user;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-divider pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl bg-gradient-to-r from-foreground to-zinc-500 bg-clip-text text-transparent">
                        Community Forum
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Share your fitness journey, routines, and expert knowledge with the squad.
                    </p>
                </div>
                {/* Optional: Add a "Create Post" button here if authenticated */}
                {isAuthenticated && (
                    <button className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-xl text-sm transition-opacity hover:opacity-90">
                        Create Post
                    </button>
                )}
            </div>

            {/* Responsive Post Grid */}
            {allForumPost && allForumPost.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allForumPost.map((post) => (
                        <ForumPostCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border border-dashed border-divider rounded-2xl">
                    <p className="text-zinc-500 text-lg">No forum posts found yet. Be the first to post!</p>
                </div>
            )}
        </div>
    );
};

export default AllCommunityFromPage;