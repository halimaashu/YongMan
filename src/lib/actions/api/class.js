import { FetchServer } from "../core/mutation"

export const getAllClass=async()=>{
    return FetchServer("/api/allClass")
};
export const getAllClassDetail=async(id)=>{
    return FetchServer(`/api/allClass/${id}`)
};