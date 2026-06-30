import { FetchServer, mutationServer } from "../core/mutation"

export const GetAllUsers=async()=>{
    return FetchServer("/")
}


export const getAllUserTrainerForm=async()=>{
    return FetchServer("/api/applyAsTrainer")
}
export const myTrainerForm=async(id)=>{
    return FetchServer(`/api/applyAsTrainer?userId=${id}`)
}


export const makeAdmin=async(id)=>{
    return mutationServer(`/api/userRole/${id}`,{role:"admin"},"PATCH")
}