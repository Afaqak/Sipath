
import ClientLayout from "./clientLayout"
export const metadata = {
  title: 'Sipath',
  description: '...',
  icons: {
    icon: "/favicon.png",
  }
}

export default function Layout({ children }) {
  return (
    <>
      <ClientLayout>
        {children}
      </ClientLayout>
    </>
  )
}