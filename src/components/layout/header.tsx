"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/use-auth-store"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User2 } from "lucide-react"
import { cn } from "@/lib/utils"
import LoggedOutHeader from "@/components/Header"


const navItems = [
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Ask AI",
    href: "/search",
  },
]

const publicPaths = ['/signin', '/signup', '/forgot-password']

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, signOut, isAuthenticated } = useAuthStore()

  // Don't show header on auth pages
  if (publicPaths.some(path => pathname?.startsWith(path))) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/signin")
  }

  if(!isAuthenticated) {
    return <LoggedOutHeader />
  }

  return (
    <header className=" w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-14 items-center px-6">
        <div className="mr-4 flex">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Syndicate Up</span>
          </Link>
          {isAuthenticated && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    "text-foreground/60",
                    pathname === item.href && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User2 className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2 min-w-48">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleSignOut}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}