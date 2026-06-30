import { mutationServer } from "./core/mutation"

export const postForumPages=async(data)=>{
    return mutationServer("/api/forum",data)

}


export const deleteForumPost=async(data)=>{
    return mutationServer(`/api/forum/${data?._id}`,data,"DELETE")
}