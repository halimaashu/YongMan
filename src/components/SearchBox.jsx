'use client';

import React, { useState } from 'react';
import { Magnifier, Xmark } from '@gravity-ui/icons';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState('');
const router=useRouter()
  const handleClear = () => {
    setSearchQuery('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your search logic here (e.g., router.push(`/search?q=${searchQuery}`))
router.push(`classes?search=${searchQuery}`)
    
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md md:max-w-xl mx-auto px-4 sm:px-0"
    >
      <div className="relative flex items-center group">
        {/* Search Icon */}
        <div className="absolute left-4 text-zinc-400 group-focus-within:text-zinc-200 transition-colors pointer-events-none">
          <Magnifier className="w-5 h-5" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search courses, users, or data..."
          className="w-full pl-12 pr-12 py-3 bg-zinc-900 text-zinc-100 placeholder-zinc-500 rounded-2xl border border-zinc-800 focus:outline-none focus:border-zinc-700 focus:ring-2 focus:ring-zinc-800/50 transition-all text-sm md:text-base shadow-inner"
        />

        {/* Clear Button (Shows dynamically) */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            aria-label="Clear search"
          >
            <Xmark className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}