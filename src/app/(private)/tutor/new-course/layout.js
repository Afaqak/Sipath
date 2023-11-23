'use client'
import { errorToast } from "@/utils/toasts"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Layout({ children }) {
    const router=useRouter()
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
          errorToast('Session expired!')
            setTimeout(()=>router.push('/sign-in'),1000)
         
           
        },
    
    })
    return (
        <div className="">
            {children}
        </div>)
}