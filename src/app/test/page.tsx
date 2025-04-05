"use client"

import { useUser } from "@/hooks/use-user"

export default function TestPage() {
  const { data: user } = useUser()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p>Welcome, {user?.name}</p>
    </div>
  )
}