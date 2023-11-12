
import ClientLayout from "./clientLayout"
export const metadata = {
  title: 'Sipath',
  description: '...',
  icons: {
    icon: "/icon.ico",
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