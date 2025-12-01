"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  Search,
  CheckCircle2,
  CalendarIcon,
  Mail,
  Phone,
  Video,
  Building,
  ChevronsUpDown,
  Check,
  X,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AiGuide } from "@/components/ai-guide"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const BANGLADESH_DISTRICTS = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
]

const lawyers = [
  {
    id: 1,
    name: "Adv. Rahim Uddin",
    type: "Supreme Court",
    court: "Appellate Division",
    sanad: "SC-102",
    verified: true,
    enrolled: "1998",
    status: "Active",
    address: "Room 202, Supreme Court Bar Bhaban",
    phone: "01711XXXXXX",
    email: "rahim@example.com",
    avatar: "/images/3d-avatar-lawyer-male.jpg",
    specialty: "Civil Law",
  },
  {
    id: 2,
    name: "Adv. Fatema Begum",
    type: "District Court",
    court: "Dhaka Judge Court",
    sanad: "D-445",
    verified: true,
    enrolled: "2010",
    status: "Active",
    address: "Suite 4, Paltan Tower",
    phone: "01819XXXXXX",
    email: "fatema@example.com",
    avatar: "/images/3d-avatar-female-1.jpg",
    specialty: "Criminal Law",
  },
  {
    id: 3,
    name: "Adv. Kamal Hossain",
    type: "High Court",
    court: "High Court Division",
    sanad: "H-882",
    verified: false,
    enrolled: "2015",
    status: "Active",
    address: "N/A",
    phone: "Hidden",
    email: "Hidden",
    avatar: "/images/3d-avatar-male-1.jpg",
    specialty: "Corporate/Business Law",
  },
  {
    id: 4,
    name: "Adv. Sohel Rana",
    type: "Legal Aid",
    court: "Narayanganj Court",
    sanad: "N-331",
    verified: false,
    enrolled: "2018",
    status: "Active",
    address: "N/A",
    phone: "Hidden",
    email: "Hidden",
    avatar: "/images/3d-avatar-male-2.jpg",
    specialty: "Family Law",
  },
  {
    id: 5,
    name: "Adv. Nasrin Akter",
    type: "Supreme Court",
    court: "High Court Division",
    sanad: "SC-559",
    verified: true,
    enrolled: "2005",
    status: "Active",
    address: "Chamber 305, Supreme Court",
    phone: "01912XXXXXX",
    email: "nasrin@example.com",
    avatar: "/images/3d-avatar-female-2.jpg",
    specialty: "Property Law",
  },
]

export default function FindLawyerPage() {
  const searchParams = useSearchParams()

  const [selectedLawyer, setSelectedLawyer] = useState<(typeof lawyers)[0] | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [requestType, setRequestType] = useState("")

  const [jurisdiction, setJurisdiction] = useState("")
  const [courtType, setCourtType] = useState("")
  const [location, setLocation] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [openDistrictCombobox, setOpenDistrictCombobox] = useState(false)

  const [caseCategory, setCaseCategory] = useState("")
  const [specificArea, setSpecificArea] = useState("")
  const [openModalDistrictCombobox, setOpenModalDistrictCombobox] = useState(false)
  const [modalDistrict, setModalDistrict] = useState("")

  useEffect(() => {
    const specialtyParam = searchParams.get("specialty")
    const jurisdictionParam = searchParams.get("jurisdiction")

    if (specialtyParam) {
      setSpecialty(specialtyParam)
    }

    if (jurisdictionParam) {
      setJurisdiction(jurisdictionParam)
    }
  }, [searchParams])

  const getCourtTypeOptions = () => {
    if (jurisdiction === "supreme") {
      return [
        { value: "appellate", label: "Appellate Division" },
        { value: "high", label: "High Court Division" },
      ]
    }
    if (jurisdiction === "tribunal") {
      return [
        { value: "nari", label: "Nari O Shishu Nirjatan Daman Tribunal" },
        { value: "artha", label: "Artha Rin Adalat" },
        { value: "labour", label: "Labour Court" },
        { value: "cyber", label: "Cyber Tribunal" },
        { value: "admin", label: "Administrative Tribunal" },
      ]
    }
    return []
  }

  const getSpecificAreaOptions = () => {
    switch (caseCategory) {
      case "civil":
        return [
          { value: "money-suit", label: "Money Suit" },
          { value: "injunction", label: "Injunction" },
          { value: "damages", label: "Damages" },
          { value: "arbitration", label: "Arbitration" },
        ]
      case "criminal":
        return [
          { value: "bail", label: "Bail" },
          { value: "cheque", label: "Cheque Dishonour" },
          { value: "nari", label: "Nari O Shishu" },
          { value: "cyber", label: "Cyber Crime" },
        ]
      case "family":
        return [
          { value: "divorce", label: "Divorce" },
          { value: "custody", label: "Custody" },
          { value: "inheritance", label: "Inheritance" },
          { value: "dower", label: "Dower" },
        ]
      case "property":
        return [
          { value: "land", label: "Land Dispute" },
          { value: "registration", label: "Registration" },
          { value: "mutation", label: "Mutation" },
          { value: "eviction", label: "Eviction" },
        ]
      case "corporate":
        return [
          { value: "formation", label: "Company Formation" },
          { value: "trade", label: "Trade License" },
          { value: "vat", label: "VAT/Tax" },
        ]
      default:
        return []
    }
  }

  const handleJurisdictionChange = (value: string) => {
    setJurisdiction(value)
    setCourtType("")
    setLocation("")

    if (value === "supreme") {
      setLocation("Dhaka")
    }
  }

  const handleResetFilters = () => {
    setJurisdiction("")
    setCourtType("")
    setLocation("")
    setSpecialty("")
    setSearchQuery("")
  }

  const handleRowClick = (lawyer: (typeof lawyers)[0]) => {
    setSelectedLawyer(lawyer)
    setIsSheetOpen(true)
  }

  const openRequestModal = (type: string) => {
    setRequestType(type)
    setIsModalOpen(true)
  }

  const handlePlaceRequest = () => {
    setIsModalOpen(false)
    setIsSheetOpen(false)
    setCaseCategory("")
    setSpecificArea("")
    setModalDistrict("")
    alert(`Request sent to ${selectedLawyer?.name}! Confirmation email sent to you.`)
  }

  const filteredLawyers = lawyers.filter((lawyer) => {
    // Search filter (Name or Sanad)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesName = lawyer.name.toLowerCase().includes(query)
      const matchesSanad = lawyer.sanad.toLowerCase().includes(query)
      if (!matchesName && !matchesSanad) return false
    }

    // Specialty filter
    if (specialty) {
      const specialtyMap: Record<string, string> = {
        civil: "Civil Law",
        criminal: "Criminal Law",
        family: "Family Law",
        property: "Property Law",
        corporate: "Corporate/Business Law",
        tax: "Tax Law",
        labour: "Labour Law",
        intellectual: "Intellectual Property",
        cyber: "Cyber Crime",
      }
      const expectedSpecialty = specialtyMap[specialty]
      if (expectedSpecialty && lawyer.specialty !== expectedSpecialty) return false
    }

    // Jurisdiction filter
    if (jurisdiction === "supreme") {
      if (lawyer.type !== "Supreme Court" && lawyer.type !== "High Court") return false

      // Court Type filter for Supreme Court
      if (courtType === "appellate" && lawyer.court !== "Appellate Division") return false
      if (courtType === "high" && lawyer.court !== "High Court Division") return false
    } else if (jurisdiction === "district") {
      if (lawyer.type !== "District Court" && lawyer.type !== "Legal Aid") return false

      // Location filter for District Court
      if (location) {
        // Check if lawyer's court contains the district name
        if (!lawyer.court.toLowerCase().includes(location.toLowerCase())) return false
      }
    } else if (jurisdiction === "tribunal") {
      // For tribunal, check if court matches specialized tribunal types
      const tribunalTypes = ["Tribunal", "Adalat", "Labour Court"]
      const isFromTribunal = tribunalTypes.some((type) => lawyer.court.includes(type))
      if (!isFromTribunal) return false

      // Court Type filter for Tribunals
      if (courtType === "nari" && !lawyer.court.includes("Nari")) return false
      if (courtType === "artha" && !lawyer.court.includes("Artha")) return false
      if (courtType === "labour" && !lawyer.court.includes("Labour")) return false
      if (courtType === "cyber" && !lawyer.court.includes("Cyber")) return false
      if (courtType === "admin" && !lawyer.court.includes("Admin")) return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Header />

      <header className="bg-[#0f172a] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Find a Lawyer</h1>

          <div className="bg-white p-4 rounded-xl shadow-lg space-y-4 text-slate-900">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <Label className="text-xs font-bold text-slate-700 mb-1">Jurisdiction</Label>
                <Select value={jurisdiction} onValueChange={handleJurisdictionChange}>
                  <SelectTrigger className="bg-white text-slate-900 border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <SelectValue placeholder="Select Jurisdiction" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-900">
                    <SelectItem value="supreme" className="hover:bg-slate-100 hover:text-slate-900">
                      Supreme Court
                    </SelectItem>
                    <SelectItem value="district" className="hover:bg-slate-100 hover:text-slate-900">
                      District Court
                    </SelectItem>
                    <SelectItem value="tribunal" className="hover:bg-slate-100 hover:text-slate-900">
                      Specialized Tribunal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label
                  className={`text-xs font-bold mb-1 ${
                    jurisdiction && jurisdiction !== "district" ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  Court Type
                </Label>
                <Select
                  value={courtType}
                  onValueChange={setCourtType}
                  disabled={!jurisdiction || jurisdiction === "district"}
                >
                  <SelectTrigger
                    className={`border-slate-300 transition-colors ${
                      jurisdiction && jurisdiction !== "district"
                        ? "bg-white text-slate-900 hover:bg-slate-50 hover:text-slate-900"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <SelectValue
                      placeholder={jurisdiction === "district" ? "Select Location First" : "Select Court Type"}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-900">
                    {getCourtTypeOptions().map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="hover:bg-slate-100 hover:text-slate-900"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label className={`text-xs font-bold mb-1 ${jurisdiction ? "text-slate-700" : "text-slate-400"}`}>
                  Location / District
                </Label>
                {jurisdiction === "supreme" ? (
                  <Input
                    value="Dhaka"
                    disabled
                    className="bg-slate-100 text-slate-600 border-slate-300 cursor-not-allowed"
                  />
                ) : (
                  <Popover open={openDistrictCombobox} onOpenChange={setOpenDistrictCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openDistrictCombobox}
                        disabled={!jurisdiction}
                        className={`w-full justify-between border-slate-300 transition-colors ${
                          jurisdiction
                            ? "bg-white text-slate-900 hover:bg-slate-50 hover:text-slate-900"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {location || "Select District..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0 bg-white">
                      <Command className="bg-white">
                        <CommandInput placeholder="Search district..." className="text-slate-900" />
                        <CommandList>
                          <CommandEmpty className="text-slate-500">No district found.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {BANGLADESH_DISTRICTS.map((district) => (
                              <CommandItem
                                key={district}
                                value={district}
                                onSelect={(currentValue) => {
                                  setLocation(currentValue === location ? "" : currentValue)
                                  setOpenDistrictCombobox(false)
                                }}
                                className="text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                              >
                                <Check
                                  className={cn("mr-2 h-4 w-4", location === district ? "opacity-100" : "opacity-0")}
                                />
                                {district}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label className="text-xs font-bold text-slate-700 mb-1">Specialty</Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger className="bg-white text-slate-900 border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <SelectValue placeholder="Select Specialty" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-900">
                    <SelectItem value="civil" className="hover:bg-slate-100 hover:text-slate-900">
                      Civil Law
                    </SelectItem>
                    <SelectItem value="criminal" className="hover:bg-slate-100 hover:text-slate-900">
                      Criminal Law
                    </SelectItem>
                    <SelectItem value="family" className="hover:bg-slate-100 hover:text-slate-900">
                      Family Law
                    </SelectItem>
                    <SelectItem value="property" className="hover:bg-slate-100 hover:text-slate-900">
                      Property Law
                    </SelectItem>
                    <SelectItem value="corporate" className="hover:bg-slate-100 hover:text-slate-900">
                      Corporate/Business Law
                    </SelectItem>
                    <SelectItem value="tax" className="hover:bg-slate-100 hover:text-slate-900">
                      Tax Law
                    </SelectItem>
                    <SelectItem value="labour" className="hover:bg-slate-100 hover:text-slate-900">
                      Labour Law
                    </SelectItem>
                    <SelectItem value="intellectual" className="hover:bg-slate-100 hover:text-slate-900">
                      Intellectual Property
                    </SelectItem>
                    <SelectItem value="cyber" className="hover:bg-slate-100 hover:text-slate-900">
                      Cyber Crime
                    </SelectItem>
                    <SelectItem value="other" className="hover:bg-slate-100 hover:text-slate-900">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-[2] min-w-[300px] relative">
                <Label className="text-xs font-bold text-slate-700 mb-1">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    placeholder="Search by Name or Sanad No..."
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Search</Button>
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardContent className="p-0">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <p className="text-sm text-slate-600">
                Showing <span className="font-bold text-slate-900">{filteredLawyers.length}</span> lawyer(s)
                {(jurisdiction || specialty || searchQuery || location) && " matching your criteria"}
              </p>
            </div>
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="font-bold text-slate-900">Name</TableHead>
                  <TableHead className="font-bold text-slate-900">Court Type</TableHead>
                  <TableHead className="font-bold text-slate-900">Court Name</TableHead>
                  <TableHead className="font-bold text-slate-900">Sanad No</TableHead>
                  <TableHead className="font-bold text-slate-900 text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLawyers.length > 0 ? (
                  filteredLawyers.map((lawyer) => (
                    <TableRow
                      key={lawyer.id}
                      className="cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => handleRowClick(lawyer)}
                    >
                      <TableCell className="font-medium text-slate-900">{lawyer.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-300">
                          {lawyer.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700">{lawyer.court}</TableCell>
                      <TableCell className="font-mono text-slate-600">{lawyer.sanad}</TableCell>
                      <TableCell className="text-center">
                        {lawyer.verified ? (
                          <div className="flex justify-center">
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 gap-1">
                              <CheckCircle2 className="h-3 w-3 fill-blue-600 text-white" /> Verified
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500">Registered</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <p className="font-semibold mb-1">No lawyers found</p>
                        <p className="text-sm">Try adjusting your filters to see more results</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-white text-slate-900 border-0 shadow-2xl pl-8">
          {selectedLawyer && (
            <div className="space-y-6 py-4">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
                <Avatar className="h-20 w-20 ring-4 ring-blue-50">
                  <AvatarImage src={selectedLawyer.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-slate-900 text-white text-2xl font-bold">
                    {selectedLawyer.name.charAt(5)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedLawyer.name}</h2>
                  <p className="text-slate-600 mb-2">{selectedLawyer.type}</p>
                  {selectedLawyer.verified && (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 gap-1">
                      <CheckCircle2 className="h-3 w-3 fill-blue-600 text-white" /> Verified
                    </Badge>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-5 space-y-4 border border-slate-200">
                <h3 className="font-bold text-sm uppercase text-slate-600 mb-3">Professional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Sanad No.</p>
                    <p className="font-bold text-slate-900 text-lg font-mono">{selectedLawyer.sanad}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Enrolment Year</p>
                    <p className="font-bold text-slate-900 text-lg">{selectedLawyer.enrolled}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Court</p>
                    <p className="font-semibold text-slate-800">{selectedLawyer.court}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Status</p>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                      {selectedLawyer.status}
                    </Badge>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Chamber Address</p>
                  <p className="text-slate-800 font-medium flex items-start gap-2">
                    <Building className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                    {selectedLawyer.address}
                  </p>
                </div>
              </div>

              {selectedLawyer.verified && (
                <div className="bg-blue-50 p-5 rounded-lg space-y-3 border border-blue-200">
                  <h3 className="font-bold text-sm uppercase text-slate-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-900 bg-white p-3 rounded border border-blue-100">
                      <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">{selectedLawyer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-900 bg-white p-3 rounded border border-blue-100">
                      <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">{selectedLawyer.email}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedLawyer.verified ? (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900">Request an Appointment</h3>
                  <p className="text-sm text-slate-600">Choose your preferred consultation method:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-5 flex flex-col gap-2 shadow-md hover:shadow-lg transition-all"
                      onClick={() => openRequestModal("Virtual")}
                    >
                      <Video className="h-7 w-7" />
                      <span className="font-semibold">Virtual Meeting</span>
                      <span className="text-xs opacity-90">Online Consultation</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-slate-300 h-auto py-5 flex flex-col gap-2 hover:bg-slate-50 hover:border-slate-400 text-slate-900 bg-white shadow-sm hover:shadow-md transition-all"
                      onClick={() => openRequestModal("Chamber")}
                    >
                      <Building className="h-7 w-7 text-slate-700" />
                      <span className="font-semibold text-slate-900">Chamber Visit</span>
                      <span className="text-xs text-slate-600">In-Person Meeting</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-900">
                  <p className="font-semibold mb-1">Verification Pending</p>
                  <p className="text-sm">
                    This lawyer is registered with the Bar Council but not yet a verified panel member. Direct
                    appointment booking is unavailable.
                  </p>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Request {requestType} Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase text-slate-600 border-b pb-2">1. Your Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-900">
                    Full Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    placeholder="Your Name"
                    className="bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-900">
                    Contact Number <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    placeholder="+880..."
                    className="bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-900">
                    Email Address <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-900">Gender</Label>
                  <Select>
                    <SelectTrigger className="bg-white text-slate-900 border-slate-300 hover:bg-slate-50 hover:text-slate-900">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-slate-900">
                      <SelectItem value="m" className="hover:bg-slate-100 hover:text-slate-900">
                        Male
                      </SelectItem>
                      <SelectItem value="f" className="hover:bg-slate-100 hover:text-slate-900">
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-900">Address</Label>
                  <Input
                    placeholder="Full Address"
                    className="bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-900">District</Label>
                  <Popover open={openModalDistrictCombobox} onOpenChange={setOpenModalDistrictCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openModalDistrictCombobox}
                        className="w-full justify-between bg-white text-slate-900 border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {modalDistrict || "Select District..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0 bg-white">
                      <Command className="bg-white">
                        <CommandInput placeholder="Search district..." className="text-slate-900" />
                        <CommandList>
                          <CommandEmpty className="text-slate-500">No district found.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {BANGLADESH_DISTRICTS.map((district) => (
                              <CommandItem
                                key={district}
                                value={district}
                                onSelect={(currentValue) => {
                                  setModalDistrict(currentValue === modalDistrict ? "" : currentValue)
                                  setOpenModalDistrictCombobox(false)
                                }}
                                className="text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    modalDistrict === district ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {district}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase text-slate-600 border-b pb-2">2. Case Details</h3>
              <div className="space-y-2">
                <Label className="text-slate-900">
                  Case Category <span className="text-red-600">*</span>
                </Label>
                <Select
                  value={caseCategory}
                  onValueChange={(value) => {
                    setCaseCategory(value)
                    setSpecificArea("") // Reset specific area when category changes
                  }}
                >
                  <SelectTrigger className="bg-white text-slate-900 border-slate-300 hover:bg-slate-50 hover:text-slate-900">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-900">
                    <SelectItem value="civil" className="hover:bg-slate-100 hover:text-slate-900">
                      Civil
                    </SelectItem>
                    <SelectItem value="criminal" className="hover:bg-slate-100 hover:text-slate-900">
                      Criminal
                    </SelectItem>
                    <SelectItem value="family" className="hover:bg-slate-100 hover:text-slate-900">
                      Family
                    </SelectItem>
                    <SelectItem value="property" className="hover:bg-slate-100 hover:text-slate-900">
                      Property
                    </SelectItem>
                    <SelectItem value="corporate" className="hover:bg-slate-100 hover:text-slate-900">
                      Corporate
                    </SelectItem>
                    <SelectItem value="writ" className="hover:bg-slate-100 hover:text-slate-900">
                      Writ/High Court
                    </SelectItem>
                    <SelectItem value="other" className="hover:bg-slate-100 hover:text-slate-900">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {caseCategory && (
                <div className="space-y-2">
                  <Label className="text-slate-900">Specific Area (Optional)</Label>
                  {caseCategory === "other" ? (
                    <Input
                      placeholder="Specify your case type"
                      value={specificArea}
                      onChange={(e) => setSpecificArea(e.target.value)}
                      className="bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                    />
                  ) : (
                    <Select value={specificArea} onValueChange={setSpecificArea}>
                      <SelectTrigger className="bg-white text-slate-900 border-slate-300 hover:bg-slate-50 hover:text-slate-900">
                        <SelectValue placeholder="Select specific area" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-900">
                        {getSpecificAreaOptions().map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="hover:bg-slate-100 hover:text-slate-900"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Leave blank if unsure.</p>
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-slate-900">Brief Description</Label>
                <Textarea
                  placeholder="Describe your legal issue briefly..."
                  className="h-24 bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase text-slate-600 border-b pb-2">3. Preferred Schedule</h3>
              <div className="space-y-2">
                <Label className="text-slate-900">
                  Requested Date <span className="text-red-600">*</span>
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input className="pl-8 bg-white text-slate-900 border-slate-300" type="date" required />
                </div>
              </div>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900"
                >
                  Agree to Terms & Conditions
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="data" />
                <label
                  htmlFor="data"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900"
                >
                  Agree to share data with lawyer
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="email" defaultChecked />
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900"
                >
                  Agree to receive email notifications
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-slate-900 border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handlePlaceRequest}>
              Place Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
      <AiGuide />
    </div>
  )
}
