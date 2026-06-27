"use client"
import React, { useState } from 'react';
import { Form, Button, TextField, Label, InputGroup, Description, FieldError } from '@heroui/react';
// Importing Gravity UI Icons
import { Heading,  Text, Check, TrashBin, Picture } from '@gravity-ui/icons';
import { postForumPages } from '@/lib/actions/forum';
import toast from 'react-hot-toast';
import { error } from 'better-auth/api';
import { authClient } from '@/lib/auth-client';

export default function TrainerContributionForm() {
  const [imageLink, setImageLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
const { data: session } = authClient.useSession()
const user=session?.user
console.log(session?.user,"[[[[[[[[[[[[[[[[[[[[[[[")
  // Handle Imgbb Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Replace with your actual Imgbb API key
      const IMGBBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API; 
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageLink(data.data.url);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Add the uploaded image link to the final submission data
    data.image = imageLink; 
    data.userId=user?.id;
    data.authorName=user?.name;
    data.authorImage=user?.image;
    data.authorRole=user?.role;
    console.log('Submitted Forum Post:', data);
    const postForum=await postForumPages(data)
    // Add your submit logic here (e.g., saving to a database)
    if(postForum){
        toast.success("post success")
    }
    if(!postForum){
        toast.error(`failed to post for:${error.messages}`)
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-zinc-900 border border-lime-500/20 rounded-2xl shadow-xl shadow-lime-500/5 text-white">
      {/* Header section to capture attention */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-[#00E5FF]">
          Share Your Expertise
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Inspire the community with workout tips, nutrition advice, or success stories.
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* FIELD 1: TITLE */}
        <TextField name="title" isRequired className="w-full">
          <Label className="text-zinc-300 font-semibold mb-2 block text-sm tracking-wide uppercase">
            Post Title
          </Label>
          <InputGroup className="bg-zinc-800 border border-zinc-700 focus-within:border-[#00E5FF] rounded-xl transition-all duration-200">
            <InputGroup.Prefix className="pl-3 text-zinc-500">
              <Heading className="w-5 h-5" />
            </InputGroup.Prefix>
            <InputGroup.Input 
              placeholder="e.g., 5 Myths About High-Intensity Interval Training (HIIT)" 
              className="bg-transparent text-white placeholder-zinc-500 py-3 px-2 w-full focus:outline-none"
            />
          </InputGroup>
          <Description className="text-xs text-zinc-500 mt-1">Make it punchy and clear.</Description>
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* FIELD 2: IMAGE UPLOAD (Imgbb Integration) */}
        <TextField isRequired={!imageLink} className="w-full">
          <Label className="text-zinc-300 font-semibold mb-2 block text-sm tracking-wide uppercase">
            Feature Image
          </Label>
          
          <InputGroup className="bg-zinc-800 border border-zinc-700 focus-within:border-[#00E5FF] rounded-xl transition-all duration-200 relative">
            <InputGroup.Prefix className="pl-3 text-zinc-500 flex items-center">
              {imageLink ? <Check className="w-5 h-5 text-[#00E5FF]" /> : <Picture className="w-5 h-5" />}
            </InputGroup.Prefix>
            
            {/* Hidden native input overlayed by a stylized placeholder */}
            <div className="relative w-full flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                disabled={isUploading}
              />
              <div className="py-3 px-2 text-zinc-400 pointer-events-none text-sm truncate w-full">
                {isUploading ? "Uploading to Imgbb..." : imageLink ? "Image uploaded successfully!" : "Click to choose a motivating fitness cover photo"}
              </div>
            </div>

            {imageLink && (
              <InputGroup.Suffix className="pr-3 flex items-center z-20">
                <button 
                  type="button" 
                  onClick={() => setImageLink('')}
                  className="text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <TrashBin className="w-4 h-4" />
                </button>
              </InputGroup.Suffix>
            )}
          </InputGroup>
          
          {imageLink && (
            <div className="mt-3 rounded-lg overflow-hidden border border-zinc-700 max-h-40">
              <img src={imageLink} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <Description className="text-xs text-zinc-500 mt-1">High-quality JPG or PNG preferred.</Description>
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* FIELD 3: DESCRIPTION */}
        <TextField name="description" isRequired className="w-full">
          <Label className="text-zinc-300 font-semibold mb-2 block text-sm tracking-wide uppercase">
            Content / Description
          </Label>
          <InputGroup className="bg-zinc-800 border border-zinc-700 focus-within:border-[#00E5FF] rounded-xl transition-all duration-200">
            <InputGroup.Prefix className="pl-3 pt-3 text-zinc-500 items-start">
              <Text className="w-5 h-5" />
            </InputGroup.Prefix>
            <InputGroup.Input 
              as="textarea"
              placeholder="Break down the steps, tips, or routine here..." 
              className="bg-transparent text-white placeholder-zinc-500 py-3 px-2 w-full min-h-[150px] focus:outline-none resize-y"
            />
          </InputGroup>
          <Description className="text-xs text-zinc-500 mt-1">Keep it actionable for our community members.</Description>
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* FORM ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:justify-end">
          <Button 
            type="reset" 
            onClick={() => setImageLink('')}
            className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold tracking-wide uppercase rounded-xl transition-colors duration-200"
          >
            Reset
          </Button>
          <Button 
            type="submit"
            disabled={isUploading}
            className="w-full sm:w-auto px-8 py-3 bg-[#00E5FF] hover:bg-[#00E5FF] disabled:bg-zinc-700 disabled:text-zinc-500 text-zinc-950 font-black tracking-wide uppercase rounded-xl shadow-lg shadow-lime-400/20 active:scale-[0.98] transition-all duration-200"
          >
            {isUploading ? 'Uploading...' : 'Publish Post'}
          </Button>
        </div>

      </Form>
    </div>
  );
}