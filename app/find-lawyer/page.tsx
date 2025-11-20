"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LawyerGrid, type Lawyer } from "@/components/lawyer-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Demo Data
const LAWYERS_DATA: Lawyer[] = [
  {
    name: "A.M. Amin Uddin",
    barAssociation: "Supreme Court Bar",
    sanadNo: "SC-332",
    enrolment: "1989",
    district: "Dhaka",
    courtType: "Supreme Court",
    status: "Senior Advocate, Ex-Attorney General",
  },
  {
    name: "Zainul Abedin",
    barAssociation: "Supreme Court Bar",
    sanadNo: "SC-254",
    enrolment: "1980s",
    district: "Dhaka",
    courtType: "Supreme Court",
    status: "Senior Advocate (Criminal)",
  },
  {
    name: "A.M. Mahbub Uddin",
    barAssociation: "Supreme Court Bar",
    sanadNo: "SC-2020",
    enrolment: "1990s",
    district: "Dhaka",
    courtType: "Supreme Court",
    status: "Senior Advocate (Writ & Civil)",
  },
  {
    name: "Md. Ruhul Quddus",
    barAssociation: "Supreme Court Bar",
    sanadNo: "SC-115",
    enrolment: "1990s",
    district: "Dhaka",
    courtType: "Supreme Court",
    status: "Advocate (Constitutional Law)",
  },
  {
    name: "Md. Rezaul Karim",
    barAssociation: "Dhaka Bar",
    sanadNo: "862",
    enrolment: "2014",
    district: "Dhaka",
    courtType: "High Court",
    status: "High Court Permitted",
  },
  {
    name: "M. Abul Bashar Akan",
    barAssociation: "Dhaka Bar",
    sanadNo: "960",
    enrolment: "2015",
    district: "Dhaka",
    courtType: "High Court",
    status: "High Court Permitted",
  },
  {
    name: "Md. Mursalin Kataki",
    barAssociation: "Sylhet Bar",
    sanadNo: "792",
    enrolment: "2015",
    district: "Sylhet",
    courtType: "High Court",
    status: "High Court Permitted",
  },
  {
    name: "Gautom Dey",
    barAssociation: "Chittagong Bar",
    sanadNo: "396",
    enrolment: "2015",
    district: "Chattogram",
    courtType: "High Court",
    status: "High Court Permitted",
  },
  {
    name: "Md. Kabir Ahmed",
    barAssociation: "Sylhet Bar",
    sanadNo: "1258",
    enrolment: "2011",
    district: "Sylhet",
    courtType: "High Court",
    status: "High Court Permitted",
  },
  {
    name: "Abdul Malek Khan",
    barAssociation: "Dhaka Bar",
    sanadNo: "2573",
    enrolment: "2016",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Mohammad Abdul Kader",
    barAssociation: "Dhaka Bar",
    sanadNo: "4664",
    enrolment: "2015",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Md. Borhan Ul Haider",
    barAssociation: "Dhaka Bar",
    sanadNo: "7196",
    enrolment: "2016",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Mohammad Safiqul Islam",
    barAssociation: "Dhaka Bar",
    sanadNo: "1328",
    enrolment: "2015",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Md. Nurul Amin",
    barAssociation: "Dhaka Bar",
    sanadNo: "4101",
    enrolment: "2016",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Taslema Akter",
    barAssociation: "Dhaka Bar",
    sanadNo: "7222",
    enrolment: "2018",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Md. Mizanur Rahman",
    barAssociation: "Dhaka Bar",
    sanadNo: "10430",
    enrolment: "2017",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Md. Mohoshin Miah",
    barAssociation: "Dhaka Bar",
    sanadNo: "Annex-213",
    enrolment: "N/A",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate (House Committee Chair)",
  },
  {
    name: "Md. Abdul Matin",
    barAssociation: "Dhaka Bar",
    sanadNo: "55/A",
    enrolment: "N/A",
    district: "Dhaka",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Alhaj Forrukh Ahmed",
    barAssociation: "Chittagong Bar",
    sanadNo: "1964110013",
    enrolment: "1964",
    district: "Chattogram",
    courtType: "District Court",
    status: "Senior Advocate",
  },
  {
    name: "Hriday Ranjan Das",
    barAssociation: "Chittagong Bar",
    sanadNo: "1969120037",
    enrolment: "1969",
    district: "Chattogram",
    courtType: "District Court",
    status: "Senior Advocate",
  },
  {
    name: "Manir Ahmed",
    barAssociation: "Chittagong Bar",
    sanadNo: "1971020047",
    enrolment: "1971",
    district: "Chattogram",
    courtType: "District Court",
    status: "Senior Advocate",
  },
  {
    name: "A.K.M. Mohsan Uddin",
    barAssociation: "Chittagong Bar",
    sanadNo: "1972010050",
    enrolment: "1972",
    district: "Chattogram",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Swapan Kumar Chowdhury",
    barAssociation: "Chittagong Bar",
    sanadNo: "1989040661",
    enrolment: "1989",
    district: "Chattogram",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Ishrat Jahan",
    barAssociation: "Chittagong Bar",
    sanadNo: "5991",
    enrolment: "2015",
    district: "Chattogram",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Ele Sharma",
    barAssociation: "Chittagong Bar",
    sanadNo: "6418",
    enrolment: "2015",
    district: "Chattogram",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Mujibur Rahman Chowdhury",
    barAssociation: "Sylhet Bar",
    sanadNo: "23B",
    enrolment: "1992",
    district: "Sylhet",
    courtType: "District Court",
    status: "Senior Member",
  },
  {
    name: "Muraduzzaman Chowdhury",
    barAssociation: "Sylhet Bar",
    sanadNo: "23A",
    enrolment: "N/A",
    district: "Sylhet",
    courtType: "District Court",
    status: "Member",
  },
  {
    name: "Shamsul Islam Chowdhury",
    barAssociation: "Sylhet Bar",
    sanadNo: "24A",
    enrolment: "N/A",
    district: "Sylhet",
    courtType: "District Court",
    status: "Member",
  },
  {
    name: "Md. Ohid Ali",
    barAssociation: "Sylhet Bar",
    sanadNo: "23",
    enrolment: "N/A",
    district: "Sylhet",
    courtType: "District Court",
    status: "Member",
  },
  {
    name: "Md. Rasel Mia",
    barAssociation: "Narayangonj Bar",
    sanadNo: "5094",
    enrolment: "2014",
    district: "Narayanganj",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Md. Emran Ahamad",
    barAssociation: "Narayangonj Bar",
    sanadNo: "4371",
    enrolment: "2013",
    district: "Narayanganj",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Masbha Uddin",
    barAssociation: "Feni Bar",
    sanadNo: "4058",
    enrolment: "2015",
    district: "Feni",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Md. Ali Akbar",
    barAssociation: "Jhenidah Bar",
    sanadNo: "5773",
    enrolment: "2015",
    district: "Jhenidah",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Kazi Moinul Islam",
    barAssociation: "Rangamati Bar",
    sanadNo: "9042",
    enrolment: "2015",
    district: "Rangamati",
    courtType: "District Court",
    status: "Advocate",
  },
  {
    name: "Md. Shafiqul Islam",
    barAssociation: "Bogura Bar",
    sanadNo: "N/A",
    enrolment: "N/A",
    district: "Bogura",
    courtType: "District Court",
    status: "Advocate",
  },
]

const districts = ["Dhaka", "Chattogram", "Sylhet", "Narayanganj", "Feni", "Jhenidah", "Rangamati", "Bogura"]

export default function FindLawyerPage() {
  const [courtType, setCourtType] = useState("all")
  const [district, setDistrict] = useState("all")
  const [sanadNo, setSanadNo] = useState("")

  const filteredLawyers = useMemo(() => {
    return LAWYERS_DATA.filter((lawyer) => {
      const matchesCourt =
        courtType === "all" ||
        lawyer.courtType.toLowerCase().includes(courtType.toLowerCase()) ||
        (courtType === "supreme" && lawyer.courtType === "Supreme Court") ||
        (courtType === "district" && lawyer.courtType === "District Court") ||
        (courtType === "magistrate" && lawyer.courtType === "Magistrate Court")

      const matchesDistrict = district === "all" || lawyer.district.toLowerCase() === district.toLowerCase()

      const matchesSanad = sanadNo === "" || lawyer.sanadNo.toLowerCase().includes(sanadNo.toLowerCase())

      return matchesCourt && matchesDistrict && matchesSanad
    })
  }, [courtType, district, sanadNo])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-50 dark:bg-slate-950">
        <div className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-slate-50">
              Find a Legal Expert
            </h1>

            {/* Search Filters */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 mb-10">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Court Type</label>
                  <Select value={courtType} onValueChange={setCourtType}>
                    <SelectTrigger className="w-full bg-slate-900 text-white border-slate-700">
                      <SelectValue placeholder="All Courts" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-900 text-slate-900">
                      <SelectItem value="all">All Courts</SelectItem>
                      <SelectItem value="Supreme Court">Supreme Court</SelectItem>
                      <SelectItem value="High Court">High Court</SelectItem>
                      <SelectItem value="District Court">District Court</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select District</label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger className="w-full bg-slate-900 text-white border-slate-700">
                      <SelectValue placeholder="All Districts" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-900 text-slate-900">
                      <SelectItem value="all">All Districts</SelectItem>
                      {districts.map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Search by Sanad No.</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="e.g., SC-332"
                      value={sanadNo}
                      onChange={(e) => setSanadNo(e.target.value)}
                      className="flex-1 bg-slate-900 text-white border-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setCourtType("all")
                    setDistrict("all")
                    setSanadNo("")
                  }}
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Results Grid */}
            <div className="mb-6">
              <p className="text-slate-600 dark:text-slate-400">Showing {filteredLawyers.length} results</p>
            </div>

            <LawyerGrid lawyers={filteredLawyers} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
