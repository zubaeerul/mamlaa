import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Briefcase, Gavel, CheckSquare, DollarSign } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-gray-200 shadow-sm rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Active Cases</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">24</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Hearings This Week</CardTitle>
            <Gavel className="h-4 w-4 text-blue-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">8</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Pending Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-blue-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Receivables</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">৳45,000 BDT</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-gray-200 shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 hover:bg-gray-50">
                <TableHead className="text-gray-700">Activity</TableHead>
                <TableHead className="text-gray-700">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-gray-200 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">Case 44/23: Order passed</TableCell>
                <TableCell className="text-gray-600">Today, 10:30 AM</TableCell>
              </TableRow>
              <TableRow className="border-gray-200 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">Client Karim: Invoice Paid</TableCell>
                <TableCell className="text-gray-600">Yesterday, 4:15 PM</TableCell>
              </TableRow>
              <TableRow className="border-gray-200 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">New Case Created: Property Dispute</TableCell>
                <TableCell className="text-gray-600">18 Nov 2025, 2:00 PM</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
