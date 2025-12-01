'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const districts = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh',
  'Comilla', 'Gazipur', 'Narayanganj', 'Tangail', 'Jamalpur', 'Sherpur', 'Netrokona',
  'Kishoreganj', 'Narsingdi', 'Manikganj', 'Munshiganj', 'Faridpur', 'Gopalganj', 'Madaripur',
  'Rajbari', 'Shariatpur', 'Cox\'s Bazar', 'Feni', 'Brahmanbaria', 'Rangamati', 'Bandarban',
  'Khagrachhari', 'Chandpur', 'Lakshmipur', 'Noakhali', 'Bogra', 'Joypurhat', 'Naogaon',
  'Natore', 'Chapainawabganj', 'Pabna', 'Sirajganj', 'Bagerhat', 'Chuadanga', 'Jessore',
  'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira', 'Barguna', 'Bhola',
  'Jhalokati', 'Patuakhali', 'Pirojpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat',
  'Nilphamari', 'Panchagarh', 'Thakurgaon', 'Habiganj', 'Moulvibazar', 'Sunamganj'
]

export function SearchFeature() {
  const [courtType, setCourtType] = useState('')
  const [district, setDistrict] = useState('')
  const [areaOfLaw, setAreaOfLaw] = useState('')
  const [sanadNo, setSanadNo] = useState('')

  const handleSearch = () => {
    console.log('[v0] Search params:', { courtType, district, areaOfLaw, sanadNo })
  }

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Search Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Find Your Legal Expert
            </h2>
            <p className="text-muted-foreground text-lg">
              Search by court type, location, or verify a lawyer's credentials
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 lg:p-8">
            <div className="space-y-4">
              {/* First Row - 3 Dropdowns */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Court Type Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Court Type
                  </label>
                  <Select value={courtType} onValueChange={setCourtType}>
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-800 focus:ring-blue-500">
                      <SelectValue placeholder="Choose court..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supreme">Supreme Court</SelectItem>
                      <SelectItem value="district">District Court</SelectItem>
                      <SelectItem value="magistrate">Magistrate Court</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* District Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select District
                  </label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-800 focus:ring-blue-500">
                      <SelectValue placeholder="Choose district..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {districts.map((dist) => (
                        <SelectItem key={dist} value={dist.toLowerCase()}>
                          {dist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Area of Law Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Area of Law
                  </label>
                  <Select value={areaOfLaw} onValueChange={setAreaOfLaw}>
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-800 focus:ring-blue-500">
                      <SelectValue placeholder="Choose area..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="criminal">Criminal Law</SelectItem>
                      <SelectItem value="civil">Civil Law</SelectItem>
                      <SelectItem value="property">Property Law</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row - Sanad Number Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Enter Lawyer Sanad No. (For Verification)
                </label>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="e.g., 12345/2020"
                    value={sanadNo}
                    onChange={(e) => setSanadNo(e.target.value)}
                    className="flex-1 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus-visible:ring-blue-500"
                  />
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              All lawyers are verified with Bangladesh Bar Council
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
