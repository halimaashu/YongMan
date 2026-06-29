import ForumPostCard from "@/components/forum/ForumPostCard";

import { getMyForum } from "@/lib/actions/api/forum";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const MyPostPage = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  const user = userSession?.user;
  const myPostForum = await getMyForum(`?userId=${user?.id}`);
  console.log(myPostForum,"my forum post on card");
  console.log(userSession?.user);

  return (
    <div>
      <h1> my post pages</h1>
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{
      myPostForum.map((post)=> <ForumPostCard key={post._id} post={post}/>)
      }</div>
      
    </div>
  );
};

export default MyPostPage;
