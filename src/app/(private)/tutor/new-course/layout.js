
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Layout({ children }) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isTutor) {
        redirect('/denied')
    }
    if (!session?.token)
        redirect('/sign-in')
    return (
        <div className="">
            {children}
        </div>)
}