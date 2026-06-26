import CommunityForumPage from '@/components/forum/CommunityForumPage ';
import { getAllForum } from '@/lib/actions/api/forum';
import React from 'react';

const AllCommunityFromPage =async () => {
    const allForumPost=await getAllForum()
    // console.log(allForumPost,"from forumpagesssssssssss")
    return (
        <div>
            <CommunityForumPage allForumPost={allForumPost} />
        </div>
    );
};

export default AllCommunityFromPage;