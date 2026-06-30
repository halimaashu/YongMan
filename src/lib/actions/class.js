import { mutationServer } from "./core/mutation"


export const postClass=async(data)=>{
    return mutationServer("/api/allClass",data)
}
export const updateClassStatus=async(data)=>{
    return mutationServer(`/api/classApproved/${data?._id}`,{status:"approved"},"PATCH")
}