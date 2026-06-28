"use client";

import { Card } from "@heroui/react";
import Link from "next/link";

// Using simple SVG icons since you're using Gravity UI / modern minimal styles
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
);

const ForumPostCard = ({ post }) => {
  const { _id, title, description, image, authorName, authorImage, authorRole, createAt } = post;

  // Format date to a readable string
  const formattedDate = new Date(createAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="bg-background/60 dark:bg-zinc-900/50 backdrop-blur-md border border-divider hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/10 overflow-hidden flex flex-col h-full rounded-2xl">
      {/* Post Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
        <img
          src={image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800"} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Author Role Badge Overlaid */}
        {authorRole && (
          <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 text-primary text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
            {authorRole}
          </span>
        )}
      </div>

      {/* Card Header: Author Info */}
      <Card.Header className="flex gap-3 px-4 pt-4 pb-2 items-center">
        <img
          src={authorImage || "https://randomuser.me/api/portraits/lego/1.jpg"}
          alt={authorName}
          className="w-10 h-10 rounded-full object-cover border border-primary/30"
        />
        <div className="flex flex-col text-left">
          <p className="text-sm font-bold tracking-wide text-foreground">{authorName}</p>
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <CalendarIcon />
            <span>{formattedDate}</span>
          </div>
        </div>
      </Card.Header>

      {/* Card Content: Title & Truncated Description */}
      <Card.Content className="flex-grow px-4 py-2 flex flex-col gap-2">
        <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-snug line-clamp-2 hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
          {description}
        </p>
      </Card.Content>

      {/* Card Footer: Action Button */}
      <Card.Footer className="px-4 pb-4 pt-2 mt-auto">
        <Link 
          href={`/forum/${_id}`}
          className="w-full text-center bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-primary-foreground text-foreground text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm border border-divider hover:border-transparent"
        >
          Read More
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default ForumPostCard;