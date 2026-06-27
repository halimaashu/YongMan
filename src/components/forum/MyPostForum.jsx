"use client"
import React, { useState } from "react";
import { Card } from "@heroui/react";
import { Calendar, Person, TrashBin } from "@gravity-ui/icons";

export default function MyPostForum({myPostForum}) {
  // Simulating logged-in user data
  const loggedInUserId = "6a3aed9c8050cef07d063957";

  // Simulated raw post data state
  const [posts, setPosts] = useState([...myPostForum]);

  // 1. Filter: Display ONLY posts created by this logged-in trainer
  const trainerPosts = posts.filter(post => post.userId === loggedInUserId);

  // 2. Delete Handler with Confirmation Prompt
  const handleDelete = (postId, title) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${title}"?`);
    if (confirmDelete) {
      setPosts(posts.filter(post => post._id !== postId));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-foreground border-b pb-2">
        My Training Posts ({trainerPosts.length})
      </h2>

      {trainerPosts.length === 0 ? (
        <p className="text-default-500 italic">No posts found.</p>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainerPosts.map((post) => {
            // Format the date inside the loop safely
            const formattedDate = new Date(post.createAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <Card 
                key={post._id} 
                className="w-full bg-content1 border border-default-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* CARD HEADER */}
                <Card.Header className="flex flex-col gap-2 items-start p-5 pb-2">
                  <div className="flex items-center gap-3 w-full">
                    <img
                      src={post.image ||post.authorName[0]}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-default-300"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-sm font-bold text-foreground truncate">
                        {post.title}
                      </span>
                      <span className="text-xs text-default-500 capitalize flex items-center gap-1">
                        <Person className="w-3 h-3 text-primary" /> {post.authorRole}
                      </span>
                    </div>
                  </div>

                  <Card.Title className="text-lg font-bold text-foreground mt-2 line-clamp-1">
                    {post.title}
                  </Card.Title>
                  
                  <Card.Description className="text-xs text-default-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {formattedDate}
                  </Card.Description>
                </Card.Header>

                {/* CARD CONTENT */}
                <Card.Content className="px-5 py-2">
                  <p className="text-sm text-default-600 leading-relaxed pl-3 border-l-2 border-primary/30">
                    {post.description}
                  </p>
                </Card.Content>

                {/* CARD FOOTER */}
                <Card.Footer className="px-5 py-3 border-t border-default-100 flex justify-end bg-default-50/50">
                  <button
                    onClick={() => handleDelete(post._id, post.title)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-danger bg-danger-50 hover:bg-danger-100 px-3 py-1.5 rounded-lg border border-danger-200 active:scale-95 transition-all duration-200"
                  >
                    <TrashBin className="w-3.5 h-3.5" />
                    Delete Post
                  </button>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}