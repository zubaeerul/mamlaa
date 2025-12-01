"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  const pathname = usePathname()

  const getBreadcrumb = () => {
    const path = pathname.split("/").pop()
    if (!path || path === "dashboard") return "Dashboard"
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span>Home</span>
        <span>&gt;</span>
        <span className="font-medium text-slate-900">{getBreadcrumb()}</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 hover:text-slate-900">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          <span className="sr-only">Notifications</span>
        </Button>
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9 border border-slate-200">
              <AvatarImage src="/images/3d-avatar-lawyer-male.jpg" alt="Adv. Rahman" className="object-cover" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </Button>
        </nav>
      </div>
    </header>
  )
}
