import { mutationServer } from "./core/mutation"

export const PostTrainerForm=async(data)=>{
    return mutationServer("/api/applyAsTrainer",data)
}
export const makeTrainer=async(id,data)=>{
    return mutationServer(`/api/makeTrainer/${id}`,data,"PATCH")
} 