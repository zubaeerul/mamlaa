import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function CaseDiaryPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Case Diary & Court Dates</h1>
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
