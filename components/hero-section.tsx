'use client'

import { useState } from 'react'
import Image from 'next/image'

export function HeroSection() {
  const [language] = useState<'en' | 'bn'>('en')

  const content = {
    en: {
      headline: "Get reliable legal solutions",
      subtext: "Verify lawyers, book consultations, and auto-generate legal documents."
    },
    bn: {
      headline: "নির্ভরযোগ্য আইনি সমাধান পান",
      subtext: "আইনজীবী যাচাই করুন, পরামর্শ বুক করুন এবং স্বয়ংক্রিয়ভাবে আইনি নথি তৈরি করুন।"
    }
  }

  return (
    <section className="bg-gradient-to-b from-secondary/30 to-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Centered content since images are removed */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight text-balance">
            {content[language].headline}
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground text-pretty">
            {content[language].subtext}
          </p>
        </div>
      </div>
    </section>
  )
}
