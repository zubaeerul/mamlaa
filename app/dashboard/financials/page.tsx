"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ArrowUp, ArrowDown, TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const revenueData = [
  { month: "Jan", revenue: 35000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 51000 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 55000 },
]

const collectionData = [
  { month: "Jan", collected: 25000, outstanding: 10000 },
  { month: "Feb", collected: 30000, outstanding: 12000 },
  { month: "Mar", collected: 28000, outstanding: 10000 },
  { month: "Apr", collected: 40000, outstanding: 11000 },
  { month: "May", collected: 35000, outstanding: 13000 },
  { month: "Jun", collected: 45000, outstanding: 10000 },
]

const practiceAreaData = [
  { name: "Criminal", value: 40, fill: "#ef4444" }, // Red
  { name: "Property", value: 30, fill: "#3b82f6" }, // Blue
  { name: "Family", value: 15, fill: "#a855f7" }, // Purple
  { name: "Civil", value: 15, fill: "#22c55e" }, // Green
]

export default function FinancialsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Financial Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Cash in Hand</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">৳4,50,000</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Outstanding Dues</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">৳1,20,000</div>
            <p className="text-xs text-red-600 mt-1">Action required</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600">Net Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">68%</div>
            <p className="text-xs text-slate-500 mt-1">+2% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Revenue Chart */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Monthly Revenue (BDT)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "#64748b", // Solid Grey
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="#64748b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Secondary Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Payment Collection Status */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Payment Collection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collectionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    itemStyle={{ color: "#1e293b" }}
                  />
                  <Legend />
                  <Bar dataKey="collected" name="Collected" stackId="a" fill="#1e3a8a" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="outstanding" name="Outstanding" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Practice Area */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Revenue by Practice Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={practiceAreaData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {practiceAreaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="white" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    itemStyle={{ color: "#1e293b" }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value, entry: any) => (
                      <span className="text-slate-700 ml-2">
                        {value} ({entry.payload.value}%)
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-slate-600">Invoice ID</TableHead>
                <TableHead className="text-slate-600">Client</TableHead>
                <TableHead className="text-slate-600">Service</TableHead>
                <TableHead className="text-slate-600">Amount</TableHead>
                <TableHead className="text-slate-600">Status</TableHead>
                <TableHead className="text-right text-slate-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-900">#INV-2024-001</TableCell>
                <TableCell className="text-slate-600">Jamuna Trading Ltd</TableCell>
                <TableCell className="text-slate-600">Legal Retainer Fee</TableCell>
                <TableCell className="text-slate-600">৳20,000 BDT</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Paid</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download PDF</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-900">#INV-2024-002</TableCell>
                <TableCell className="text-slate-600">Mr. Rahim Uddin</TableCell>
                <TableCell className="text-slate-600">Court Representation</TableCell>
                <TableCell className="text-slate-600">৳15,000 BDT</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Paid</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download PDF</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-900">#INV-2024-003</TableCell>
                <TableCell className="text-slate-600">Fatema Begum</TableCell>
                <TableCell className="text-slate-600">Document Drafting</TableCell>
                <TableCell className="text-slate-600">৳8,000 BDT</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
                    Overdue
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download PDF</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-900">#INV-2024-004</TableCell>
                <TableCell className="text-slate-600">Abul Kalam</TableCell>
                <TableCell className="text-slate-600">Legal Consultation</TableCell>
                <TableCell className="text-slate-600">৳5,000 BDT</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Paid</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download PDF</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
