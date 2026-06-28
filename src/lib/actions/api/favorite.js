import { FetchServer, mutationServer } from "../core/mutation"

export const getAllFavoriteClass=async(id)=>{
    return FetchServer(`/api/favorite?userId=${id}`)
}
export const makeUnFavorite=(data)=>{
return mutationServer("/api/unfavorite",data,"DELETE")
}