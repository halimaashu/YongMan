import { mutationServer } from "./core/mutation"

export const PostTrainerForm=async(data)=>{
    return mutationServer("/api/applyAsTrainer",data)
}