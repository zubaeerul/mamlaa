'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Header() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en')
  const pathname = usePathname()

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en')
  }

  const nav = {
    en: {
      findLawyer: 'Find a Lawyer',
      bookLawyer: 'Book a Lawyer',
      generateDocument: 'Generate Document',
      forLawFirms: 'For Law Firms'
    },
    bn: {
      findLawyer: 'আইনজীবী খুঁজুন',
      bookLawyer: 'আইনজীবী বুক করুন',
      generateDocument: 'ডকুমেন্ট তৈরি করুন',
      forLawFirms: 'আইন ফার্মের জন্য'
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-white">mamlaa.com</Link>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/find-lawyer" 
              className={cn(
                "font-medium transition-colors hover:text-white",
                isActive('/find-lawyer') ? "text-white" : "text-slate-300"
              )}
            >
              {nav[language].findLawyer}
            </Link>
            <Link 
              href="/book-lawyer" 
              className={cn(
                "font-medium transition-colors hover:text-white",
                isActive('/book-lawyer') ? "text-white" : "text-slate-300"
              )}
            >
              {nav[language].bookLawyer}
            </Link>
            <Link 
              href="/document-generator" 
              className={cn(
                "font-medium transition-colors hover:text-white",
                isActive('/document-generator') ? "text-white" : "text-slate-300"
              )}
            >
              {nav[language].generateDocument}
            </Link>
            <Link 
              href="/dashboard" 
              className={cn(
                "font-medium transition-colors hover:text-white",
                isActive('/dashboard') ? "text-white" : "text-slate-300"
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
            {language === 'en' ? 'বাংলা' : 'English'}
          </Button>
        </div>
      </div>
    </header>
  )
}
