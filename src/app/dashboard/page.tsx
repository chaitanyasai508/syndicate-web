"use client"

import { useAuth } from "@/hooks/use-auth"
import { useAuthStore } from "@/store/use-auth-store"

export default function DashboardPage() {
  const { logout } = useAuth()
  const { user } = useAuthStore()
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  )
}