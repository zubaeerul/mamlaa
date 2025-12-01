"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Bot, X, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Step {
  id: "specialty" | "jurisdiction" | "result"
  question: string
}

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

export function AiGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<"specialty" | "jurisdiction" | "result">("specialty")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("")
  const [showQuestion, setShowQuestion] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [currentStep, showQuestion, isOpen])

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
    <>
      {/* Floating Action Button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105",
          isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-slate-900 hover:bg-slate-800",
        )}
        aria-label={isOpen ? "Close Ask for Assistance" : "Open Ask for Assistance"}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Bot className="h-7 w-7 text-white" />}
      </Button>

      {!isOpen && (
        <div className="fixed bottom-8 right-24 z-50 bg-white dark:bg-slate-900 py-2 px-4 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hidden md:flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Ask for Assistance</span>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <Bot className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Legal Assistant</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                Ready to help
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 h-[450px] overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900/50"
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
    </>
  )
}
