import { FetchServer } from "../core/mutation"

export const myBookedClass=async(id)=>{
    return FetchServer(`/api/payment?userId=${id}`)
}