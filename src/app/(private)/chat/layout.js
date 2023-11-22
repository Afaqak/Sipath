'use client'
import { errorToast } from "@/utils/toasts"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getServerSession } from "next-auth"

export default function Layout({ children }) {
    const router=useRouter()

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
          errorToast('Session expired!')
            setTimeout(()=>router.push('/sign-in'),500)           
        },
    
    })
    return (
        <div className="">
            {children}
        </div>)
}

