import { errorToast } from "@/utils/toasts"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Layout({ children }) {

    const session =await getServerSession(authOptions)
    if(!session?.token){
        redirect('/')
    }
    return (
        <div className="">
            {children}
        </div>)
}

