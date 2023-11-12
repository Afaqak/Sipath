
import ClientLayout from "./clientLayout"
export const metadata = {
  title: 'Sipath',
  description: '...',
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