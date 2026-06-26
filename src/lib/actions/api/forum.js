import { FetchServer } from "../core/mutation"

export const getAllForum=async()=>{
    return FetchServer("/api/forum")
}
export const getForumPostDetail=async(id)=>{
    return FetchServer(`/api/forum/${id}`)
};
export const getMyForum=async(path)=>{
    return FetchServer(`/api/forum/${path}`)
}