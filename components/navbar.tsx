"use client"
import { Briefcase, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import SignOutButton from "./sign-out-btn"
import { useSession } from "@/lib/auth/auth-client"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b border-stone-200/50 dark:border-stone-800/50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold group">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 group-hover:from-teal-500/30 group-hover:to-cyan-500/30 transition-all duration-500 group-hover:scale-110">
            <Briefcase className="h-6 w-6 text-teal-600 dark:text-teal-400" strokeWidth={2} />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 font-black">
            JobTracker
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-50 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl font-medium transition-all"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-11 w-11 rounded-2xl ring-2 ring-teal-500/20 hover:ring-teal-500/40 transition-all duration-500 hover:scale-105"
                  >
                    <Avatar className="h-11 w-11">
                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white font-bold text-lg rounded-2xl">
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 glass-1 border-stone-200/50 dark:border-stone-800/50 rounded-2xl"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1.5 p-2">
                      <p className="text-sm font-semibold leading-none text-stone-900 dark:text-stone-50">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-stone-500 dark:text-stone-400">{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-50 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl font-medium transition-all"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-lg shadow-teal-500/25 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-105 rounded-xl font-medium">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
