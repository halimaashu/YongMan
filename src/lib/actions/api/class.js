import { FetchServer } from "../core/mutation"

export const getAllClass=async()=>{
    return FetchServer("/api/allClass")
}