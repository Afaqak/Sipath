'use client'

import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"

export default function AuthProvider ({
  children,
  session
}) {

  return <SessionProvider session={session}>
    {children}
  </SessionProvider>
}