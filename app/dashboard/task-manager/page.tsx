"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, CalendarIcon, Paperclip, MoreHorizontal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const tasks = [
  {
    id: "1",
    title: "Draft Written Statement",
    caseNo: "Case 33/21",
    assignee: { name: "Assoc. Rahim", initials: "AR", color: "bg-blue-100 text-blue-700" },
    priority: "High",
    status: "To Do",
    dueDate: "2023-11-25",
    hasAttachment: false,
  },
  {
    id: "2",
    title: "File Bail Petition",
    caseNo: "Case 12/24",
    assignee: { name: "Assoc. Sarah Khan", initials: "SK", color: "bg-purple-100 text-purple-700" },
    priority: "Medium",
    status: "In Progress",
    dueDate: "2023-11-28",
    hasAttachment: true,
  },
  {
    id: "3",
    title: "Witness Deposition Prep",
    caseNo: "Case 09/23",
    assignee: { name: "Assoc. M. Karim", initials: "MK", color: "bg-green-100 text-green-700" },
    priority: "High",
    status: "In Progress",
    dueDate: "2023-11-24",
    hasAttachment: false,
  },
  {
    id: "4",
    title: "Submit Evidence List",
    caseNo: "Case 55/22",
    assignee: { name: "Assoc. Rahim", initials: "AR", color: "bg-blue-100 text-blue-700" },
    priority: "Medium",
    status: "Review",
    dueDate: "2023-12-01",
    hasAttachment: true,
  },
  {
    id: "5",
    title: "Final Argument Notes",
    caseNo: "Case 88/20",
    assignee: { name: "Assoc. Sarah Khan", initials: "SK", color: "bg-purple-100 text-purple-700" },
    priority: "High",
    status: "Review",
    dueDate: "2023-11-30",
    hasAttachment: true,
  },
]

export default function TaskManagerPage() {
  const [date, setDate] = useState<Date>()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200 hover:bg-red-100"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
      case "Low":
        return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-slate-100 text-slate-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Review":
        return "bg-purple-100 text-purple-700"
      case "Done":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="space-y-6 p-6 bg-slate-50/50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Task Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#1e293b] hover:bg-[#0f172a] text-white">
              <Plus className="mr-2 h-4 w-4" /> Create New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Assign New Task</DialogTitle>
              <DialogDescription>Create a new task and assign it to an associate.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task-name" className="text-right">
                  Task Name
                </Label>
                <Input id="task-name" placeholder="e.g. Draft Bail Petition" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="case" className="text-right">
                  Select Case
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a case..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-slate-900">
                      <SelectItem value="case1">Case 102/23 - Rahim vs State</SelectItem>
                      <SelectItem value="case2">Case 33/21 - Land Dispute</SelectItem>
                      <SelectItem value="case3">Case 09/23 - Corporate Litigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Due Date</Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white text-slate-900">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-slate-900">
                      <SelectItem value="high">
                        <span className="flex items-center text-red-600">High</span>
                      </SelectItem>
                      <SelectItem value="medium">
                        <span className="flex items-center text-yellow-600">Medium</span>
                      </SelectItem>
                      <SelectItem value="low">
                        <span className="flex items-center text-blue-600">Low</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assign-to" className="text-right">
                  Assign To
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select associate" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-slate-900">
                      <SelectItem value="karim">
                        <div className="flex items-center justify-between w-full">
                          <span>Adv. Karim</span>
                          <Badge
                            variant="outline"
                            className="ml-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px]"
                          >
                            Expert in Drafting
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="rina">
                        <div className="flex items-center justify-between w-full">
                          <span>Assoc. Rina</span>
                          <Badge
                            variant="outline"
                            className="ml-2 bg-purple-50 text-purple-700 border-purple-200 text-[10px]"
                          >
                            Researcher
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="hasan">
                        <div className="flex items-center justify-between w-full">
                          <span>Junior Hasan</span>
                          <Badge
                            variant="outline"
                            className="ml-2 bg-green-50 text-green-700 border-green-200 text-[10px]"
                          >
                            Filing Clerk
                          </Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[#1e293b] hover:bg-[#0f172a] text-white">
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-slate-500 mt-1">Tasks waiting for action</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">4</div>
            <p className="text-xs text-slate-500 mt-1">Urgent deadlines</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completion Rate</CardTitle>
            <div
              className="h-4 w-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <p className="text-xs text-slate-500 mt-1">Tasks completed on time</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Task Name</TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {task.hasAttachment && <Paperclip className="h-3 w-3 text-slate-400" />}
                      {task.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500">{task.caseNo}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("font-normal", getStatusColor(task.status))}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-normal", getPriorityColor(task.priority))}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">{task.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className={cn("text-[10px]", task.assignee.color)}>
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-slate-600">{task.assignee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
