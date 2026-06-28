

import { auth } from '@/lib/auth';
import { ForumDetailCard } from './ForumDetailCard';
import { headers } from 'next/headers';
import { getForumPostDetail } from '@/lib/actions/api/forum';
import { GetPostVote } from '@/lib/actions/api/vote';


const forumDetailPage =async ({ params }) => {
     const { id } = await params;
const postId=id
  // 1. Authentication Guard
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect("/logIn"); // Redirect to your login route
  }
const getVote=await GetPostVote(postId) 

  // 2. Fetch Data
  const post = await getForumPostDetail(id);
  // console.log(getVote,?"vote from datab ase")

    return (
        <div>
            <ForumDetailCard post={post} user={user} votes={getVote}/>
        </div>
    );
};

export default forumDetailPage;