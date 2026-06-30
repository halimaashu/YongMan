import { FetchServer, mutationServer } from "../core/mutation"

export const getAllClass=async()=>{
    return FetchServer("/api/allClass")
};
export const getAllApprovedClass=async(page)=>{
    if(!page){
        page=1;
    }
    return FetchServer(`/api/allApprovedClass?page=${page}`)
}
export const getAllClassDetail=async(id)=>{
    return FetchServer(`/api/allClass/${id}`)
};

export const deleteMyClass=async(data)=>{
 return mutationServer("/api/classDelete",data,"DELETE")
}

export const classUpdateById=async(data)=>{
    return mutationServer("/api/class/edit",data,"PATCH")
}