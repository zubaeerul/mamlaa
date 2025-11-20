"use client"

import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LawyerFilterBar() {
  return (
    <div className="sticky top-16 z-30 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>

            <Select defaultValue="supreme">
              <SelectTrigger className="w-[180px] h-9 bg-slate-900 text-white border-slate-700 focus:ring-blue-500">
                <SelectValue placeholder="Court Type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-900 text-slate-900">
                <SelectItem value="supreme">Supreme Court</SelectItem>
                <SelectItem value="district">District Judge Court</SelectItem>
                <SelectItem value="magistrate">Magistrate Court</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="dhaka">
              <SelectTrigger className="w-[160px] h-9 bg-slate-900 text-white border-slate-700 focus:ring-blue-500">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-900 text-slate-900">
                <SelectItem value="dhaka">Dhaka</SelectItem>
                <SelectItem value="chittagong">Chittagong</SelectItem>
                <SelectItem value="sylhet">Sylhet</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px] h-9 bg-slate-900 text-white border-slate-700 focus:ring-blue-500">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-900 text-slate-900">
                <SelectItem value="criminal">Criminal Law</SelectItem>
                <SelectItem value="property">Property Law</SelectItem>
                <SelectItem value="family">Family Law</SelectItem>
                <SelectItem value="civil">Civil Law</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or sanad no..."
                className="pl-9 h-9 bg-slate-900 text-white border-slate-700 placeholder:text-slate-400 focus-visible:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="urgent-mode" />
              <Label
                htmlFor="urgent-mode"
                className="text-sm font-medium text-red-600 flex items-center gap-1 cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Urgent
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
