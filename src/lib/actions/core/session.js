import { authClient } from "@/lib/auth-client"

const getUsr=async()=>{
    const { data: session } = await authClient.getSession()
    return session;
}
console.log(getUsr(),"from get session .j p")