"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const pathname = usePathname()

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "bn" : "en"))
  }

  const nav = {
    en: {
      findLawyer: "Find a Lawyer",
      generateDocument: "Generate Document",
      forLawFirms: "mamlaa SaaS",
    },
    bn: {
      findLawyer: "আইনজীবী খুঁজুন",
      generateDocument: "ডকুমেন্ট তৈরি করুন",
      forLawFirms: "আইন ফার্মের জন্য",
    },
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-white">
              mamlaa.com
            </Link>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/find-lawyer"
              className={cn(
                "text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 active:scale-95",
                isActive("/find-lawyer")
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white",
              )}
            >
              {nav[language].findLawyer}
            </Link>
            <Link
              href="/document-generator"
              className={cn(
                "text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 active:scale-95",
                isActive("/document-generator")
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white",
              )}
            >
              {nav[language].generateDocument}
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 active:scale-95",
                isActive("/dashboard")
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white",
              )}
            >
              {nav[language].forLawFirms}
            </Link>
          </nav>

          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
          >
            {language === "en" ? "বাংলা" : "English"}
          </Button>
        </div>
      </div>
    </header>
  )
}
