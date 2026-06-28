import { FetchServer } from "../core/mutation"

export const GetPostVote=(postId)=>{
return FetchServer(`/api/vote/${postId}`)
}