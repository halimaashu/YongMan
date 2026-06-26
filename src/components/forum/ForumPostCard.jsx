"use client";

import React, { useState } from 'react';
import { Card } from "@heroui/react";
import { ThumbsUp, ThumbsDown } from '@gravity-ui/icons';

export default function ForumPostCard({ post, isAuthenticated, userId }) {
    // Basic local state handling for instantaneous UI response
    const [likes, setLikes] = useState(post.likesCount || 0);
    const [dislikes, setDislikes] = useState(post.dislikesCount || 0);
    const [userVote, setUserVote] = useState(post.userVoteType || null); // 'like', 'dislike', or null

    const handleVote = (type) => {
        if (!isAuthenticated) return;

        if (type === 'like') {
            if (userVote === 'like') {
                setLikes(prev => prev - 1);
                setUserVote(null);
            } else {
                setLikes(prev => prev + 1);
                if (userVote === 'dislike') setDislikes(prev => prev - 1);
                setUserVote('like');
            }
        } else if (type === 'dislike') {
            if (userVote === 'dislike') {
                setDislikes(prev => prev - 1);
                setUserVote(null);
            } else {
                setDislikes(prev => prev + 1);
                if (userVote === 'like') setLikes(prev => prev - 1);
                setUserVote('dislike');
            }
        }
        
        // TODO: Fire API call to trigger backend update: 
        // updatePostVote(post.id, type);
    };

    return (
        <Card className="w-full bg-neutral-900 border border-neutral-800 text-neutral-100">
            <Card.Header className="flex flex-col items-start gap-1 p-6">
                
                <Card.Title className="text-2xl font-bold tracking-tight text-white">
                    {post.title || "Untitled Post"}
                </Card.Title>
                <Card.Description className="text-xs text-neutral-500">
                    Posted by {post.author?.name || "Anonymous"} • {post.createdAt || "Just now"}
                </Card.Description>
            </Card.Header>

            <Card.Content className="px-6 py-2 text-neutral-300 leading-relaxed">
                {post.imageUrl && (
                    <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full max-h-[400px] object-cover rounded-xl mb-4 border border-neutral-800"
                    />
                )}
                <p className="whitespace-pre-line">{post.description}</p>
            </Card.Content>

            <Card.Footer className="px-6 py-4 flex gap-4 border-t border-neutral-800/50">
                {/* Like Button */}
                <button 
                    disabled={!isAuthenticated}
                    onClick={() => handleVote('like')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
                        !isAuthenticated ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-800'
                    } ${userVote === 'like' ? 'text-cyan-400 bg-cyan-500/10' : 'text-neutral-400'}`}
                >
                    <ThumbsUp width={16} height={16} />
                    <span>{likes}</span>
                </button>

                {/* Dislike Button */}
                <button 
                    disabled={!isAuthenticated}
                    onClick={() => handleVote('dislike')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
                        !isAuthenticated ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-800'
                    } ${userVote === 'dislike' ? 'text-rose-400 bg-rose-500/10' : 'text-neutral-400'}`}
                >
                    <ThumbsDown width={16} height={16} />
                    <span>{dislikes}</span>
                </button>
            </Card.Footer>
        </Card>
    );
}