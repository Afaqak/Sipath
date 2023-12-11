
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
export default async function Layout({ children }) {
    const session = await getServerSession(authOptions)

    if (!session?.token)
        redirect('/sign-in')
    return (
        <div className="">
            {children}
        </div>)
}

