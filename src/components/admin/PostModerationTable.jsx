"use client";

import React, { useState } from "react";
import { Card, Table, Avatar, Badge, Button } from "@heroui/react";
import { TrashBin, Eye, Person, Calendar } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { getForumPostDetail } from "@/lib/actions/api/forum";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteForumPost } from "@/lib/actions/forum";

// Mock or actual client action handler for post deletion
// import { deleteForumPost } from '@/lib/actions/api/forum';

const PostModerationTable = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const router = useRouter();
  const handleDelete = async (data) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this community post?",
    );
    if (!confirmDelete) return;

    try {
      // Optative: Add your server action processing logic here
      // await deleteForumPost(postId);
      const deletePost = await deleteForumPost(data);
      if (deletePost) {
        toast.error("delete the post");
        router.refresh();

        setPosts(posts.filter((post) => post._id !== data?._id));
      }

      // Optimistic UI updates
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <Card className="border border-zinc-800 shadow-xl bg-zinc-950/40 backdrop-blur-md overflow-hidden rounded-3xl">
      {/* CARD HEADER */}
      <Card.Header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-zinc-800/80">
        <div>
          <Card.Title className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Community Management
          </Card.Title>
          <Card.Description className="text-xs sm:text-sm text-zinc-400 mt-1">
            Review and moderate community content. Delete inappropriate platform
            entries instantly.
          </Card.Description>
        </div>
        <div className="flex items-center gap-2 text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-zinc-400 self-start sm:self-center">
          <span className="font-bold text-danger">{posts.length}</span> active
          posts
        </div>
      </Card.Header>

      {/* CARD CONTENT WITH INSTALLED TABLE */}
      <Card.Content className="p-0">
        <Table className="w-full text-zinc-300">
          <Table.ScrollContainer>
            <Table.Content aria-label="Community Moderation Control Center">
              {/* TABLE HEADER */}
              <Table.Header className="bg-zinc-900/50 border-b border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <Table.Column isRowHeader>Author & Role</Table.Column>
                <Table.Column>Post Details</Table.Column>
                <Table.Column>Creation Date</Table.Column>
                <Table.Column className="text-right">Actions</Table.Column>
              </Table.Header>

              {/* TABLE BODY */}
              <Table.Body>
                {posts.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={4}
                      className="text-center py-12 text-zinc-500 text-sm"
                    >
                      No forum posts found on the platform.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  posts.map((post) => (
                    <Table.Row
                      key={post._id}
                      className="border-b border-zinc-900/60 hover:bg-zinc-900/30 transition-colors duration-200 text-sm"
                    >
                      {/* COLUMN 1: AUTHOR INFOMATION */}
                      <Table.Cell className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-zinc-800 rounded-xl bg-zinc-900 flex-shrink-0">
                            <Avatar.Image
                              src={post.authorImage}
                              alt={post.authorName}
                            />
                            <Avatar.Fallback name={post.authorName} />
                          </Avatar>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-zinc-100 truncate">
                              {post.authorName}
                            </span>
                            <span className="text-xs text-zinc-500 capitalize flex items-center gap-1 mt-0.5">
                              <Person className="w-3 h-3 text-zinc-500" />
                              {post.authorRole}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* COLUMN 2: POST CAPTION & PREVIEW IMAGE */}
                      <Table.Cell className="py-4 px-6 max-w-xs md:max-w-md">
                        <div className="flex items-start gap-3 min-w-0">
                          {post.image && (
                            <Image
                              src={post.image}
                              alt="Attached post upload"
                              width={40}
                              height={40}
                              unoptimized
                              className="w-12 h-auto rounded-lg object-cover border border-zinc-800"
                            />
                          )}
                          <div className="flex flex-col min-w-0">
                            <h4 className="font-semibold text-zinc-200 truncate">
                              {post.title}
                            </h4>
                            <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5 font-normal leading-relaxed">
                              {post.description}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* COLUMN 3: DATETIME METADATA */}
                      <Table.Cell className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          <span>
                            {new Date(post.createAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* COLUMN 4: ACTION ACTIONS MODAL */}
                      <Table.Cell className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/forum/${post._id}`}>
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl px-3 h-8 transition-all min-w-0"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            onClick={() => handleDelete(post)}
                            className="bg-danger/10 hover:bg-danger text-danger hover:text-white border border-danger/20 rounded-xl px-3 h-8 transition-all font-semibold min-w-0"
                            title="Delete Post"
                          >
                            <TrashBin className="w-4 h-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          {/* OPTIONAL TABLE FOOTER */}
          <Table.Footer className="bg-zinc-950/20 border-t border-zinc-900 py-3 px-6 text-xs text-zinc-500 flex items-center justify-between">
            <span>Showing {posts.length} entries</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
              Security Active
            </span>
          </Table.Footer>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default PostModerationTable;
