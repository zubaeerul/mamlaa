"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AiGuide } from "@/components/ai-guide"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Search,
  FileText,
  Home,
  Scale,
  FileSignature,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Download,
  Languages,
  Clock,
  Pen,
  CreditCard,
  Truck,
  Check,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"
import { documents } from "@/components/document-selector"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function DocumentGeneratorPage() {
  const [stage, setStage] = useState<1 | 2 | 3>(1)
  const [selectedDocument, setSelectedDocument] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedArea, setSelectedArea] = useState<string>("all")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  // Stage 2 Form Data
  const [formData, setFormData] = useState({
    landlordName: "",
    tenantName: "",
    propertyAddress: "",
    monthlyRent: "",
    advanceAmount: "",
  })
  const [date, setDate] = useState<Date>()

  // Stage 3 Editor State
  const [language, setLanguage] = useState<"English" | "Bangla">("English")
  const [isSaved, setIsSaved] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState<"download" | "delivery">("download")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle")

  // Filter documents for Stage 1
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || doc.type === selectedType
    const matchesArea = selectedArea === "all" || doc.area.includes(selectedArea)
    return matchesSearch && matchesType && matchesArea
  })

  const handleSelectDocument = (name: string) => {
    setSelectedDocument(name)
    setStage(2)
  }

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
      setStage(3)
    }, 3000)
  }

  const handlePayment = () => {
    setPaymentStatus("processing")
    setTimeout(() => {
      setPaymentStatus("success")
    }, 2000)
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="flex-grow">
        {/* Progress Steps */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10 mt-6">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-4 max-w-3xl mx-auto">
              <Step number={1} title="Select Template" active={stage === 1} completed={stage > 1} />
              <div className="h-0.5 w-12 bg-slate-200" />
              <Step number={2} title="Input Details" active={stage === 2} completed={stage > 2} />
              <div className="h-0.5 w-12 bg-slate-200" />
              <Step number={3} title="Review & Confirm" active={stage === 3} completed={false} />
            </div>
          </div>
        </div>

        {/* STAGE 1: Template Selection */}
        {stage === 1 && (
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl font-bold text-slate-900">What legal document do you need?</h1>
              <p className="text-lg text-slate-600">Select from our verified templates to get started.</p>
            </div>

            {/* Featured Cards */}
            {!searchQuery && selectedType === "all" && selectedArea === "all" && (
              <div className="mb-12">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Most Popular</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeaturedCard
                    title="House Rent Agreement"
                    description="Standard residential lease for landlords and tenants."
                    icon={Home}
                    badge="Most Popular"
                    onClick={() => handleSelectDocument("Rent/Lease Agreement (Bhara Chukti)")}
                  />
                  <FeaturedCard
                    title="Name Change Affidavit"
                    description="Official declaration for changing your legal name."
                    icon={FileSignature}
                    onClick={() => handleSelectDocument("Affidavit (Holofnama)")}
                  />
                  <FeaturedCard
                    title="General Power of Attorney"
                    description="Authorize someone to act on your behalf legally."
                    icon={Scale}
                    onClick={() => handleSelectDocument("Power of Attorney (Am-Moktar Nama)")}
                  />
                </div>
              </div>
            )}

            {/* All Documents Table with Filters */}
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  {searchQuery || selectedType !== "all" || selectedArea !== "all" ? "Search Results" : "All Documents"}
                </h3>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search document name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-white border-slate-300 text-slate-900 focus:ring-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full md:w-[160px] bg-white border-slate-300 text-slate-900">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 text-slate-900">
                      <SelectItem value="all" className="focus:bg-slate-100 focus:text-slate-900">
                        All Types
                      </SelectItem>
                      <SelectItem value="Judicial" className="focus:bg-slate-100 focus:text-slate-900">
                        Judicial
                      </SelectItem>
                      <SelectItem value="Non-Judicial" className="focus:bg-slate-100 focus:text-slate-900">
                        Non-Judicial
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger className="w-full md:w-[160px] bg-white border-slate-300 text-slate-900">
                      <SelectValue placeholder="Legal Area" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 text-slate-900">
                      <SelectItem value="all" className="focus:bg-slate-100 focus:text-slate-900">
                        All Areas
                      </SelectItem>
                      <SelectItem value="Civil" className="focus:bg-slate-100 focus:text-slate-900">
                        Civil
                      </SelectItem>
                      <SelectItem value="Criminal" className="focus:bg-slate-100 focus:text-slate-900">
                        Criminal
                      </SelectItem>
                      <SelectItem value="Property" className="focus:bg-slate-100 focus:text-slate-900">
                        Property
                      </SelectItem>
                      <SelectItem value="Family" className="focus:bg-slate-100 focus:text-slate-900">
                        Family
                      </SelectItem>
                      <SelectItem value="Commercial" className="focus:bg-slate-100 focus:text-slate-900">
                        Commercial
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Document Table */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="w-[40%] text-slate-900 font-semibold pl-6">Document Name</TableHead>
                      <TableHead className="text-slate-900 font-semibold">Type</TableHead>
                      <TableHead className="text-slate-900 font-semibold">Legal Area</TableHead>
                      <TableHead className="text-right text-slate-900 font-semibold pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((doc, index) => (
                        <TableRow key={index} className="hover:bg-slate-50 transition-colors">
                          <TableCell className="font-medium text-slate-900 pl-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-100 rounded-lg">
                                <doc.icon className="h-4 w-4 text-slate-700" />
                              </div>
                              {doc.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                              {doc.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600">{doc.area}</TableCell>
                          <TableCell className="text-right pr-6">
                            <Button
                              onClick={() => handleSelectDocument(doc.name)}
                              className="bg-slate-900 text-white hover:bg-slate-800 h-9"
                              size="sm"
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                          No documents found. Try adjusting your search or filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: Input Wizard */}
        {stage === 2 && (
          <div className="h-[calc(100vh-140px)] flex">
            {/* Left: Form */}
            <div className="w-1/2 overflow-y-auto p-8 border-r border-slate-200 bg-white">
              <Button
                variant="ghost"
                onClick={() => setStage(1)}
                className="mb-6 pl-0 text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Selection
              </Button>

              <div className="max-w-xl">
                <div className="mb-8">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-3">{selectedDocument}</Badge>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Enter Document Details</h2>
                  <p className="text-slate-600">
                    Fill in the information below to generate your personalized legal draft.
                  </p>
                </div>

                {/* Form Fields - Demo for Rent Agreement */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-900">Landlord Name</Label>
                    <Input
                      placeholder="e.g. Rahim Uddin"
                      value={formData.landlordName}
                      onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
                      className="bg-slate-50 border-slate-200 text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-900">Tenant Name</Label>
                    <Input
                      placeholder="e.g. Karim Ahmed"
                      value={formData.tenantName}
                      onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                      className="bg-slate-50 border-slate-200 text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-900">Property Address</Label>
                    <Input
                      placeholder="Full address of the rented property"
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                      className="bg-slate-50 border-slate-200 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-900">Monthly Rent (BDT)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={formData.monthlyRent}
                        onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                        className="bg-slate-50 border-slate-200 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-900">Advance (BDT)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={formData.advanceAmount}
                        onChange={(e) => setFormData({ ...formData, advanceAmount: e.target.value })}
                        className="bg-slate-50 border-slate-200 text-slate-900"
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
                            "w-full justify-start text-left font-normal bg-slate-50 border-slate-200 text-slate-900",
                            !date && "text-slate-500",
                          )}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="pt-6">
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          AI is drafting...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Generate Legal Document <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Placeholder */}
            <div className="w-1/2 bg-slate-100 flex items-center justify-center p-8">
              {isGenerating ? (
                <div className="text-center space-y-6 max-w-md">
                  <div className="relative h-24 w-24 mx-auto">
                    <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <FileText className="absolute inset-0 m-auto h-8 w-8 text-blue-500 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">AI is drafting your document...</h3>
                    <p className="text-slate-500">
                      Analyzing Legal Standards • Formatting Clauses • Checking Compliance
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 opacity-50">
                  <div className="h-32 w-24 border-2 border-dashed border-slate-400 rounded-lg mx-auto bg-white flex items-center justify-center">
                    <div className="space-y-2 w-full px-4">
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-slate-600">Your document will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 3: Smart Editor Lite */}
        {stage === 3 && (
          <div className="h-[calc(100vh-140px)] flex flex-col bg-slate-100">
            {/* Editor Toolbar */}
            <div className="bg-white border-b border-slate-200 shadow-sm z-10 flex flex-col">
              <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 flex items-center gap-2">
                      Draft_Rent_Agreement.pdf
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        {isEditing ? "Editing..." : "Draft Ready"}
                      </Badge>
                    </h2>
                    <p className="text-xs text-slate-500">Last saved just now</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setLanguage(language === "English" ? "Bangla" : "English")}
                    className="gap-2 bg-white text-slate-900 border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Languages className="h-4 w-4" />
                    {language === "English" ? "Switch to Bangla" : "Switch to English"}
                  </Button>

                  <Button
                    variant={isEditing ? "secondary" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                    className={cn(
                      "gap-2 text-slate-900",
                      !isEditing && "bg-white border-slate-300 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    <Pen className="h-4 w-4" />
                    {isEditing ? "Stop Editing" : "Edit Document"}
                  </Button>

                  <Separator orientation="vertical" className="h-8" />

                  <Button
                    onClick={() => setShowPaymentModal(true)}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Confirm
                  </Button>
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center gap-1 px-4 py-2 border-t bg-slate-900 overflow-x-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6 mx-1 bg-slate-700" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6 mx-1 bg-slate-700" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Document View */}
            <div className="flex-grow overflow-y-auto p-8 flex justify-center bg-slate-100">
              <div
                className={cn(
                  "w-[210mm] min-h-[297mm] bg-white shadow-lg p-[25mm] transition-all",
                  isEditing ? "outline-none ring-2 ring-blue-500/20" : "",
                )}
                contentEditable={isEditing}
                suppressContentEditableWarning
              >
                <div className="space-y-6 font-serif text-slate-900 text-sm leading-relaxed">
                  <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-bold uppercase tracking-wide decoration-double underline underline-offset-4">
                      {language === "English" ? "House Rent Agreement" : "বাড়ি ভাড়া চুক্তিপত্র"}
                    </h1>
                    <p className="text-slate-500 italic">
                      {language === "English"
                        ? "This agreement is legally binding under the Premises Rent Control Act, 1991"
                        : "এই চুক্তিটি বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১ এর অধীনে আইনত বাধ্যবাধকতামূলক"}
                    </p>
                  </div>

                  <div className="text-justify space-y-6">
                    <p>
                      {language === "English" ? (
                        <>
                          This Agreement is made on this{" "}
                          <strong>{date ? format(date, "do 'day of' MMMM, yyyy") : "___ day of ____, 20__"}</strong> at
                          Dhaka, Bangladesh.
                        </>
                      ) : (
                        <>
                          এই চুক্তিপত্র আজ{" "}
                          <strong>
                            {date ? format(date, "yyyy সালের MMMM মাসের do তারিখ") : "____ সালের ____ মাসের ____ তারিখ"}
                          </strong>{" "}
                          ঢাকা, বাংলাদেশে সম্পাদিত হলো।
                        </>
                      )}
                    </p>

                    <div className="pl-6 border-l-4 border-slate-200 py-2 my-6 bg-slate-50">
                      <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider">
                        {language === "English" ? "BETWEEN" : "প্রথম পক্ষ (মালিক)"}
                      </h3>
                      <p>
                        <strong>{formData.landlordName || "[Landlord Name]"}</strong>,{" "}
                        {language === "English" ? "National ID: ____________" : "জাতীয় পরিচয়পত্র: ____________"},{" "}
                        {language === "English" ? "hereinafter referred to as the" : "অতঃপর"}{" "}
                        <strong>"{language === "English" ? "LANDLORD" : "মালিক"}"</strong>{" "}
                        {language === "English" ? "(First Party)" : "হিসেবে গণ্য হবেন"}
                      </p>
                    </div>

                    <div className="pl-6 border-l-4 border-slate-200 py-2 my-6 bg-slate-50">
                      <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider">
                        {language === "English" ? "AND" : "দ্বিতীয় পক্ষ (ভাড়াটিয়া)"}
                      </h3>
                      <p>
                        <strong>{formData.tenantName || "[Tenant Name]"}</strong>,{" "}
                        {language === "English" ? "National ID: ____________" : "জাতীয় পরিচয়পত্র: ____________"},{" "}
                        {language === "English" ? "hereinafter referred to as the" : "অতঃপর"}{" "}
                        <strong>"{language === "English" ? "TENANT" : "ভাড়াটিয়া"}"</strong>{" "}
                        {language === "English" ? "(Second Party)" : "হিসেবে গণ্য হবেন"}
                      </p>
                    </div>

                    <p>
                      {language === "English" ? (
                        <>
                          Whereas the Landlord is the lawful owner of the residential flat located at{" "}
                          <strong>{formData.propertyAddress || "[Property Address]"}</strong> (hereinafter referred to
                          as the "Premises").
                        </>
                      ) : (
                        <>
                          যেহেতু মালিক <strong>{formData.propertyAddress || "[সম্পত্তির ঠিকানা]"}</strong> তে অবস্থিত আবাসিক
                          ফ্ল্যাটটির বৈধ মালিক (অতঃপর "বাসস্থান" হিসেবে উল্লিখিত)।
                        </>
                      )}
                    </p>

                    <h4 className="font-bold uppercase text-sm mt-8 border-b border-slate-200 pb-1">
                      {language === "English" ? "TERMS AND CONDITIONS" : "শর্তাবলী"}
                    </h4>

                    <ol className="list-decimal pl-6 space-y-4 marker:font-bold marker:text-slate-400">
                      <li className="pl-2">
                        <span className="font-semibold">{language === "English" ? "Rent:" : "ভাড়া:"}</span>{" "}
                        {language === "English"
                          ? `The monthly rent is fixed at BDT ${formData.monthlyRent || "_______"}, payable by the 5th of each month.`
                          : `মাসিক ভাড়া ${formData.monthlyRent || "_______"} টাকা নির্ধারণ করা হলো, যা প্রতি মাসের ৫ তারিখের মধ্যে পরিশোধ করতে হবে।`}
                      </li>
                      <li className="pl-2">
                        <span className="font-semibold">{language === "English" ? "Advance:" : "অগ্রিম:"}</span>{" "}
                        {language === "English"
                          ? `The Tenant has paid an advance security deposit of BDT ${formData.advanceAmount || "_______"} to the Landlord.`
                          : `ভাড়াটিয়া মালিককে ${formData.advanceAmount || "_______"} টাকা অগ্রিম জামানত হিসেবে প্রদান করেছেন।`}
                      </li>
                      <li className="pl-2">
                        <span className="font-semibold">
                          {language === "English" ? "Utility Bills:" : "ইউটিলিটি বিল:"}
                        </span>{" "}
                        {language === "English"
                          ? "Electricity, Gas, and Water bills shall be paid by the Tenant separately."
                          : "বিদ্যুৎ, গ্যাস এবং পানির বিল ভাড়াটিয়া আলাদাভাবে পরিশোধ করবেন।"}
                      </li>
                      <li className="pl-2">
                        <span className="font-semibold">{language === "English" ? "Termination:" : "চুক্তি বাতিল:"}</span>{" "}
                        {language === "English"
                          ? "Either party may terminate this agreement by giving 2 (two) months' prior written notice."
                          : "উভয় পক্ষ ২ (দুই) মাসের লিখিত নোটিশ প্রদানের মাধ্যমে এই চুক্তি বাতিল করতে পারবেন।"}
                      </li>
                    </ol>

                    <div className="grid grid-cols-2 gap-12 mt-24 pt-8">
                      <div className="border-t border-slate-900 pt-2 text-center">
                        <p className="font-bold">{formData.landlordName || "Landlord"}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Signature of Landlord</p>
                      </div>
                      <div className="border-t border-slate-900 pt-2 text-center">
                        <p className="font-bold">{formData.tenantName || "Tenant"}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Signature of Tenant</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {stage === 1 && <Footer />}
      <AiGuide />

      {/* Payment / Delivery Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[500px] bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
            <DialogDescription>Select how you would like to receive your document.</DialogDescription>
          </DialogHeader>

          {paymentStatus === "idle" && (
            <div className="py-4">
              <RadioGroup
                value={deliveryOption}
                onValueChange={(val: "download" | "delivery") => setDeliveryOption(val)}
                className="grid gap-4"
              >
                <div>
                  <RadioGroupItem value="download" id="download" className="peer sr-only" />
                  <Label
                    htmlFor="download"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Download className="h-5 w-5 text-blue-600" />
                        <span className="font-bold text-lg">Download PDF</span>
                      </div>
                      <span className="font-bold text-slate-900">৳ 500</span>
                    </div>
                    <p className="text-sm text-slate-500 w-full">Instant PDF download. Print ready format.</p>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                  <Label
                    htmlFor="delivery"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <span className="font-bold text-lg">Deliver to Address</span>
                      </div>
                      <span className="font-bold text-slate-900">৳ 650</span>
                    </div>
                    <p className="text-sm text-slate-500 w-full">Printed on stamp paper. Delivered in 2-3 days.</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {paymentStatus === "processing" && (
            <div className="py-8 text-center space-y-4">
              <div className="relative h-16 w-16 mx-auto">
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h3 className="font-semibold text-lg">Processing Payment...</h3>
              <p className="text-slate-500">Please wait while we confirm your transaction.</p>
            </div>
          )}

          {paymentStatus === "success" && (
            <div className="py-6 text-center space-y-4">
              <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-2xl text-slate-900">Payment Successful!</h3>
              <p className="text-slate-500 max-w-[80%] mx-auto">
                {deliveryOption === "download"
                  ? "Your document is ready for download."
                  : "Thank you! Your document shall be delivered to your address within 2-3 business days."}
              </p>
            </div>
          )}

          <DialogFooter className="mt-4">
            {paymentStatus === "idle" && (
              <Button onClick={handlePayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg">
                <CreditCard className="mr-2 h-5 w-5" /> Pay Now - {deliveryOption === "download" ? "৳ 500" : "৳ 650"}
              </Button>
            )}
            {paymentStatus === "success" && deliveryOption === "download" && (
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg">
                <Download className="mr-2 h-5 w-5" /> Download PDF Now
              </Button>
            )}
            {paymentStatus === "success" && deliveryOption === "delivery" && (
              <Button onClick={() => setShowPaymentModal(false)} className="w-full bg-slate-900 text-white h-12">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function Step({
  number,
  title,
  active,
  completed,
}: { number: number; title: string; active: boolean; completed: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border",
        active
          ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
          : completed
            ? "bg-green-50 text-slate-900 border-green-200"
            : "bg-white text-slate-500 border-slate-200",
      )}
    >
      <div
        className={cn(
          "h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] transition-colors",
          active ? "bg-white text-slate-900" : completed ? "bg-green-500 text-white" : "bg-slate-100 text-slate-400",
        )}
      >
        {completed ? <CheckCircle2 className="h-3 w-3" /> : number}
      </div>
      <span
        className={cn(
          "font-medium text-xs hidden sm:block transition-colors",
          active ? "text-white" : completed ? "text-slate-900" : "text-slate-500",
        )}
      >
        {title}
      </span>
    </div>
  )
}

function FeaturedCard({ title, description, icon: Icon, badge, onClick }: any) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group relative overflow-hidden bg-white"
    >
      {badge && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          {badge}
        </div>
      )}
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
