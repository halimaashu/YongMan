import { FetchServer } from "../core/mutation"

export const getAllFavoriteClass=async(id)=>{
    return FetchServer(`/api/favorite?userId=${id}`)
}