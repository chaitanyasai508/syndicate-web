"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/use-auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const { initialize } = useAuthStore()

  useEffect(() => {
    const initAuth = async () => {
      await initialize()
      setIsLoading(false)
    }

    initAuth()
  }, [initialize])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    )
  }

  return <>{children}</>
}