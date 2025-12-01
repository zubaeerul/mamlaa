"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  Gavel,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  FileText,
  UserPlus,
  MoreHorizontal,
  Calendar,
  List,
} from "lucide-react"

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [calendarView, setCalendarView] = useState<"list" | "month">("list")

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const eventDays = [today, tomorrow]

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">{currentDate}</p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button className="bg-[#0f172a] text-white hover:bg-[#0f172a]/90 shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Add New Case
          </Button>
          <Button variant="outline" className="bg-white shadow-sm border-slate-200 text-slate-700">
            <FileText className="mr-2 h-4 w-4" /> Create Invoice
          </Button>
          <Button variant="outline" className="bg-white shadow-sm border-slate-200 text-slate-700">
            <UserPlus className="mr-2 h-4 w-4" /> Add Client
          </Button>
        </div>
      </div>

      {/* Quick Conflict Check */}
      <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <div className="p-1 bg-blue-50/50 border-b border-blue-100 px-4 py-2 flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Conflict Checker</span>
        </div>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Check conflict by matching with existing clients"
              className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 text-slate-900"
            />
          </div>
          <Button variant="secondary" className="shrink-0">
            Check Conflict
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Active Cases */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-xl transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                <TrendingUp className="h-3 w-3" /> +2 this week
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-slate-500">Active Cases</h3>
              <div className="text-3xl font-bold text-slate-900">24</div>
            </div>
          </CardContent>
        </Card>

        {/* Hearings This Week */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-xl transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Gavel className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-slate-500">Hearings This Week</h3>
              <div className="text-3xl font-bold text-slate-900">8</div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-xl transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <CheckSquare className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-slate-500">Pending Tasks</h3>
              <div className="text-3xl font-bold text-slate-900">12</div>
              <p className="text-xs text-slate-500 font-medium pt-1">
                <span className="text-orange-600">3 High Priority</span> • 5 Medium
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total Receivables */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-xl transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-slate-500">Total Receivables</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-lg text-slate-400 font-medium">৳</span>
                <span className="text-3xl font-bold text-slate-900">45,000</span>
              </div>
              <p className="text-xs text-slate-500">BDT</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity Table (Span 2 columns) */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">Recent Activity</CardTitle>
              <CardDescription>Latest updates on your cases and tasks</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4 text-slate-500" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 hover:bg-slate-50/50">
                  <TableHead className="w-[400px]">Activity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    case: "Land Dispute #CL-882",
                    action: "Hearing Scheduled",
                    date: "Today, 10:00 AM",
                    status: "Upcoming",
                    statusColor: "bg-blue-100 text-blue-700",
                    user: { name: "Rahim Uddin", image: "/images/3d-avatar-male-1.jpg", initials: "RU" },
                  },
                  {
                    case: "Corporate Filing #DL-993",
                    action: "Document Uploaded",
                    date: "Yesterday, 4:30 PM",
                    status: "Review",
                    statusColor: "bg-amber-100 text-amber-700",
                    user: { name: "XYZ Tech", image: "/images/3d-avatar-female-1.jpg", initials: "XY" },
                  },
                  {
                    case: "Divorce Settlement #FL-202",
                    action: "Payment Received",
                    date: "Nov 20, 2025",
                    status: "Paid",
                    statusColor: "bg-green-100 text-green-700",
                    user: { name: "Sarah Khan", image: "/images/3d-avatar-female-2.jpg", initials: "SK" },
                  },
                  {
                    case: "Property Deed #PD-101",
                    action: "Draft Approved",
                    date: "Nov 19, 2025",
                    status: "Order Passed",
                    statusColor: "bg-purple-100 text-purple-700",
                    user: { name: "Karim Ahmed", image: "/images/3d-avatar-male-2.jpg", initials: "KA" },
                  },
                ].map((activity, index) => (
                  <TableRow key={index} className="border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={activity.user.image || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {activity.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-slate-900 font-medium">{activity.action}</div>
                          <div className="text-xs text-slate-500">{activity.case}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("border-0", activity.statusColor)}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-slate-500">{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mini Calendar / Upcoming Hearings */}
        <div className="space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm rounded-xl h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" /> Upcoming Hearings
              </CardTitle>
              <Tabs value={calendarView} onValueChange={(v) => setCalendarView(v as "list" | "month")} className="h-8">
                <TabsList className="h-8 bg-slate-100 p-0.5">
                  <TabsTrigger
                    value="list"
                    className="h-7 px-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-slate-500 data-[state=active]:text-slate-900"
                  >
                    <List className="h-3.5 w-3.5" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    className="h-7 px-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-slate-500 data-[state=active]:text-slate-900"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-4">
              {calendarView === "list" ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Today */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Today</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <div className="h-2 w-2 mt-2 rounded-full bg-blue-600 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">C.R. 102/23</p>
                          <p className="text-xs text-slate-600">State vs. Rahim</p>
                          <div className="mt-1 flex items-center gap-1 text-xs text-blue-700 font-medium">
                            <Gavel className="h-3 w-3" /> Room 304, 11:00 AM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tomorrow */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tomorrow</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="h-2 w-2 mt-2 rounded-full bg-purple-500 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Civil Suit 45/24</p>
                          <p className="text-xs text-slate-600">Land Dispute Hearing</p>
                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Gavel className="h-3 w-3" /> Room 102, 2:30 PM
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="h-2 w-2 mt-2 rounded-full bg-orange-500 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Writ Petition 88/22</p>
                          <p className="text-xs text-slate-600">Final Argument</p>
                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Gavel className="h-3 w-3" /> High Court, 10:00 AM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center animate-in fade-in zoom-in-95 duration-300 text-slate-900">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-sm p-3"
                    modifiers={{
                      hasEvent: eventDays,
                    }}
                    modifiersStyles={{
                      hasEvent: {
                        fontWeight: "bold",
                        textDecoration: "underline",
                        textDecorationColor: "#2563eb", // blue-600
                        textDecorationThickness: "2px",
                      },
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
