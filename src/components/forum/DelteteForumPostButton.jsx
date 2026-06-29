"use client"
import { deleteForumPost } from '@/lib/actions/forum';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const DelteteForumPostButton = ({post}) => {
    const router=useRouter()
const handelForumPostDelete=async()=>{

    const deleteMyForumPost=await deleteForumPost(post)
    if(deleteMyForumPost){
        toast.error(" you are delete a this post")
        router.refresh()

    }
    
}
    return (
        <div>
             <Button 
                  color="danger" 
                  variant="outline" 
                  className="w-full font-medium text-red-600 rounded-md"
                  onClick={handelForumPostDelete}
                >
                  Delete Post
                </Button>
        </div>
    );
};

export default DelteteForumPostButton;