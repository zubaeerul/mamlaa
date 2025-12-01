"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { X, Bot, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const SPECIALTY_OPTIONS = [
  { value: "civil", label: "Civil Law" },
  { value: "criminal", label: "Criminal Law" },
  { value: "family", label: "Family Law" },
  { value: "property", label: "Property Law" },
  { value: "corporate", label: "Corporate/Business Law" },
  { value: "tax", label: "Tax Law" },
  { value: "labour", label: "Labour Law" },
  { value: "constitutional", label: "Constitutional/Writ Law" },
  { value: "intellectual", label: "Intellectual Property" },
  { value: "other", label: "Other" },
]

const JURISDICTION_OPTIONS = [
  { value: "supreme", label: "Supreme Court" },
  { value: "district", label: "District Court" },
  { value: "tribunal", label: "Specialized Tribunal" },
]

export function LegalAssistantChat() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<"specialty" | "jurisdiction" | "result">("specialty")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("")
  const [showQuestion, setShowQuestion] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Only show on specific pages
  const allowedPaths = ["/", "/find-lawyer", "/document-generator"]
  const shouldShow = allowedPaths.includes(pathname)

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [currentStep, showQuestion, isOpen])

  if (!shouldShow) return null

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Reset when opening
      handleRestart()
    }
  }

  const handleSpecialtySelect = (value: string, label: string) => {
    setSelectedSpecialty(value)
    setShowQuestion(false)

    // If "Other" is selected, go directly to find-lawyer without filters
    if (value === "other") {
      setTimeout(() => {
        setCurrentStep("result")
        setShowQuestion(true)
      }, 300)
    } else {
      // Move to jurisdiction question
      setTimeout(() => {
        setCurrentStep("jurisdiction")
        setShowQuestion(true)
      }, 300)
    }
  }

  const handleJurisdictionSelect = (value: string, label: string) => {
    setSelectedJurisdiction(value)
    setShowQuestion(false)

    setTimeout(() => {
      setCurrentStep("result")
      setShowQuestion(true)
    }, 300)
  }

  const handleFindLawyer = () => {
    // Build URL with query parameters for filtering
    const params = new URLSearchParams()

    if (selectedSpecialty && selectedSpecialty !== "other") {
      params.append("specialty", selectedSpecialty)
    }

    if (selectedJurisdiction) {
      params.append("jurisdiction", selectedJurisdiction)
    }

    const url = `/find-lawyer${params.toString() ? `?${params.toString()}` : ""}`
    router.push(url)
    setIsOpen(false)
  }

  const handleRestart = () => {
    setCurrentStep("specialty")
    setSelectedSpecialty("")
    setSelectedJurisdiction("")
    setShowQuestion(true)
  }

  const getSpecialtyLabel = () => {
    return SPECIALTY_OPTIONS.find((opt) => opt.value === selectedSpecialty)?.label || ""
  }

  const getJurisdictionLabel = () => {
    return JURISDICTION_OPTIONS.find((opt) => opt.value === selectedJurisdiction)?.label || ""
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all animate-in slide-in-from-bottom-10 fade-in duration-300 mb-2">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Legal Assistant</h3>
                <span className="flex items-center gap-1 text-[10px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Online
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 h-[520px] max-h-[70vh] overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900/50"
            ref={scrollRef}
          >
            {/* Step 1: Specialty Question */}
            {currentStep === "specialty" && showQuestion && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm font-medium">
                    What type of legal issue are you facing?
                  </div>
                </div>

                {/* Specialty Options */}
                <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-3 duration-400">
                  {SPECIALTY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSpecialtySelect(option.value, option.label)}
                      className="text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-200 py-3 px-4 rounded-xl transition-all text-left font-medium flex items-center justify-between group"
                    >
                      <span>{option.label}</span>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Show selected specialty */}
            {(currentStep === "jurisdiction" || currentStep === "result") && (
              <div className="space-y-2">
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm font-medium">
                    What type of legal issue are you facing?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-slate-900 text-white rounded-br-none shadow-sm">
                    {getSpecialtyLabel()}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Jurisdiction Question (only if not "Other") */}
            {currentStep === "jurisdiction" && selectedSpecialty !== "other" && showQuestion && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm font-medium">
                    Under which jurisdiction does your case fall?
                  </div>
                </div>

                {/* Jurisdiction Options */}
                <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-3 duration-400">
                  {JURISDICTION_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleJurisdictionSelect(option.value, option.label)}
                      className="text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-200 py-3 px-4 rounded-xl transition-all text-left font-medium flex items-center justify-between group"
                    >
                      <span>{option.label}</span>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Show selected jurisdiction */}
            {currentStep === "result" && selectedJurisdiction && (
              <div className="space-y-2">
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm font-medium">
                    Under which jurisdiction does your case fall?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-slate-900 text-white rounded-br-none shadow-sm">
                    {getJurisdictionLabel()}
                  </div>
                </div>
              </div>
            )}

            {/* Result: Call to Action */}
            {currentStep === "result" && showQuestion && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm font-medium">
                    {selectedSpecialty === "other"
                      ? "Click below to browse all available lawyers."
                      : selectedJurisdiction
                        ? `Great! I'll help you find a lawyer specializing in ${getSpecialtyLabel()} under ${getJurisdictionLabel()}.`
                        : "Let me help you find the right lawyer."}
                  </div>
                </div>

                {/* Find Lawyer Button */}
                <button
                  onClick={handleFindLawyer}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-4 rounded-xl transition-all font-semibold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {selectedSpecialty === "other"
                    ? "Find a Lawyer"
                    : `Find a Lawyer of ${getJurisdictionLabel() || "your choice"}`}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons at Bottom */}
          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <Button
              onClick={handleRestart}
              variant="outline"
              size="sm"
              className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border-slate-300"
            >
              Start Over
            </Button>
          </div>
        </div>
      )}

      {/* FAB */}
      <Button
        onClick={toggleChat}
        className="h-14 pl-4 pr-6 rounded-full shadow-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-bold leading-none">Ask for Assistance</span>
          <span className="text-[10px] text-slate-300 leading-none mt-1">Legal Assistant</span>
        </div>
      </Button>
    </div>
  )
}
