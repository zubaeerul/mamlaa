"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calendar,
  CheckCircle2,
  DollarSign,
  Settings,
  Home,
  FileEdit,
  Bot,
  Folder,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuSections = [
  {
    items: [{ icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" }],
  },
  {
    header: "LEGAL PRACTICE",
    items: [
      { icon: Users, label: "Client Registry", href: "/dashboard/client-registry" },
      { icon: Calendar, label: "Case Diary", href: "/dashboard/case-diary" },
      { icon: CheckCircle2, label: "Task Manager", href: "/dashboard/task-manager" },
    ],
  },
  {
    header: "DOCUMENT SUITE",
    items: [
      { icon: Bot, label: "AI Drafting Studio", href: "/dashboard/ai-drafting" },
      { icon: FileEdit, label: "Smart Editor", href: "/dashboard/smart-editor" },
      { icon: Folder, label: "Document Directory", href: "/dashboard/document-directory" },
    ],
  },
  {
    header: "ADMIN",
    items: [
      { icon: DollarSign, label: "Financials", href: "/dashboard/financials" },
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-[#0f172a] text-white">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <span className="text-xl font-bold">mamlaa Partner</span>
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-6 px-4">
          {menuSections.map((section, index) => (
            <div key={index} className="space-y-2">
              {section.header && (
                <h3 className="px-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase">{section.header}</h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-white",
                      pathname === item.href
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 mt-8 border-t border-slate-800">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 border-2 border-slate-700">
            <AvatarImage src="/images/3d-avatar-lawyer-male.jpg" alt="Adv. Rahman" className="object-cover" />
            <AvatarFallback className="bg-slate-800 text-slate-300">AR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Adv. Rahman</span>
            <span className="text-xs text-slate-400">Senior Associate</span>
          </div>
        </div>
      </div>
    </div>
  )
}
