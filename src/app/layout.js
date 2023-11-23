
import { getServerSession } from "next-auth";
import ClientLayout from "./clientLayout"
import { authOptions } from "./api/auth/[...nextauth]/route";



export const metadata = {
  title: 'Sipath',
  description: '...',
  icons: {
    icon: "/icon.ico",
    apple: ['/icon.png?v=4'],
    shortcut: ['/icon.png'],
  }
}

export default async function Layout({ children }) {

  const session = await getServerSession(authOptions);

  return (
    <>
      <ClientLayout session={session}>
        {children}
      </ClientLayout>
    </>
  )
}