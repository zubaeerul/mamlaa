"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Search, Plus, AlertTriangle, CheckCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { format } from "date-fns"

// Mock Data
const MOCK_CLIENTS = [
  { id: "CL-882", name: "Mr. Rahim Uddin" },
  { id: "CL-943", name: "Jamuna Trading Ltd" },
  { id: "CL-721", name: "Ms. Fatema Begum" },
  { id: "CL-155", name: "Sunrise Logistics" },
]

const MOCK_LAWYERS = ["Adv. Kamal Hossain", "Adv. Sarah Ahmed", "Adv. Rafiqul Islam", "Adv. Nusrat Jahan"]

export default function CaseDiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [opposingParty, setOpposingParty] = useState("")
  const [filingDate, setFilingDate] = useState<Date>()
  const [nextHearingDate, setNextHearingDate] = useState<Date>()

  // Conflict Check Logic
  const getConflictStatus = (name: string) => {
    if (!name) return "neutral"
    const lowerName = name.toLowerCase()
    if (lowerName.includes("evil") || lowerName.includes("bad") || lowerName.includes("conflict")) {
      return "danger"
    }
    return "safe"
  }

  const conflictStatus = getConflictStatus(opposingParty)

  const handleCreateCase = () => {
    // Reset and close
    setIsModalOpen(false)
    setStep(1)
    setSelectedClient("")
    setOpposingParty("")
    setFilingDate(undefined)
    setNextHearingDate(undefined)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Case Diary & Court Dates</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create New Case
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-slate-900">{step === 1 ? "Select Client" : "Case Details"}</DialogTitle>
            </DialogHeader>

            {step === 1 ? (
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-select" className="text-slate-900">
                    Select Client
                  </Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger id="client-select" className="bg-white border-slate-200 text-slate-900">
                      <SelectValue placeholder="Search or select client..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      {MOCK_CLIENTS.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id}
                          className="text-slate-900 focus:bg-slate-100 focus:text-slate-900"
                        >
                          <span className="font-medium">{client.name}</span>
                          <span className="ml-2 text-xs text-slate-500">#{client.id}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedClient}
                    className="bg-blue-900 text-white hover:bg-blue-800"
                  >
                    Next: Case Details
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-900">Case Title/Type</Label>
                    <Input
                      placeholder="e.g., Property Dispute"
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-900">Case Number</Label>
                    <Input
                      placeholder="e.g., C.R. Case 102/23"
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-900">Court Name</Label>
                  <Select>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                      <SelectValue placeholder="Select Court" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="supreme" className="text-slate-900 focus:bg-slate-100 focus:text-slate-900">
                        Supreme Court
                      </SelectItem>
                      <SelectItem value="high" className="text-slate-900 focus:bg-slate-100 focus:text-slate-900">
                        High Court Division
                      </SelectItem>
                      <SelectItem value="district" className="text-slate-900 focus:bg-slate-100 focus:text-slate-900">
                        Dhaka District Court
                      </SelectItem>
                      <SelectItem value="magistrate" className="text-slate-900 focus:bg-slate-100 focus:text-slate-900">
                        Chief Metropolitan Magistrate Court
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-900">Opposing Party</Label>
                  <Input
                    value={opposingParty}
                    onChange={(e) => setOpposingParty(e.target.value)}
                    placeholder="Enter opposing party name"
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />

                  {/* Conflict Check Widget */}
                  {opposingParty && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      {conflictStatus === "danger" ? (
                        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <AlertTitle className="text-red-900 font-semibold">Conflict of Interest Detected!</AlertTitle>
                          <AlertDescription className="text-red-800">
                            This party is already represented by Adv. Sarah Ahmed in Case #CS-404.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert className="bg-green-50 border-green-200 text-green-900">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertTitle className="text-green-900 font-semibold">No Conflict Found</AlertTitle>
                          <AlertDescription className="text-green-800">
                            It is safe to proceed with this client.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-900">Filing Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white border-slate-200 text-slate-900",
                            !filingDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filingDate ? format(filingDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border-slate-200" align="start">
                        <Calendar
                          mode="single"
                          selected={filingDate}
                          onSelect={setFilingDate}
                          initialFocus
                          className="bg-white text-slate-900"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-900">Next Hearing Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white border-slate-200 text-slate-900",
                            !nextHearingDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {nextHearingDate ? format(nextHearingDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border-slate-200" align="start">
                        <Calendar
                          mode="single"
                          selected={nextHearingDate}
                          onSelect={setNextHearingDate}
                          initialFocus
                          className="bg-white text-slate-900"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-900">Assigned Lawyer</Label>
                  <Select>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                      <SelectValue placeholder="Select Lawyer" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      {MOCK_LAWYERS.map((lawyer) => (
                        <SelectItem
                          key={lawyer}
                          value={lawyer}
                          className="text-slate-900 focus:bg-slate-100 focus:text-slate-900"
                        >
                          {lawyer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="bg-white border-slate-300 text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                  >
                    Back
                  </Button>
                  <Button onClick={handleCreateCase} className="bg-blue-900 text-white hover:bg-blue-800">
                    Save Case
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by Case No..."
            className="pl-9 bg-slate-900 text-white border-slate-700 placeholder:text-slate-400 focus-visible:ring-blue-500"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px] bg-slate-900 text-white border-slate-700 focus:ring-blue-500">
            <SelectValue placeholder="Filter by Court Type" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-900 text-slate-900">
            <SelectItem value="supreme">Supreme Court</SelectItem>
            <SelectItem value="high">High Court</SelectItem>
            <SelectItem value="district">District Court</SelectItem>
            <SelectItem value="magistrate">Magistrate Court</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal bg-gray-100 border-gray-300 text-slate-900 hover:bg-gray-200",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-slate-700" />
              <span>Pick a date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white text-slate-900 border-slate-200" align="start">
            <Calendar
              mode="single"
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

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 hover:bg-gray-50">
              <TableHead className="text-gray-700">Date</TableHead>
              <TableHead className="text-gray-700">Case Info</TableHead>
              <TableHead className="text-gray-700">Client</TableHead>
              <TableHead className="text-gray-700">Status</TableHead>
              <TableHead className="text-gray-700">Automation</TableHead>
              <TableHead className="text-right text-gray-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-gray-200 hover:bg-gray-50">
              <TableCell className="font-bold text-gray-900">19 Nov 2025</TableCell>
              <TableCell>
                <div className="font-medium text-gray-900">C.R. Case 102/23</div>
                <div className="text-xs text-gray-500">Dhaka District Court</div>
              </TableCell>
              <TableCell>
                <a href="#" className="text-blue-600 hover:underline">
                  Mr. Rahim Uddin
                </a>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Hearing Pending</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch id="sms-1" checked />
                  <Label htmlFor="sms-1" className="text-sm text-gray-600">
                    Auto-SMS Scheduled
                  </Label>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                  View Order Sheet
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="border-gray-200 hover:bg-gray-50">
              <TableCell className="font-bold text-gray-900">20 Nov 2025</TableCell>
              <TableCell>
                <div className="font-medium text-gray-900">Civil Suit 45/24</div>
                <div className="text-xs text-gray-500">Chittagong High Court</div>
              </TableCell>
              <TableCell>
                <a href="#" className="text-blue-600 hover:underline">
                  Ms. Fatema Begum
                </a>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Order Passed
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch id="sms-2" />
                  <Label htmlFor="sms-2" className="text-sm text-gray-600">
                    Auto-SMS Off
                  </Label>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                  View Order Sheet
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
