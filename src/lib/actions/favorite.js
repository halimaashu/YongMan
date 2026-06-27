import { mutationServer } from "./core/mutation"

export const postFavoriteClass=async(data)=>{
    return mutationServer("/api/favorite",data)
}