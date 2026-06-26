import { mutationServer } from "./core/mutation"

export const postForumPages=async(data)=>{
    return mutationServer("/api/forum",data)

}