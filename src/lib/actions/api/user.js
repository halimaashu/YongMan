import { FetchServer } from "../core/mutation"

export const GetAllUsers=async()=>{
    return FetchServer("/")
}


export const getAllUserTrainerForm=async()=>{
    return FetchServer("/api/applyAsTrainer")
}