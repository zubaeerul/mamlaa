"use client"

import { useState } from "react"
import {
  Folder,
  Search,
  Upload,
  Filter,
  Bot,
  FileEdit,
  Share2,
  DownloadCloud,
  Eye,
  Edit,
  Download,
  ChevronRight,
  ChevronDown,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock Data Structure
type Document = {
  id: string
  name: string
  type: "AI Drafted" | "Manual Draft" | "Shared Link" | "Client Upload"
  date: string
  size: string
}

type Case = {
  id: string
  title: string
  documents: Document[]
}

type Client = {
  id: string
  name: string
  initials: string
  cases: Case[]
}

const clientsData: Client[] = [
  {
    id: "C-001",
    name: "Mr. Mizanur Rahman",
    initials: "MR",
    cases: [
      {
        id: "Case 102/23",
        title: "Land Dispute - Purbachal Plot",
        documents: [
          { id: "D-1", name: "Initial Case Filing Draft", type: "AI Drafted", date: "Oct 12, 2023", size: "1.2 MB" },
          { id: "D-2", name: "Property Deed Scan", type: "Client Upload", date: "Oct 10, 2023", size: "4.5 MB" },
        ],
      },
      {
        id: "Case 205/24",
        title: "Corporate Merger Agreement",
        documents: [
          { id: "D-3", name: "Merger Contract v2", type: "Manual Draft", date: "Jan 05, 2024", size: "2.8 MB" },
        ],
      },
    ],
  },
  {
    id: "C-002",
    name: "Ms. Farhana Ahmed",
    initials: "FA",
    cases: [
      {
        id: "Case 301/24",
        title: "Divorce Settlement",
        documents: [
          { id: "D-4", name: "Custody Agreement Shared", type: "Shared Link", date: "Feb 14, 2024", size: "Link" },
          { id: "D-5", name: "Financial Statement", type: "Manual Draft", date: "Feb 12, 2024", size: "1.5 MB" },
        ],
      },
    ],
  },
  {
    id: "C-003",
    name: "TechSolutions Ltd.",
    initials: "TS",
    cases: [
      {
        id: "Case 410/24",
        title: "IP Infringement Lawsuit",
        documents: [
          { id: "D-6", name: "Cease and Desist Letter", type: "AI Drafted", date: "Mar 01, 2024", size: "0.8 MB" },
          { id: "D-7", name: "Evidence Bundle A", type: "Client Upload", date: "Feb 28, 2024", size: "15.2 MB" },
        ],
      },
    ],
  },
]

export default function DocumentDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter logic could be implemented here based on searchQuery

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Document Repository</h1>
              <p className="text-slate-500">Browse and manage all case files in a centralized directory.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search files..."
                  className="w-full pl-9 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-slate-900 sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[140px] bg-white border-slate-300 text-slate-900">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-900">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ai">AI Drafted</SelectItem>
                  <SelectItem value="manual">Manual Draft</SelectItem>
                  <SelectItem value="shared">Shared Link</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-slate-900 hover:bg-slate-800">
                <Upload className="mr-2 h-4 w-4" />
                Upload New File
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {clientsData.map((client) => (
              <ClientSection key={client.id} client={client} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

function ClientSection({ client }: { client: Client }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border border-slate-200 bg-white overflow-hidden"
    >
      <div className="flex items-center justify-between bg-slate-50 px-4 py-3">
        <CollapsibleTrigger className="flex items-center gap-3 text-left font-medium text-slate-900 hover:text-slate-700">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-slate-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-500" />
          )}
          <Avatar className="h-8 w-8 bg-blue-100 text-blue-700 border border-blue-200">
            <AvatarFallback>{client.initials}</AvatarFallback>
          </Avatar>
          <div>
            <span className="block text-sm font-semibold">{client.name}</span>
            <span className="block text-xs text-slate-500">Client ID: {client.id}</span>
          </div>
        </CollapsibleTrigger>
        <Badge variant="outline" className="bg-white text-slate-600 border-slate-200">
          {client.cases.length} Cases
        </Badge>
      </div>
      <CollapsibleContent>
        <div className="divide-y divide-slate-100">
          {client.cases.map((caseItem) => (
            <CaseSection key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function CaseSection({ caseItem }: { caseItem: Case }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="pl-4">
      <div className="flex items-center justify-between px-4 py-2 hover:bg-slate-50/50">
        <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 py-2 w-full text-left">
          {isOpen ? (
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          )}
          <Folder className="h-4 w-4 text-blue-500" />
          <span>
            {caseItem.id} - {caseItem.title}
          </span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="pl-10 pr-4 py-2 space-y-1">
          {caseItem.documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function DocumentRow({ doc }: { doc: Document }) {
  const getDocIcon = (type: string) => {
    switch (type) {
      case "AI Drafted":
        return <Bot className="h-4 w-4 text-blue-500" />
      case "Manual Draft":
        return <FileEdit className="h-4 w-4 text-orange-500" />
      case "Shared Link":
        return <Share2 className="h-4 w-4 text-green-500" />
      case "Client Upload":
        return <DownloadCloud className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-slate-400" />
    }
  }

  const getDocBadge = (type: string) => {
    switch (type) {
      case "AI Drafted":
        return (
          <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100">
            AI Generated
          </Badge>
        )
      case "Manual Draft":
        return (
          <Badge
            variant="secondary"
            className="text-[10px] bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-100"
          >
            Manual Draft
          </Badge>
        )
      case "Shared Link":
        return (
          <Badge
            variant="secondary"
            className="text-[10px] bg-green-50 text-green-700 hover:bg-green-100 border-green-100"
          >
            Shared Link
          </Badge>
        )
      case "Client Upload":
        return (
          <Badge
            variant="secondary"
            className="text-[10px] bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100"
          >
            Client Upload
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="group flex items-center justify-between rounded-md border border-transparent p-2 hover:bg-slate-50 hover:border-slate-200 transition-all">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white border border-slate-100 shadow-sm">
          {getDocIcon(doc.type)}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-slate-900">{doc.name}</span>
            {getDocBadge(doc.type)}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{doc.date}</span>
            <span>•</span>
            <span>{doc.size}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-blue-600" title="View">
          <Eye className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-orange-600" title="Edit">
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-green-600" title="Download">
          <Download className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
