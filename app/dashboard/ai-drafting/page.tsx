"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Loader2, CalendarIcon, FileEdit, File, Search } from "lucide-react"
import { documents } from "@/components/document-selector"

export default function AiDraftingStudio() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedDocument, setSelectedDocument] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [date, setDate] = useState<Date>()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedArea, setSelectedArea] = useState<string>("all")

  // Form Data State
  const [formData, setFormData] = useState({
    landlordName: "Rahim Uddin",
    tenantName: "",
    propertyAddress: "",
    monthlyRent: "",
    advanceAmount: "",
  })

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === "all" || doc.type === selectedType
      const matchesArea = selectedArea === "all" || doc.area.includes(selectedArea)
      return matchesSearch && matchesType && matchesArea
    })
  }, [searchQuery, selectedType, selectedArea])

  const handleGenerate = () => {
    setIsGenerating(true)
    setIsGenerated(false)

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 3000)
  }

  const handleEditInSmartEditor = () => {
    toast({
      title: "Opening in Smart Editor...",
      description: "Redirecting you to the full document editor.",
    })
    // In a real app, we would pass the data to the smart editor
    setTimeout(() => {
      router.push("/dashboard/smart-editor")
    }, 1000)
  }

  const isRentDeed = selectedDocument === "Rent/Lease Agreement (Bhara Chukti)"

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-slate-50">
      {/* LEFT COLUMN: Input Wizard */}
      <div className="w-1/2 overflow-y-auto border-r border-slate-200 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">AI Drafting Studio</h1>
          <p className="text-slate-500">Select a document to begin drafting.</p>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-slate-900 font-medium">
              Search Document Name
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="search"
                placeholder="Search document name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white border-slate-300 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Type and Legal Area Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-slate-900 font-medium">
                Type
              </Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type" className="bg-white border-slate-300 text-slate-900">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-900 text-slate-900">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Judicial">Judicial</SelectItem>
                  <SelectItem value="Non-Judicial">Non-Judicial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area" className="text-slate-900 font-medium">
                Legal Area
              </Label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger id="area" className="bg-white border-slate-300 text-slate-900">
                  <SelectValue placeholder="All Areas" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-900 text-slate-900">
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Criminal">Criminal</SelectItem>
                  <SelectItem value="Property">Property</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Document Name Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="document" className="text-slate-900 font-medium">
              Document Name
            </Label>
            <Select value={selectedDocument} onValueChange={setSelectedDocument}>
              <SelectTrigger id="document" className="bg-white border-slate-300 text-slate-900">
                <SelectValue placeholder="Select a document" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-900 text-slate-900 max-h-[300px]">
                {filteredDocuments.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-sm">No documents found</div>
                ) : (
                  filteredDocuments.map((doc, index) => (
                    <SelectItem key={index} value={doc.name}>
                      {doc.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dynamic Form - Only show for Rent Deed */}
        {isRentDeed && (
          <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="landlord" className="text-slate-900">
                  Landlord Name
                </Label>
                <Input
                  id="landlord"
                  value={formData.landlordName}
                  onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
                  className="bg-white border-gray-300 text-slate-900 focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenant" className="text-slate-900">
                  Tenant Name
                </Label>
                <Input
                  id="tenant"
                  placeholder="Enter Tenant Name"
                  value={formData.tenantName}
                  onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                  className="bg-white border-gray-300 text-slate-900 focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-900">
                  Property Address
                </Label>
                <Input
                  id="address"
                  placeholder="Full Address"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  className="bg-white border-gray-300 text-slate-900 focus-visible:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rent" className="text-slate-900">
                    Monthly Rent (BDT)
                  </Label>
                  <Input
                    id="rent"
                    type="number"
                    placeholder="0.00"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                    className="bg-white border-gray-300 text-slate-900 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advance" className="text-slate-900">
                    Advance Amount (BDT)
                  </Label>
                  <Input
                    id="advance"
                    type="number"
                    placeholder="0.00"
                    value={formData.advanceAmount}
                    onChange={(e) => setFormData({ ...formData, advanceAmount: e.target.value })}
                    className="bg-white border-gray-300 text-slate-900 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-900">Contract Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border-gray-300 text-slate-900 hover:bg-gray-50",
                        !date && "text-slate-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white text-slate-900 border-slate-200" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="bg-white text-slate-900 rounded-md border border-slate-100"
                      classNames={{
                        head_cell: "text-slate-500 font-normal text-[0.8rem]",
                        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 rounded-md text-slate-900",
                        day_selected:
                          "bg-slate-900 text-white hover:bg-slate-900 hover:text-white focus:bg-slate-900 focus:text-white",
                        day_today: "bg-slate-100 text-slate-900",
                        day_outside: "text-slate-300 opacity-50",
                        day_disabled: "text-slate-300 opacity-50",
                        day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
                        day_hidden: "invisible",
                        nav_button: "border border-slate-200 hover:bg-slate-100 hover:text-slate-900",
                        caption: "flex justify-center pt-1 relative items-center text-slate-900 font-medium",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <Button
          className="mt-8 w-full bg-slate-900 text-white hover:bg-slate-800 py-6 text-lg"
          onClick={handleGenerate}
          disabled={isGenerating || !isRentDeed}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              AI Analyzing Precedents...
            </>
          ) : (
            "Generate Draft"
          )}
        </Button>

        {selectedDocument && !isRentDeed && (
          <p className="mt-4 text-center text-sm text-slate-500">
            Document template coming soon. Currently only Rent/Lease Agreement is available for demo.
          </p>
        )}
      </div>

      {/* RIGHT COLUMN: Live Preview */}
      <div className="flex w-1/2 items-center justify-center bg-slate-100 p-8">
        {!isGenerated && !isGenerating && (
          <div className="flex flex-col items-center justify-center text-center text-slate-400">
            <div className="mb-4 rounded-full bg-white p-6 shadow-sm">
              <File className="h-16 w-16 text-slate-300" />
            </div>
            <p className="text-lg font-medium">Fill the form and click Generate to see the draft.</p>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-slate-600 animate-pulse">Drafting document with AI...</p>
          </div>
        )}

        {isGenerated && (
          <div className="relative h-full w-full max-w-[21cm] flex flex-col">
            <div className="mb-4 flex justify-end">
              <Button
                onClick={handleEditInSmartEditor}
                className="bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Edit in Smart Editor
              </Button>
            </div>

            <Card className="flex-1 overflow-y-auto bg-white p-12 shadow-lg text-slate-900">
              <div className="mx-auto max-w-2xl space-y-6 font-serif">
                <h2 className="text-center text-xl font-bold underline mb-8">RESIDENTIAL RENT AGREEMENT</h2>

                <p className="text-justify leading-relaxed">
                  This <strong>AGREEMENT</strong> is made on this <strong>{date ? format(date, "do") : "___"}</strong>{" "}
                  day of <strong>{date ? format(date, "MMMM, yyyy") : "_______, 20__"}</strong> at{" "}
                  <strong>{formData.propertyAddress || "________________"}</strong>.
                </p>

                <div className="my-6 space-y-4">
                  <p className="text-justify leading-relaxed">
                    <strong>BETWEEN</strong>
                  </p>
                  <p className="text-justify leading-relaxed">
                    <strong>{formData.landlordName}</strong>, having National ID No. _______________, residing at
                    ________________________ (hereinafter referred to as the <strong>"LANDLORD"</strong>, which
                    expression shall include his/her heirs, successors, and legal representatives) of the ONE PART.
                  </p>
                  <p className="text-center font-bold">AND</p>
                  <p className="text-justify leading-relaxed">
                    <strong>{formData.tenantName || "________________"}</strong>, having National ID No. _______________
                    (hereinafter referred to as the <strong>"TENANT"</strong>, which expression shall include his/her
                    heirs, successors, and legal representatives) of the OTHER PART.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold">WHEREAS:</h3>
                  <p className="text-justify leading-relaxed">
                    The Landlord is the lawful owner of the residential flat/house located at{" "}
                    <strong>{formData.propertyAddress || "________________"}</strong> (hereinafter referred to as the
                    "PREMISES").
                  </p>
                  <p className="text-justify leading-relaxed">
                    The Tenant has requested to take the said Premises on rent for residential purposes, and the
                    Landlord has agreed to let out the same on the following terms and conditions:
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold">NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:</h3>
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="pl-2">
                      <strong>Rent:</strong> The monthly rent for the Premises shall be{" "}
                      <strong>BDT {formData.monthlyRent || "_______"}</strong>, payable in advance by the 5th day of
                      each English calendar month.
                    </li>
                    <li className="pl-2">
                      <strong>Advance/Security Deposit:</strong> The Tenant has paid an amount of{" "}
                      <strong>BDT {formData.advanceAmount || "_______"}</strong> as an advance/security deposit, which
                      shall be adjustable/refundable at the time of vacating the Premises.
                    </li>
                    <li className="pl-2">
                      <strong>Period:</strong> This agreement shall be valid for a period of <strong>11 Months</strong>{" "}
                      starting from <strong>{date ? format(date, "PPP") : "_______"}</strong>.
                    </li>
                    <li className="pl-2">
                      <strong>Utilities:</strong> Electricity, Gas, and Water bills shall be paid by the Tenant as per
                      the meter reading or fixed monthly charges.
                    </li>
                    <li className="pl-2">
                      <strong>Maintenance:</strong> The Tenant shall keep the Premises in good tenantable condition and
                      shall not make any structural changes without the written consent of the Landlord.
                    </li>
                    <li className="pl-2">
                      <strong>Termination:</strong> Either party may terminate this agreement by serving 2 (two) months'
                      prior written notice.
                    </li>
                  </ol>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8 pt-12">
                  <div className="border-t border-black pt-2 text-center">
                    <p>Signature of Landlord</p>
                  </div>
                  <div className="border-t border-black pt-2 text-center">
                    <p>Signature of Tenant</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
