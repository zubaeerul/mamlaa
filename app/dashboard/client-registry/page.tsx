"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Phone, MessageCircle, CheckCircle2, Plus, FileText, Trash2, Calendar, User, Building2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function ClientRegistryPage() {
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [isAddClientOpen, setIsAddClientOpen] = useState(false)

  const [clients] = useState([
    {
      id: "#CL-882",
      name: "Mr. Mizanur Rahman",
      phone: "+880 1712 345 678",
      email: "mizanur@example.com",
      address: "Banani, Dhaka",
      status: "Active",
      image: "/images/3d-avatar-male-3.jpg",
      type: "Individual",
      initials: "MR",
      activeCases: [
        { id: "CS-2025-001", title: "Land Dispute - Plot 42", status: "Hearing", nextDate: "12 Nov 2025" },
        { id: "CS-2023-112", title: "Partition Suit", status: "Closed", nextDate: "Judgment Delivered" },
      ],
      sharedDocs: [
        { name: "Land Deed 1998.pdf", status: "Verified" },
        { name: "Power of Attorney.docx", status: "Draft" },
        { name: "Tax Clearance 2024.pdf", status: "Review Pending" },
      ],
    },
    {
      id: "#CL-765",
      name: "Ms. Fatema Chowdhury",
      phone: "+880 1912 765 432",
      email: "fatema@example.com",
      address: "Uttara, Dhaka",
      status: "Active",
      image: "/images/3d-avatar-female-3.jpg",
      type: "Individual",
      initials: "FC",
      activeCases: [
        { id: "CS-2025-045", title: "Divorce Petition", status: "Active", nextDate: "05 Dec 2025" },
        { id: "CS-2025-048", title: "Child Custody Hearing", status: "Urgent", nextDate: "28 Nov 2025" },
      ],
      sharedDocs: [
        { name: "Marriage Contract.pdf", status: "Uploaded" },
        { name: "Custody_Agreement_Draft_v1.docx", status: "Draft" },
      ],
    },
    {
      id: "#CL-553",
      name: "Rahman Textile Ltd.",
      phone: "+880 2 8823456",
      email: "info@rahmantextile.com",
      address: "Tejgaon I/A, Dhaka",
      status: "Active",
      image: "/images/3d-avatar-office.jpg",
      type: "Corporate",
      initials: "RT",
      activeCases: [
        { id: "CS-2024-220", title: "Labor Dispute - Batch A", status: "Mediation", nextDate: "15 Dec 2025" },
        { id: "CS-2024-225", title: "VAT Appeal Tribunal", status: "Active", nextDate: "10 Jan 2026" },
        { id: "CS-2022-090", title: "Contract Breach Suit", status: "Closed", nextDate: "Settled" },
      ],
      sharedDocs: [
        { name: "Trade License 2025.pdf", status: "Verified" },
        { name: "Board Resolution_Nov.pdf", status: "Uploaded" },
        { name: "Audit Report 2024.xlsx", status: "Review Pending" },
      ],
    },
    {
      id: "#CL-442",
      name: "Mr. Abdul Karim",
      phone: "+880 1834 567 890",
      email: "abdul.karim@email.com",
      address: "Dhanmondi, Dhaka",
      status: "Inactive",
      image: "/images/3d-avatar-male-2.jpg",
      type: "Individual",
      initials: "AK",
      activeCases: [{ id: "CS-2023-015", title: "Defamation Suit", status: "Closed", nextDate: "Dismissed" }],
      sharedDocs: [
        { name: "Character Certificate.pdf", status: "Verified" },
        { name: "Legal Notice Response.docx", status: "Final" },
      ],
    },
    {
      id: "#CL-339",
      name: "Green Valley Properties",
      phone: "+880 2 9887766",
      email: "legal@greenvalley.bd",
      address: "Gulshan-2, Dhaka",
      status: "Active",
      image: "/images/business-building.jpg",
      type: "Corporate",
      initials: "GV",
      activeCases: [
        { id: "CS-2025-101", title: "Land Registration - Block D", status: "Processing", nextDate: "02 Dec 2025" },
        { id: "CS-2025-104", title: "Zoning Violation Inquiry", status: "Active", nextDate: "20 Dec 2025" },
      ],
      sharedDocs: [
        { name: "Project Plan Approval.pdf", status: "Verified" },
        { name: "Environmental Clearance.pdf", status: "Pending" },
        { name: "Client List_Confidential.xlsx", status: "Uploaded" },
      ],
    },
  ])

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Client Repository</h1>
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0f172a] hover:bg-[#0f172a]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-slate-900">Register New Client</DialogTitle>
              <DialogDescription>Enter the client's details below.</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="individual" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-100 mb-4">
                <TabsTrigger
                  value="individual"
                  className="text-slate-900 data-[state=active]:bg-[#0f172a] data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <User className="mr-2 h-4 w-4" /> Individual
                </TabsTrigger>
                <TabsTrigger
                  value="corporate"
                  className="text-slate-900 data-[state=active]:bg-[#0f172a] data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <Building2 className="mr-2 h-4 w-4" /> Corporate
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="max-h-[60vh] pr-4">
                <TabsContent value="individual" className="mt-0 space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                      <User className="h-4 w-4" /> Personal Info
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-slate-900">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="e.g. Abul Kalam"
                          className="bg-slate-50 border-slate-200 text-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-900">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+880..."
                          className="bg-slate-50 border-slate-200 text-slate-900"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-900">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="client@example.com"
                        className="bg-slate-50 border-slate-200 text-slate-900"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Demographics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dob" className="text-slate-900">
                          Date of Birth
                        </Label>
                        <Input id="dob" type="date" className="bg-slate-50 border-slate-200 text-slate-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nid" className="text-slate-900">
                          NID Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="nid"
                          placeholder="National ID"
                          required
                          className="bg-slate-50 border-slate-200 text-slate-900"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fatherName" className="text-slate-900">
                          Father's Name
                        </Label>
                        <Input id="fatherName" className="bg-slate-50 border-slate-200 text-slate-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="motherName" className="text-slate-900">
                          Mother's Name
                        </Label>
                        <Input id="motherName" className="bg-slate-50 border-slate-200 text-slate-900" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentAddress" className="text-slate-900">
                        Present Address
                      </Label>
                      <Input id="presentAddress" className="bg-slate-50 border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="permanentAddress" className="text-slate-900">
                        Permanent Address
                      </Label>
                      <Input id="permanentAddress" className="bg-slate-50 border-slate-200 text-slate-900" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="corporate" className="mt-0 space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> Company Details
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-slate-900">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="e.g. Jamuna Trading Ltd"
                        required
                        className="bg-slate-50 border-slate-200 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tradeLicense" className="text-slate-900">
                        Trade License No.
                      </Label>
                      <Input
                        id="tradeLicense"
                        placeholder="License Number"
                        className="bg-slate-50 border-slate-200 text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName" className="text-slate-900">
                          Contact Person Name
                        </Label>
                        <Input
                          id="contactName"
                          placeholder="Full Name"
                          className="bg-slate-50 border-slate-200 text-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation" className="text-slate-900">
                          Designation
                        </Label>
                        <Input
                          id="designation"
                          placeholder="e.g. Managing Director"
                          className="bg-slate-50 border-slate-200 text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="officialPhone" className="text-slate-900">
                          Official Phone
                        </Label>
                        <Input
                          id="officialPhone"
                          placeholder="+880..."
                          className="bg-slate-50 border-slate-200 text-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="officialEmail" className="text-slate-900">
                          Official Email
                        </Label>
                        <Input
                          id="officialEmail"
                          type="email"
                          placeholder="info@company.com"
                          className="bg-slate-50 border-slate-200 text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyAddress" className="text-slate-900">
                        Company Address
                      </Label>
                      <Input
                        id="companyAddress"
                        placeholder="Registered Office Address"
                        className="bg-slate-50 border-slate-200 text-slate-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="authLetter" className="text-slate-900">
                        Authorization Letter / Board Resolution
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="authLetter"
                          type="file"
                          className="bg-slate-50 border-slate-200 text-slate-900 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsAddClientOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#0f172a] hover:bg-[#0f172a]/90" onClick={() => setIsAddClientOpen(false)}>
                Save Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client, index) => (
          <Card
            key={index}
            className="overflow-hidden bg-white border-gray-200 shadow-sm rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-blue-200 group"
            onClick={() => setSelectedClient(client)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 ring-2 ring-transparent group-hover:ring-blue-100 transition-all">
                  <AvatarImage src={client.image || "/placeholder.svg"} alt={client.name} />
                  <AvatarFallback>{client.initials}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg text-slate-900">{client.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{client.phone}</p>

                <div className="flex items-center gap-2 mb-4">
                  {client.status === "Active" && (
                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified NID
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-slate-600 border-slate-200">
                    {client.type === "Individual" ? "Individual" : "Corporate"}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 p-4 flex justify-center gap-4 border-t border-slate-100">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white border border-slate-200 shadow-sm hover:bg-blue-50 hover:text-blue-700 text-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="h-4 w-4" />
                <span className="sr-only">Call</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white border border-slate-200 shadow-sm hover:bg-green-50 hover:text-green-700 text-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">WhatsApp</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Sheet open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <SheetContent className="sm:max-w-[540px] bg-white overflow-y-auto">
          {selectedClient && (
            <div className="space-y-6">
              <SheetHeader className="text-left space-y-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedClient.image || "/placeholder.svg"} />
                    <AvatarFallback>{selectedClient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-xl font-bold text-slate-900">{selectedClient.name}</SheetTitle>
                    <SheetDescription className="text-slate-500">
                      Client since 2023 • {selectedClient.type === "Individual" ? "Individual" : "Corporate"}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full grid grid-cols-3 bg-[#0f172a] p-1 mb-6">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-slate-400"
                  >
                    Profile Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="cases"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-slate-400"
                  >
                    Case History
                  </TabsTrigger>
                  <TabsTrigger
                    value="docs"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-slate-400"
                  >
                    Shared Docs
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6 animate-in fade-in-50">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-500" /> Personal Details
                    </h4>
                    <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-slate-500">Full Name</span>
                        <span className="text-sm font-medium text-slate-900 col-span-2">{selectedClient.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-slate-500">Phone</span>
                        <span className="text-sm font-medium text-slate-900 col-span-2">{selectedClient.phone}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-slate-500">Email</span>
                        <span className="text-sm font-medium text-slate-900 col-span-2">{selectedClient.email}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-slate-500">Address</span>
                        <span className="text-sm font-medium text-slate-900 col-span-2">{selectedClient.address}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cases" className="space-y-4 animate-in fade-in-50">
                  <h4 className="font-medium text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-500" />
                    Case History & Active Matters
                  </h4>
                  {selectedClient.activeCases?.length > 0 ? (
                    <div className="space-y-3">
                      {selectedClient.activeCases.map((caseItem: any) => (
                        <div
                          key={caseItem.id}
                          className="p-4 border border-slate-200 rounded-lg hover:border-blue-200 transition-colors bg-white"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium text-slate-900">{caseItem.title}</h5>
                              <p className="text-xs text-slate-500 font-mono mt-1">{caseItem.id}</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                caseItem.status === "Closed" || caseItem.status === "Settled"
                                  ? "bg-slate-100 text-slate-600"
                                  : caseItem.status === "Urgent"
                                    ? "bg-red-50 text-red-700"
                                    : "bg-blue-50 text-blue-700"
                              }
                            >
                              {caseItem.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-xs text-slate-600 mt-3">
                            <Calendar className="h-3 w-3 mr-1" />
                            {caseItem.status === "Closed" || caseItem.status === "Settled"
                              ? "Outcome: "
                              : "Next Date: "}
                            {caseItem.nextDate}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                      No active cases found.
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="docs" className="space-y-6 animate-in fade-in-50">
                  <div className="flex items-center justify-between">
                    <div />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
                      Share New Document
                    </Button>
                  </div>

                  {selectedClient.sharedDocs?.length > 0 ? (
                    <div className="space-y-2">
                      {selectedClient.sharedDocs.map((doc: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-blue-100 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center border border-slate-200 text-blue-600">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                              <p className="text-xs text-slate-500">{doc.status}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                      No active shared documents.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
