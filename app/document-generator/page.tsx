"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DocumentWizard } from "@/components/document-wizard"
import { DocumentSelector } from "@/components/document-selector"

export default function DocumentGeneratorPage() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        {!selectedDocument ? (
          <DocumentSelector onSelect={setSelectedDocument} />
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedDocument(null)}
              className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2"
            >
              ← Back to Document Selection
            </button>
            <DocumentWizard documentName={selectedDocument} />
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
