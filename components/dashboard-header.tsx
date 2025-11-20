"use client"

import { Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

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
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-gray-100 px-6">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span>Home</span>
        <span>&gt;</span>
        <span className="font-medium text-slate-900">{getBreadcrumb()}</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-slate-700 hover:bg-gray-200 hover:text-slate-900">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button className="bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" />
          Create New Case
        </Button>
      </div>
    </header>
  )
}
