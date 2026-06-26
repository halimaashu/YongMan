"use client";

import React, { useState } from 'react';
import { Card } from "@heroui/react";
import { TrashBin, Pencil } from '@gravity-ui/icons'; 

export default function CommentSection({ postId, isAuthenticated, currentUser }) {
    const [comments, setComments] = useState([
        { 
            id: "c1", 
            text: "This interface looks extremely clean with Neon details.", 
            authorId: "user_999", 
            authorName: "Rahat", 
            avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80",
            replies: [] 
        },
        { 
            id: "c2", 
            text: "Is the Next.js Hero UI framework production ready for large platforms?", 
            authorId: "user_123", 
            authorName: "Ashik", 
            avatarUrl: currentUser?.avatarUrl,
            replies: [
                { id: "r1", text: "Yes, V3 optimization handles client re-renders with zero layout shift.", authorId: "user_999", authorName: "Rahat" }
            ]
        }
    ]);

    const [newCommentText, setNewCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyText, setReplyText] = useState("");

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        const newComment = {
            id: Date.now().toString(),
            text: newCommentText,
            authorId: currentUser.id,
            authorName: currentUser.name,
            avatarUrl: currentUser.avatarUrl,
            replies: []
        };
        setComments([...comments, newComment]);
        setNewCommentText("");
    };

    return (
        <div className="space-y-4">
            <h3 className="text-md font-bold uppercase tracking-wider text-neutral-400 text-xs">Discussion Thread</h3>

            {/* Input Form with Active User Profile Image */}
            {isAuthenticated ? (
                <form onSubmit={handleAddComment} className="flex gap-3 items-start bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <img 
                        src={currentUser?.imge} 
                        alt="my profile Profile" 
                        className="w-8 h-8 rounded-full object-cover border border-neutral-700 bg-neutral-800 mt-1"
                    />
                    <div className="flex-1 flex flex-col gap-2">
                        <textarea
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="Share your thoughts on this resource..."
                            className="w-full bg-neutral-950 border border-neutral-800/80 text-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500/50 resize-none h-20"
                        />
                        <button type="submit" className="self-end bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all shadow-md">
                            Post Comment
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-neutral-900/50 border border-neutral-800 text-neutral-400 text-sm text-center p-4 rounded-xl">
                    Please log in to participate in the developer discussion.
                </div>
            )}

            {/* List Loop */}
            <div className="space-y-3">
                {comments.map((comment) => {
                    const isOwnComment = comment.authorId === currentUser?.id;
                    const displayAvatar = comment.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.authorName)}&background=222&color=fff`;

                    return (
                        <Card key={comment.id} className="bg-neutral-900/30 border border-neutral-800/60 p-4 rounded-xl flex flex-row gap-3 items-start">
                            {/* Commenter Profile Photo */}
                            <img 
                                src={displayAvatar} 
                                alt={comment.authorName} 
                                className="w-8 h-8 rounded-full object-cover border border-neutral-800 bg-neutral-900"
                            />

                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-neutral-300">{comment.authorName}</span>
                                    {isAuthenticated && isOwnComment && editingCommentId !== comment.id && (
                                        <div className="flex items-center gap-1 text-neutral-500">
                                            <button onClick={() => { setEditingCommentId(comment.id); setEditText(comment.text); }} className="hover:text-cyan-400 p-1 transition-colors">
                                                <Pencil width={12} height={12} />
                                            </button>
                                            <button onClick={() => setComments(comments.filter(c => c.id !== comment.id))} className="hover:text-rose-400 p-1 transition-colors">
                                                <TrashBin width={12} height={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                {editingCommentId === comment.id ? (
                                    <div className="flex flex-col gap-2 mt-1">
                                        <input 
                                            type="text" 
                                            value={editText} 
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="bg-neutral-950 text-white text-sm p-2 rounded-lg border border-neutral-800 w-full"
                                        />
                                        <div className="flex gap-2 self-end">
                                            <button onClick={() => setEditingCommentId(null)} className="text-xs text-neutral-500 px-2">Cancel</button>
                                            <button onClick={() => { setComments(comments.map(c => c.id === comment.id ? { ...c, text: editText } : c)); setEditingCommentId(null); }} className="text-xs bg-cyan-600 px-3 py-1 rounded-lg text-white">Save</button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-neutral-300">{comment.text}</p>
                                )}

                                <button 
                                    onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                                    className="text-[11px] text-cyan-500/80 hover:text-cyan-400 mt-2 font-medium inline-block transition-colors"
                                >
                                    Reply
                                </button>

                                {/* Nested Replies layout mapping */}
                                {comment.replies?.length > 0 && (
                                    <div className="mt-3 pl-3 border-l border-neutral-800 space-y-3">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="text-xs flex gap-2 items-start">
                                                <div className="space-y-0.5">
                                                    <span className="font-bold text-neutral-400">{reply.authorName}</span>
                                                    <p className="text-neutral-300">{reply.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}