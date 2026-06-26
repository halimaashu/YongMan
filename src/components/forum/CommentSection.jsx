"use client";

import React, { useState } from 'react';
import { Card } from "@heroui/react";
import { TrashBin, Pencil, ArrowRightArrowLeft } from '@gravity-ui/icons'; 

export default function CommentSection({ postId, isAuthenticated, currentUser }) {
    // Initial dummy array structure mirroring your requirements
    const [comments, setComments] = useState([
        { id: "c1", text: "This is amazing! Super helpful.", authorId: "user_999", authorName: "Rahat", replies: [] },
        { id: "c2", text: "Are there any updates on this framework?", authorId: "user_123", authorName: "Ashik", replies: [
            { id: "r1", text: "Yes! V3 just got more optimized.", authorId: "user_999", authorName: "Rahat" }
        ]}
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
            replies: []
        };
        setComments([...comments, newComment]);
        setNewCommentText("");
    };

    const handleSaveEdit = (commentId) => {
        setComments(comments.map(c => c.id === commentId ? { ...c, text: editText } : c));
        setEditingCommentId(null);
    };

    const handleDeleteComment = (commentId) => {
        setComments(comments.filter(c => c.id !== commentId));
    };

    const handleAddReply = (commentId) => {
        if (!replyText.trim()) return;
        setComments(comments.map(c => {
            if (c.id === commentId) {
                return {
                    ...c,
                    replies: [...c.replies, {
                        id: Date.now().toString(),
                        text: replyText,
                        authorId: currentUser.id,
                        authorName: currentUser.name
                    }]
                };
            }
            return c;
        }));
        setActiveReplyId(null);
        setReplyText("");
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Discussion</h3>

            {/* Write Comment Form */}
            {isAuthenticated ? (
                <form onSubmit={handleAddComment} className="flex flex-col gap-2">
                    <textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-xl p-3 focus:outline-none focus:border-cyan-500 text-sm resize-none h-24"
                    />
                    <button type="submit" className="self-end bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                        Comment
                    </button>
                </form>
            ) : (
                <div className="bg-neutral-900/50 border border-neutral-800 text-neutral-400 text-sm text-center p-4 rounded-xl">
                    You must be logged in to read details and join the conversation.
                </div>
            )}

            {/* List Comments */}
            <div className="space-y-3">
                {comments.map((comment) => {
                    const isOwnComment = comment.authorId === currentUser?.id;

                    return (
                        <Card key={comment.id} className="bg-neutral-900/40 border border-neutral-800/80 p-4 rounded-xl">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1 flex-1">
                                    <span className="text-xs font-bold text-neutral-300">{comment.authorName}</span>
                                    
                                    {editingCommentId === comment.id ? (
                                        <div className="flex flex-col gap-2 mt-1">
                                            <input 
                                                type="text" 
                                                value={editText} 
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="bg-neutral-800 text-white text-sm p-2 rounded-lg border border-neutral-700 w-full"
                                            />
                                            <div className="flex gap-2 self-end">
                                                <button onClick={() => setEditingCommentId(null)} className="text-xs text-neutral-400 px-2 py-1">Cancel</button>
                                                <button onClick={() => handleSaveEdit(comment.id)} className="text-xs bg-cyan-600 px-2 py-1 rounded text-white">Save</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-neutral-300">{comment.text}</p>
                                    )}
                                </div>

                                {/* Author Controls */}
                                {isAuthenticated && isOwnComment && editingCommentId !== comment.id && (
                                    <div className="flex items-center gap-1 text-neutral-500">
                                        <button onClick={() => { setEditingCommentId(comment.id); setEditText(comment.text); }} className="hover:text-cyan-400 p-1">
                                            <Pencil width={14} height={14} />
                                        </button>
                                        <button onClick={() => handleDeleteComment(comment.id)} className="hover:text-rose-400 p-1">
                                            <TrashBin width={14} height={14} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Reply Trigger Action */}
                            {isAuthenticated && (
                                <button 
                                    onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                                    className="text-[11px] text-cyan-500/80 hover:text-cyan-400 mt-2 font-medium inline-block"
                                >
                                    Reply
                                </button>
                            )}

                            {/* Inner Reply Input Box */}
                            {activeReplyId === comment.id && (
                                <div className="mt-3 flex gap-2 pl-4 border-l-2 border-neutral-800">
                                    <input 
                                        type="text"
                                        placeholder="Write a reply..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="bg-neutral-800 text-xs p-2 rounded-lg text-white flex-1 focus:outline-none border border-neutral-700"
                                    />
                                    <button onClick={() => handleAddReply(comment.id)} className="bg-neutral-700 px-3 py-1 text-[11px] text-white rounded-lg">
                                        Submit
                                    </button>
                                </div>
                            )}

                            {/* Nested Replies Rendering */}
                            {comment.replies?.length > 0 && (
                                <div className="mt-3 pl-4 border-l-2 border-neutral-800 space-y-2">
                                    {comment.replies.map(reply => (
                                        <div key={reply.id} className="text-xs">
                                            <span className="font-bold text-neutral-400 block">{reply.authorName}</span>
                                            <p className="text-neutral-300">{reply.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}