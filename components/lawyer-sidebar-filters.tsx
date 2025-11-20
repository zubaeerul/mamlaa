"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function LawyerSidebarFilters() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500 hover:text-gray-900">
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">Consultation Fee</Label>
            <span className="text-xs text-gray-500">৳500 - ৳5000+</span>
          </div>
          <Slider defaultValue={[1500]} max={5000} step={100} className="py-2" />
        </div>

        <Separator className="bg-gray-100" />

        {/* Gender */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Gender</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="male" />
              <label
                htmlFor="male"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
              >
                Male
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="female" />
              <label
                htmlFor="female"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
              >
                Female
              </label>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-100" />

        {/* Availability */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Availability</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="today" />
              <label
                htmlFor="today"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
              >
                Available Today
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="video" defaultChecked />
              <label
                htmlFor="video"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
              >
                Video Consult
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="chamber" />
              <label
                htmlFor="chamber"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
              >
                Chamber Visit
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
