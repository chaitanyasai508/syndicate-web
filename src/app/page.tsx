"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold">Syndicate Up</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your platform for managing syndications
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button variant="outline" >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
