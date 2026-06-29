import { FetchServer, mutationServer } from "../core/mutation"

export const getAllClass=async()=>{
    return FetchServer("/api/allClass")
};
export const getAllClassDetail=async(id)=>{
    return FetchServer(`/api/allClass/${id}`)
};

export const deleteMyClass=async(data)=>{
 return mutationServer("/api/classDelete",data,"DELETE")
}