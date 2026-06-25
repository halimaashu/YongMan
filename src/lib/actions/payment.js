import { mutationServer } from "./core/mutation"

export const PostPaymentInfo=async(data)=>{
    return mutationServer("/api/payment",data)
}