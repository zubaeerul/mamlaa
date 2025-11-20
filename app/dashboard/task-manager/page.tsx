import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Filter } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TaskManagerPage() {
  return (
    <div className="space-y-6 p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Task Management</h1>
      </div>

      {/* Top Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-slate-500 mt-1">Tasks waiting for action</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">4</div>
            <p className="text-xs text-slate-500 mt-1">Urgent deadlines</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completion Rate</CardTitle>
            {/* Simple circular progress representation */}
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

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Filter by:</span>
        </div>
        <div className="flex flex-1 gap-4 w-full md:w-auto overflow-x-auto">
          <Select>
            <SelectTrigger className="w-[180px] bg-slate-900 text-white border-slate-900 hover:bg-slate-800 focus:ring-slate-900">
              <SelectValue placeholder="Associate" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-900 text-slate-900">
              <SelectItem value="rahim" className="focus:bg-slate-100 focus:text-slate-900">
                Assoc. Rahim
              </SelectItem>
              <SelectItem value="karim" className="focus:bg-slate-100 focus:text-slate-900">
                Assoc. Karim
              </SelectItem>
              <SelectItem value="sara" className="focus:bg-slate-100 focus:text-slate-900">
                Assoc. Sara
              </SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] bg-slate-900 text-white border-slate-900 hover:bg-slate-800 focus:ring-slate-900">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-900 text-slate-900">
              <SelectItem value="progress" className="focus:bg-slate-100 focus:text-slate-900">
                In Progress
              </SelectItem>
              <SelectItem value="review" className="focus:bg-slate-100 focus:text-slate-900">
                Client Review
              </SelectItem>
              <SelectItem value="done" className="focus:bg-slate-100 focus:text-slate-900">
                Done
              </SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] bg-slate-900 text-white border-slate-900 hover:bg-slate-800 focus:ring-slate-900">
              <SelectValue placeholder="Case" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-900 text-slate-900">
              <SelectItem value="case1" className="focus:bg-slate-100 focus:text-slate-900">
                Case 33/21
              </SelectItem>
              <SelectItem value="case2" className="focus:bg-slate-100 focus:text-slate-900">
                Case 45/22
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Task Grid */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-slate-700 font-semibold">Task Details</TableHead>
              <TableHead className="text-slate-700 font-semibold">Assignee</TableHead>
              <TableHead className="text-slate-700 font-semibold">Priority</TableHead>
              <TableHead className="text-slate-700 font-semibold">Deadline</TableHead>
              <TableHead className="text-slate-700 font-semibold w-[200px]">Progress Status</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Row 1 */}
            <TableRow className="hover:bg-slate-50">
              <TableCell>
                <div className="font-bold text-slate-900">Draft Written Statement</div>
                <div className="text-xs text-slate-500 mt-0.5">Ref: Case 33/21</div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-blue-100 text-blue-700">AR</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assoc. Rahim</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">High</Badge>
              </TableCell>
              <TableCell className="text-red-600 font-medium">Nov 24, 2025</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    In Progress
                  </Badge>
                  <Progress value={60} className="h-1.5 bg-blue-100" indicatorClassName="bg-blue-600" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>

            {/* Row 2 */}
            <TableRow className="hover:bg-slate-50">
              <TableCell>
                <div className="font-bold text-slate-900">File Bail Petition</div>
                <div className="text-xs text-slate-500 mt-0.5">Ref: Case 12/24</div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-purple-100 text-purple-700">SK</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assoc. Sarah Khan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">Medium</Badge>
              </TableCell>
              <TableCell className="text-slate-600">Nov 28, 2025</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                    Client Review
                  </Badge>
                  <Progress value={80} className="h-1.5 bg-purple-100" indicatorClassName="bg-purple-600" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>

            {/* Row 3 */}
            <TableRow className="hover:bg-slate-50">
              <TableCell>
                <div className="font-bold text-slate-900">Witness Deposition Prep</div>
                <div className="text-xs text-slate-500 mt-0.5">Ref: Case 09/23</div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-green-100 text-green-700">MK</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assoc. M. Karim</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">High</Badge>
              </TableCell>
              <TableCell className="text-slate-600">Nov 30, 2025</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                    Researching
                  </Badge>
                  <Progress value={30} className="h-1.5 bg-orange-100" indicatorClassName="bg-orange-500" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>

            {/* Row 4 */}
            <TableRow className="hover:bg-slate-50">
              <TableCell>
                <div className="font-bold text-slate-900">Submit Evidence List</div>
                <div className="text-xs text-slate-500 mt-0.5">Ref: Case 55/22</div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-blue-100 text-blue-700">AR</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assoc. Rahim</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">Medium</Badge>
              </TableCell>
              <TableCell className="text-slate-600">Dec 05, 2025</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    Drafting
                  </Badge>
                  <Progress value={45} className="h-1.5 bg-blue-100" indicatorClassName="bg-blue-600" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>

            {/* Row 5 */}
            <TableRow className="hover:bg-slate-50">
              <TableCell>
                <div className="font-bold text-slate-900">Final Argument Notes</div>
                <div className="text-xs text-slate-500 mt-0.5">Ref: Case 88/20</div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-purple-100 text-purple-700">SK</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assoc. Sarah Khan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">High</Badge>
              </TableCell>
              <TableCell className="text-slate-600">Dec 10, 2025</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    Ready for Review
                  </Badge>
                  <Progress value={95} className="h-1.5 bg-green-100" indicatorClassName="bg-green-600" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
