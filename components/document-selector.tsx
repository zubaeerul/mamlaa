"use client"

import { useState } from "react"
import { Search, FileText, Scale, Users, Gavel, Home, Briefcase, FileCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const documents = [
  { name: "Rent/Lease Agreement (Bhara Chukti)", type: "Non-Judicial", area: "Property", icon: Home },
  { name: "Sale Deed (Saf Kabla Dalil)", type: "Non-Judicial", area: "Property", icon: Home },
  { name: "Plaint (Arji)", type: "Judicial", area: "Civil", icon: Scale },
  { name: "First Information Report (FIR / Ejahar)", type: "Judicial", area: "Criminal", icon: Gavel },
  { name: "Affidavit (Holofnama)", type: "Non-Judicial", area: "Civil / Family", icon: FileCheck },
  { name: "Bail Petition (Jamin Abedon)", type: "Judicial", area: "Criminal", icon: Gavel },
  { name: "Power of Attorney (Am-Moktar Nama)", type: "Non-Judicial", area: "Property / Civil", icon: FileText },
  { name: "Written Statement (Jobab)", type: "Judicial", area: "Civil", icon: Scale },
  { name: "Complaint Petition (Naraji / C.R. Case)", type: "Judicial", area: "Criminal", icon: Gavel },
  { name: "Gift Deed (Heiba Dalil)", type: "Non-Judicial", area: "Property", icon: Home },
  { name: "Injunction Petition (Nishedhagga)", type: "Judicial", area: "Civil / Property", icon: Scale },
  { name: "Partnership Deed (Ongshidari Dalil)", type: "Non-Judicial", area: "Commercial / Civil", icon: Briefcase },
  { name: "Charge Sheet (Abhijog Patra)", type: "Judicial", area: "Criminal", icon: Gavel },
  { name: "Will / Testament (Wasiyat Nama)", type: "Non-Judicial", area: "Family / Property", icon: Users },
  { name: "Writ Petition", type: "Judicial", area: "Civil", icon: Scale },
  { name: "Partition Deed (Bonton Nama)", type: "Non-Judicial", area: "Property / Family", icon: Home },
  { name: "Succession Certificate Application", type: "Judicial", area: "Family / Civil", icon: Users },
  { name: "Mortgage Deed (Bandhaki Dalil)", type: "Non-Judicial", area: "Property", icon: Home },
  { name: "Decree (Ray / Digri)", type: "Judicial", area: "Civil", icon: Scale },
  { name: "Legal Notice (Ukili Notish)", type: "Non-Judicial", area: "Civil", icon: FileText },
]

interface DocumentSelectorProps {
  onSelect: (documentName: string) => void
}

export function DocumentSelector({ onSelect }: DocumentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedArea, setSelectedArea] = useState<string>("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || doc.type === selectedType
    const matchesArea = selectedArea === "all" || doc.area.includes(selectedArea)
    return matchesSearch && matchesType && matchesArea
  })

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Select a Legal Document</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Choose from our library of automated legal documents. Filter by type or legal area to find exactly what you
          need.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search document name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-slate-300 focus:ring-slate-900"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-[180px] bg-slate-900 text-white border-slate-900">
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-900 text-slate-900">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Judicial">Judicial</SelectItem>
              <SelectItem value="Non-Judicial">Non-Judicial</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-full md:w-[180px] bg-slate-900 text-white border-slate-900">
              <SelectValue placeholder="Legal Area" />
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

      {/* Document Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[40%] text-slate-900 font-semibold">Document Name</TableHead>
              <TableHead className="text-slate-900 font-semibold">Type</TableHead>
              <TableHead className="text-slate-900 font-semibold">Legal Area</TableHead>
              <TableHead className="text-right text-slate-900 font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc, index) => (
              <TableRow key={index} className="hover:bg-slate-50">
                <TableCell className="font-medium text-slate-900">
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
                <TableCell className="text-right">
                  <Button
                    onClick={() => onSelect(doc.name)}
                    className="bg-slate-900 text-white hover:bg-slate-800"
                    size="sm"
                  >
                    Select Document
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No documents found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("")
              setSelectedType("all")
              setSelectedArea("all")
            }}
            className="text-slate-900"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
