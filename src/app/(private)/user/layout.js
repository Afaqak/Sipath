'use client'
import { errorToast } from "@/utils/toasts"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
export default function Layout({ children }) {
    const router=useRouter()
    const { data,status } = useSession({
        required: true,
        onUnauthenticated() {
            console.log(data)
          errorToast('Session expired!')
            router.push('/sign-in')           
        },
    
    })
    return (
        <div className="">
            {children}
        </div>)
}

