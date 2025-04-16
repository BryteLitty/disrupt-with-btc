"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bolt, Blocks, Heart } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Lightning Invoice",
      href: "/",
      icon: Bolt,
    },
    {
      name: "Blockchain Explorer",
      href: "/explorer",
      icon: Blocks,
    },
    {
      name: "Donate",
      href: "/donate",
      icon: Heart,
    }
  ]

  return (
    <div className="flex h-[100vh] w-[250px] flex-col bg-zinc-900 border-r border-zinc-800">
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Bolt className="h-6 w-6 text-cyan-400" />
          <span className="font-semibold text-cyan-400">Bitcoin LN Sandbox</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-zinc-800 text-cyan-400"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive
                    ? "text-cyan-400"
                    : "text-zinc-400 group-hover:text-cyan-400"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
