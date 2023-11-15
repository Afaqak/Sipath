
import ClientLayout from "./clientLayout"
export const metadata = {
  title: 'Sipath',
  description: '...',
  icons: {
    icon: "/icon.ico",
    apple: ['/icon.png?v=4'],
    shortcut: ['/icon.png'],
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