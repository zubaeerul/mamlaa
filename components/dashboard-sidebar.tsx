"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Users, CheckSquare, DollarSign, Settings, LogOut, Home } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Case Diary", href: "/dashboard/case-diary" },
  { icon: Users, label: "Client Registry", href: "/dashboard/client-registry" },
  { icon: CheckSquare, label: "Task Manager", href: "/dashboard/task-manager" },
  { icon: DollarSign, label: "Financials", href: "/dashboard/financials" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-slate-900 text-white">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <span className="text-xl font-bold">mamlaa Partner</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white",
                pathname === item.href ? "bg-slate-800 text-white" : "text-slate-400",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t border-slate-800">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </nav>
      </div>
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">Adv. Rahman</p>
            <p className="truncate text-xs text-slate-400">Senior Partner</p>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
