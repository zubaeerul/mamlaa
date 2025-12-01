"use client"

import * as React from "react"
import {
  Save,
  Clock,
  Languages,
  Bot,
  FileText,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Search,
  GripVertical,
  Send,
  FolderOpen,
  Upload,
  Loader2,
  MessageSquare,
  Share2,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const clients = [
  { id: "c1", name: "Mr. Mizanur Rahman" },
  { id: "c2", name: "XYZ Tech Solutions" },
  { id: "c3", name: "ABC Properties Ltd." },
]

const clientDocs: Record<string, Array<{ id: string; name: string; date: string; type: string }>> = {
  c1: [
    { id: "d1", name: "Land_Dispute_Brief.pdf", date: "Nov 20, 2025", type: "Brief" },
    { id: "d2", name: "Power_of_Attorney.docx", date: "Oct 15, 2025", type: "Contract" },
  ],
  c2: [
    { id: "d3", name: "Rent_Agreement_v1.pdf", date: "Nov 22, 2025", type: "AI Draft" },
    { id: "d4", name: "NDA_Employee.pdf", date: "Nov 10, 2025", type: "Agreement" },
  ],
  c3: [{ id: "d5", name: "Property_Deed_Draft.docx", date: "Nov 01, 2025", type: "Deed" }],
}

export default function SmartEditorPage() {
  const [documentName, setDocumentName] = React.useState("Commercial Lease Agreement")
  const [isSaved, setIsSaved] = React.useState(true)
  const [language, setLanguage] = React.useState("English")
  const [isRightPanelOpen, setIsRightPanelOpen] = React.useState(true) // Added state for right panel

  const [openDocModalOpen, setOpenDocModalOpen] = React.useState(false)
  const [selectedClient, setSelectedClient] = React.useState<string>("")
  const [isUploading, setIsUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleOpenDocument = (docName: string) => {
    setDocumentName(docName)
    setOpenDocModalOpen(false)
    toast.success(`Opened document: ${docName}`)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      setDocumentName(file.name)
      setIsUploading(false)
      toast.success(`Loaded content from ${file.name}`)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2 border-b bg-slate-50">
        <Dialog open={openDocModalOpen} onOpenChange={setOpenDocModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-100">
              <FolderOpen className="mr-2 h-4 w-4" />
              Open Document
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[600px] text-slate-900">
            <DialogHeader>
              <DialogTitle>Select Document to Edit</DialogTitle>
              <DialogDescription>Choose a client to view their available documents.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select Client
                </label>
                <Select onValueChange={setSelectedClient} value={selectedClient}>
                  <SelectTrigger className="w-full bg-white border-slate-200 text-slate-900">
                    <SelectValue placeholder="Select a client..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 text-slate-900">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id} className="focus:bg-slate-100 focus:text-slate-900">
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClient && (
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Available Documents</label>
                  <ScrollArea className="h-[200px] rounded-md border border-slate-200 p-2">
                    <div className="space-y-1">
                      {clientDocs[selectedClient]?.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => handleOpenDocument(doc.name)}
                          className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm hover:bg-slate-100 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span className="font-medium text-slate-700 group-hover:text-slate-900">{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>{doc.type}</span>
                            <span>{doc.date}</span>
                          </div>
                        </button>
                      ))}
                      {!clientDocs[selectedClient] && (
                        <div className="text-center text-sm text-slate-500 py-8">
                          No documents found for this client.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpenDocModalOpen(false)}
                className="bg-white border-slate-300 text-slate-900 hover:bg-slate-100"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf,.docx,.txt"
          />
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload New
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <Input
              value={documentName}
              onChange={(e) => {
                setDocumentName(e.target.value)
                setIsSaved(false)
              }}
              className="h-8 font-semibold text-slate-900 border-transparent hover:border-gray-200 focus:border-blue-500 w-[280px] px-2"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {isSaved ? (
              <span className="flex items-center gap-1 text-green-600">
                <Save className="h-3 w-3" /> Auto-saved
              </span>
            ) : (
              <span className="text-amber-600">Unsaved changes...</span>
            )}
            <Separator orientation="vertical" className="h-4" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-500 text-xs font-normal">
                  <Clock className="mr-1 h-3 w-3" /> v2.4 <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white border-slate-200 text-slate-900">
                <DropdownMenuItem className="focus:bg-slate-100 focus:text-slate-900">v2.4 (Current)</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-slate-100 focus:text-slate-900">
                  v2.3 - Edited by Adv. Rahman
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-slate-100 focus:text-slate-900">
                  v2.2 - Initial Draft
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage((l) => (l === "English" ? "Bangla" : "English"))}
          >
            <Languages className="mr-2 h-4 w-4" />
            {language === "English" ? "Translate to Bangla" : "Back to English"}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b bg-slate-900 overflow-x-auto">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white">
          <Redo className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1 bg-slate-700" />
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white">
          <Underline className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1 bg-slate-700" />
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {" "}
        {/* Main Editor Area */}
        <div className="flex-1 bg-gray-100 overflow-y-auto p-8 flex justify-center transition-all duration-300">
          <div
            className="w-full max-w-[850px] bg-white min-h-[4000px] shadow-sm border p-[48px] outline-none text-slate-900"
            contentEditable
            suppressContentEditableWarning
          >
            {/* ... existing editor content ... */}
            <h1 className="text-xl font-bold text-center mb-8 text-slate-900 uppercase underline">
              COMMERCIAL LEASE AGREEMENT
            </h1>

            <p className="mb-4 text-sm text-justify leading-relaxed text-slate-900">
              This Lease Agreement (the "Lease") is made and entered into as of{" "}
              <span className="bg-yellow-100 px-1">November 22, 2025</span>, by and between{" "}
              <strong>ABC Properties Ltd.</strong> ("Landlord") and <strong>XYZ Tech Solutions</strong> ("Tenant").
            </p>

            <h2 className="text-base font-bold mt-6 mb-3 text-slate-900 uppercase">1. PREMISES</h2>
            <p className="mb-4 text-sm text-justify leading-relaxed text-slate-900">
              Landlord hereby leases to Tenant the premises located at <em>123 Gulshan Avenue, Dhaka-1212</em> (the
              "Premises") for use as a software development office.
            </p>

            <h2 className="text-base font-bold mt-6 mb-3 text-slate-900 uppercase">2. TERM</h2>
            <p className="mb-4 text-sm text-justify leading-relaxed text-slate-900">
              The term of this Lease shall be for a period of{" "}
              <span className="bg-red-100 border-b-2 border-red-400 px-1 relative group cursor-help">
                5 (five) years
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs p-2 rounded whitespace-nowrap z-50">
                  Comment: Should we reduce to 3 years? - Adv. Rahman
                </span>
              </span>{" "}
              commencing on December 1, 2025.
            </p>

            <h2 className="text-base font-bold mt-6 mb-3 text-slate-900 uppercase">3. RENT</h2>
            <p className="mb-4 text-sm text-justify leading-relaxed text-slate-900">
              Tenant agrees to pay Landlord a monthly rent of <strong>BDT 150,000</strong>, payable in advance on the
              first day of each calendar month.
            </p>

            <h2 className="text-base font-bold mt-6 mb-3 text-slate-900 uppercase">4. SECURITY DEPOSIT</h2>
            <p className="mb-4 text-sm text-justify leading-relaxed text-slate-900">
              Upon execution of this Lease, Tenant shall deposit with Landlord the sum of <strong>BDT 450,000</strong>{" "}
              as security for the performance of Tenant's obligations under this Lease.
            </p>

            <h2 className="text-base font-bold mt-6 mb-3 text-slate-900 uppercase">5. USE OF PREMISES</h2>
            <p className="mb-4 text-sm text-justify leading-relaxed text-slate-900">
              The Premises shall be used for commercial office purposes only. Tenant shall not use the Premises for any
              unlawful purpose or in any manner that would disturb the quiet enjoyment of other tenants in the building.
            </p>

            <h2 className="text-base font-bold mt-6 mb-3 text-slate-900 uppercase">6. UTILITIES</h2>
            <p className="mb-4 text-sm text-justify leading-relaxed text-slate-900">
              Tenant shall be responsible for the payment of all utilities used on the Premises, including but not
              limited to electricity, water, gas, internet, and telephone services.
            </p>
          </div>
        </div>
        {/* Collapse Toggle Button */}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-10 w-8 rounded-l-lg rounded-r-none shadow-md border border-r-0 bg-white text-slate-600 hover:text-slate-900 z-50 transition-all duration-300 ease-in-out",
            isRightPanelOpen ? "right-80" : "right-0",
          )}
          title={isRightPanelOpen ? "Collapse Panel" : "Expand Panel"}
        >
          {isRightPanelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        {/* Right Sidebar - Smart Tools (Moved from Left) */}
        <div
          className={cn(
            "border-l bg-gray-50 flex flex-col transition-all duration-300 ease-in-out relative",
            isRightPanelOpen ? "w-80 translate-x-0" : "w-0 translate-x-full border-none overflow-hidden",
          )}
        >
          <div className={cn("flex-1 flex flex-col min-w-[20rem]", !isRightPanelOpen && "hidden")}>
            {" "}
            <Tabs defaultValue="clauses" className="flex-1 flex flex-col">
              <div className="px-4 py-3 border-b bg-white">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="clauses" title="Clauses">
                    <FileText className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="assistant" title="AI Assistant">
                    <Bot className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="comments" title="Comments">
                    <MessageSquare className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="share" title="Share & Access">
                    <Share2 className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="clauses" className="flex-1 p-0 m-0">
                <div className="p-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search clauses..." className="pl-8 bg-white" />
                  </div>
                  <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Common Clauses
                      </div>
                      {["Termination", "Force Majeure", "Confidentiality", "Dispute Resolution", "Governing Law"].map(
                        (clause) => (
                          <Card
                            key={clause}
                            className="p-3 cursor-move hover:border-blue-400 transition-colors bg-white group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-500">{clause}</span>
                              <GripVertical className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
                            </div>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              Standard {clause.toLowerCase()} clause for commercial agreements...
                            </p>
                          </Card>
                        ),
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="assistant" className="flex-1 p-0 m-0 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-white p-3 rounded-lg border shadow-sm text-sm text-slate-700">
                        Hello Adv. Rahman. I can help you draft or review clauses. How can I assist?
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-white font-medium">AR</span>
                      </div>
                      <div className="bg-slate-900 text-white p-3 rounded-lg text-sm">
                        Rewrite the termination clause to include a 30-day notice period.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-white p-3 rounded-lg border shadow-sm text-sm text-slate-700">
                        Here is a suggested revision:
                        <br />
                        <br />
                        "Either party may terminate this Agreement for any reason by providing at least thirty (30)
                        days' prior written notice to the other party."
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-white">
                  <div className="relative">
                    <Input placeholder="Ask AI..." className="pr-10" />
                    <Button size="icon" variant="ghost" className="absolute right-0 top-0 text-blue-600">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Comments Tab Content */}
              <TabsContent value="comments" className="flex-1 p-0 m-0 flex flex-col">
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm text-slate-900">Comments</h3>
                    <span className="text-xs text-slate-500">3 threads</span>
                  </div>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Comment
                  </Button>
                </div>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <Card className="p-3 space-y-2 bg-white">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/images/3d-avatar-female-1.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-900">Sarah Khan</span>
                            <span className="text-[10px] text-slate-500">2h ago</span>
                          </div>
                          <p className="text-xs text-slate-600">Should we increase the security deposit to 6 months?</p>
                        </div>
                      </div>
                      <div className="pl-9">
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600 hover:text-blue-700 p-0">
                          Reply
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-3 space-y-2 bg-white border-l-4 border-l-amber-400">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/images/1598305879-2.jpg" />
                          <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-900">Adv. Rahman</span>
                            <span className="text-[10px] text-slate-500">1d ago</span>
                          </div>
                          <p className="text-xs text-slate-600">
                            The termination clause needs to align with local rental laws.
                          </p>
                        </div>
                      </div>
                      <div className="pl-9 pt-2 border-t mt-2">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src="/images/3d-avatar-male-1.jpg" />
                            <AvatarFallback>MK</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-xs text-slate-600">
                              <span className="font-medium text-slate-900">M. Karim:</span> Agreed, I'll update it.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Share/Access Tab Content */}
              <TabsContent value="share" className="flex-1 p-0 m-0 flex flex-col">
                <div className="p-4 border-b bg-white space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-slate-900">Share Document</h3>
                    <div className="flex gap-2">
                      <Input placeholder="Email address" className="h-8 text-xs" />
                      <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white">
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4">
                  <h3 className="font-semibold text-sm text-slate-900 mb-3">Who has access</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/images/1598305879-2.jpg" />
                          <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Adv. Rahman (You)</p>
                          <p className="text-xs text-slate-500">Owner</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/images/3d-avatar-female-1.jpg" />
                          <AvatarFallback>SK</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Sarah Khan</p>
                          <p className="text-xs text-slate-500">sarah.k@example.com</p>
                        </div>
                      </div>
                      <Select defaultValue="editor">
                        <SelectTrigger className="w-[90px] h-7 text-xs bg-white border-slate-300 text-slate-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200 text-slate-900">
                          <SelectItem value="viewer" className="focus:bg-slate-100 focus:text-slate-900">
                            Viewer
                          </SelectItem>
                          <SelectItem value="commenter" className="focus:bg-slate-100 focus:text-slate-900">
                            Commenter
                          </SelectItem>
                          <SelectItem value="editor" className="focus:bg-slate-100 focus:text-slate-900">
                            Editor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/images/3d-avatar-male-1.jpg" />
                          <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-900">M. Karim</p>
                          <p className="text-xs text-slate-500">karim.m@example.com</p>
                        </div>
                      </div>
                      <Select defaultValue="viewer">
                        <SelectTrigger className="w-[90px] h-7 text-xs bg-white border-slate-300 text-slate-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200 text-slate-900">
                          <SelectItem value="viewer" className="focus:bg-slate-100 focus:text-slate-900">
                            Viewer
                          </SelectItem>
                          <SelectItem value="commenter" className="focus:bg-slate-100 focus:text-slate-900">
                            Commenter
                          </SelectItem>
                          <SelectItem value="editor" className="focus:bg-slate-100 focus:text-slate-900">
                            Editor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h3 className="font-semibold text-sm text-slate-900 mb-3">General Access</h3>
                    <div className="flex items-center justify-between p-2 rounded-lg border bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-200 p-2 rounded-full">
                          <Share2 className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Restricted</p>
                          <p className="text-xs text-slate-500">Only added people can open</p>
                        </div>
                      </div>
                      <Button variant="link" size="sm" className="text-blue-600 h-auto p-0">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
