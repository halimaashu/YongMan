import { FetchServer } from "../core/mutation"

export const myBookedClass=async(id)=>{
    return FetchServer(`/api/payment?userId=${id}`)
}
export const allTransition=async()=>{
    return FetchServer("/api/payment")
}

export const myAllSellClass=async(id)=>{
  return FetchServer(`/api/payment?authorId=${id}`)
}