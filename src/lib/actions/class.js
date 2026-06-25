import { mutationServer } from "./core/mutation"


export const postClass=async(data)=>{
    return mutationServer("/api/allClass",data)
}