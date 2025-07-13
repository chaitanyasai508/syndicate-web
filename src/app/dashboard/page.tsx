"use client"

import { useAuth } from "@/hooks/use-auth"
import { useAuthStore } from "@/store/use-auth-store"


export default function DashboardPage() {
  const { logout } = useAuth()
  const { user } = useAuthStore()
  return (
   <div className="min-h-screen flex flex-col items-center justify-center">
    <h1>Welcome {user?.name || 'user'}!</h1>
   </div>
  )
}