"use client"

import { useAuth } from "@/hooks/use-auth"
import { useAuthStore } from "@/store/use-auth-store"
import Layout from "@/components/layout"


export default function DashboardPage() {
  const { logout } = useAuth()


  const { user } = useAuthStore()
  return (
   <Layout>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <h1>Dashboard</h1>
   </Layout>
  )
}