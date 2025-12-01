import type React from "react"
// ... existing code ...
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LegalAssistantChat } from "@/components/legal-assistant-chat"

// ... existing code ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <LegalAssistantChat />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
