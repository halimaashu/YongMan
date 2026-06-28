import { mutationServer } from "./core/mutation"

export const postVote=async(data)=>{
return mutationServer("/api/vote",data)
}