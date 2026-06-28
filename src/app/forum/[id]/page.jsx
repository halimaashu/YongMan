import { getForumPostDetail } from '@/lib/actions/api/forum';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { Card, Avatar, Button, Divider, Input, Textarea, Separator, TextArea } from "@heroui/react";
// Assuming gravity-ui icons are imported like this, change paths if needed
import { Heart, ThumbsDown, TrashBin, Pencil, Reply, ArrowUpRight, ArrowsRotateRight } from '@gravity-ui/icons';

const forumDetailPage = async ({ params }) => {
    const { id } = await params;
    
    // 1. Authentication Guard
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    if (!user) {
        redirect('/login'); // Redirect to your login route
    }

    // 2. Fetch Data
    const post = await getForumPostDetail(id);

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
                <p className="text-xl font-semibold text-zinc-400">Post not found</p>
            </div>
        );
    }

    // Format Date nicely
    const formattedDate = new Date(post.createAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 animate-fade-in">
            {/* Main Post Card */}
            <Card className="border border-zinc-100 dark:border-zinc-800 shadow-xl bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-950 overflow-hidden">
                
                {/* Hero Post Image */}
                {post.image && (
                    <div className="relative w-full h-[250px] sm:h-[400px] overflow-hidden group">
                        <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                )}

                {/* Card Header: Author Profile & Metadata */}
                <Card.Header className="flex flex-col items-start gap-4 p-6 pb-2">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <Avatar 
                                src={post.authorImage} 
                                name={post.authorName} 
                                size="md"
                                className="ring-2 ring-primary/20"
                            />
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base leading-none">
                                    {post.authorName}
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                    {post.authorRole} • {formattedDate}
                                </p>
                            </div>
                        </div>
                        
                        {/* Optional Role Badge */}
                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium tracking-wide">
                            {post.authorRole}
                        </span>
                    </div>

                    <Separator className="my-2 opacity-50" />

                    <div>
                        <Card.Title className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2 leading-tight">
                            {post.title}
                        </Card.Title>
                    </div>
                </Card.Header>

                {/* Card Content: The Post body */}
                <Card.Content className="px-6 py-4">
                    <p className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-normal">
                        {post.description}
                    </p>
                </Card.Content>

                {/* Card Footer: Interaction Engine */}
                <Card.Footer className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Upvote/Like */}
                        <Button 
                            size="sm" 
                            variant="flat" 
                            color="danger"
                            className="font-semibold rounded-xl hover:scale-105 transition-transform"
                            startContent={<Heart className="w-4 h-4 fill-current" />}
                        >
                            Like
                        </Button>

                        {/* Downvote/Dislike */}
                        <Button 
                            size="sm" 
                            variant="flat"
                            className="font-semibold rounded-xl text-zinc-600 dark:text-zinc-400 hover:scale-105 transition-transform"
                            startContent={<ThumbsDown className="w-4 h-4" />}
                        >
                            Dislike
                        </Button>
                    </div>

                    <div className="text-xs text-zinc-400 font-medium">
                        Logged in as <span className="text-zinc-600 dark:text-zinc-200 font-semibold">{user.name || user.email}</span>
                    </div>
                </Card.Footer>
            </Card>

            {/* Discussion Section */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 px-1">
                    Discussion <span className="text-sm font-normal text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">3 Comments</span>
                </h3>

                {/* Create Comment Form */}
                <Card className="p-4 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <Card.Content className="space-y-3 p-0">
                        <div className="flex gap-3 items-start">
                            <Avatar src={user.image} name={user.name} size="sm" className="mt-1" />
                            <TextArea
                                minrows={2}
                                placeholder="Share your insights or ask a question..."
                                className="w-full"
                                variant="bordered"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button color="primary" size="sm" className="font-semibold rounded-xl shadow-lg shadow-primary/20" endContent={<ArrowUpRight className="w-4 h-4" />}>
                                Comment
                            </Button>
                        </div>
                    </Card.Content>
                </Card>

                {/* Mock Comments Stream (Replace with dynamic array map later) */}
                <div className="space-y-4 mt-6">
                    <div className="flex gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-200 dark:hover:border-zinc-700">
                        <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" name="Alex Kim" size="sm" />
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Alex Kim</span>
                                    <span className="text-xs text-zinc-400">2 hours ago</span>
                                </div>
                                
                                {/* Conditional: Actions display only if comment.userId === user.id */}
                                <div className="flex items-center gap-1">
                                    <Button isIconOnly size="sm" variant="light" className="text-zinc-400 hover:text-zinc-600"><Pencil className="w-3.5 h-3.5" /></Button>
                                    <Button isIconOnly size="sm" variant="light" color="danger" className="opacity-70 hover:opacity-100"><TrashBin className="w-3.5 h-3.5" /></Button>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                Absolutely spot on. Tracking lifts takes out all the guesswork. Highly recommend keeping a log app or journal!
                            </p>
                            <div className="pt-2">
                                <Button size="sm" variant="light" className="text-xs text-zinc-500 h-7 px-2 rounded-lg" startContent={<ArrowsRotateRight className="w-3.5 h-3.5" />}>
                                    Reply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default forumDetailPage;