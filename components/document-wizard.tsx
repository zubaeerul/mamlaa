"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronRight, FileText, Lock } from "lucide-react"

interface DocumentWizardProps {
  documentName?: string
}

export function DocumentWizard({ documentName = "House Rent Agreement (Bari Bhara Chukti)" }: DocumentWizardProps) {
  const [formData, setFormData] = useState({
    landlordName: "Rahim Uddin",
    landlordNid: "1982345678901",
    propertyAddress: "House 12, Road 5, Sector 4, Uttara, Dhaka",
    monthlyRent: "",
    advanceAmount: "",
    startDate: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getPreviewContent = () => {
    if (documentName.includes("Rent") || documentName.includes("Lease")) {
      return (
        <>
          <p>
            WHEREAS the Landlord is the lawful owner and possessor of the residential flat at{" "}
            <strong>{formData.propertyAddress}</strong>.
          </p>
          <p>
            AND WHEREAS the Tenant has agreed to take the said flat on rent at a monthly rental of{" "}
            <strong>BDT {formData.monthlyRent || "_______"}</strong> only.
          </p>
          <p>
            AND WHEREAS the Tenant has paid an advance amount of{" "}
            <strong>BDT {formData.advanceAmount || "_______"}</strong> to the Landlord.
          </p>
          <p>
            The tenancy shall commence from <strong>{formData.startDate || "_______"}</strong>.
          </p>
          <div className="blur-sm select-none">
            <p className="mt-4">
              1. The Tenant shall pay the monthly rent within the 7th day of every English calendar month.
            </p>
            <p>2. The Tenant shall not sublet the premises to anyone else.</p>
            <p>3. The Tenant shall pay the electricity and gas bills separately.</p>
            <p>4. This agreement is valid for a period of 11 months.</p>
          </div>
        </>
      )
    } else if (documentName.includes("Sale Deed")) {
      return (
        <>
          <p>
            WHEREAS the Vendor is the absolute owner of the property situated at{" "}
            <strong>{formData.propertyAddress}</strong>.
          </p>
          <p>
            AND WHEREAS the Vendor has agreed to sell the said property to the Purchaser for a total consideration of{" "}
            <strong>BDT {formData.advanceAmount || "_______"}</strong>.
          </p>
          <div className="blur-sm select-none">
            <p className="mt-4">
              1. The Vendor hereby transfers all rights, title, and interest in the property to the Purchaser.
            </p>
            <p>2. The Vendor assures that the property is free from all encumbrances.</p>
          </div>
        </>
      )
    } else if (documentName.includes("Power of Attorney")) {
      return (
        <>
          <p>
            I, <strong>{formData.landlordName}</strong>, do hereby appoint and constitute [Attorney Name] as my true and
            lawful Attorney.
          </p>
          <p>
            To do and execute all or any of the following acts, deeds, and things on my behalf regarding the property at{" "}
            <strong>{formData.propertyAddress}</strong>.
          </p>
          <div className="blur-sm select-none">
            <p className="mt-4">1. To manage, control, and supervise the said property.</p>
            <p>2. To sign and execute all necessary documents.</p>
          </div>
        </>
      )
    } else {
      return (
        <>
          <p>
            This is a standard template for <strong>{documentName}</strong>.
          </p>
          <p>
            The parties involved, <strong>{formData.landlordName}</strong> and [Other Party], hereby agree to the terms
            outlined herein.
          </p>
          <div className="blur-sm select-none">
            <p className="mt-4">1. Clause regarding the specific terms of this legal document.</p>
            <p>2. Clause regarding the obligations of both parties.</p>
            <p>3. Clause regarding dispute resolution and jurisdiction.</p>
          </div>
        </>
      )
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mb-2">
              1
            </div>
            <span className="text-sm font-medium text-primary">Details</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm mb-2">
              2
            </div>
            <span className="text-sm font-medium text-gray-500">Review</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm mb-2">
              3
            </div>
            <span className="text-sm font-medium text-gray-500">Payment</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm mb-2">
              4
            </div>
            <span className="text-sm font-medium text-gray-500">Download</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Generate {documentName}</h1>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Auto-filled from your profile
              </h3>
              <div className="grid grid-cols-1 gap-4 opacity-75">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Landlord Name</label>
                  <input
                    type="text"
                    name="landlordName"
                    value={formData.landlordName}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NID Number</label>
                  <input
                    type="text"
                    name="landlordNid"
                    value={formData.landlordNid}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                  <input
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Agreement Details</h3>
              <div>
                <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Rent (BDT)
                </label>
                <input
                  type="number"
                  id="monthlyRent"
                  name="monthlyRent"
                  value={formData.monthlyRent}
                  onChange={handleInputChange}
                  placeholder="e.g. 25000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="advanceAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Advance Amount (BDT)
                </label>
                <input
                  type="number"
                  id="advanceAmount"
                  name="advanceAmount"
                  value={formData.advanceAmount}
                  onChange={handleInputChange}
                  placeholder="e.g. 50000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Live Preview
            </h3>
            <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Draft Mode</span>
          </div>

          <div className="flex-grow bg-white shadow-md rounded-lg p-8 relative overflow-hidden mb-6">
            {/* Blur overlay for bottom part */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-white via-white/90 to-transparent z-10 flex items-end justify-center pb-10">
              <div className="flex flex-col items-center text-center p-4">
                <Lock className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm font-medium">Complete payment to view full document</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-800 font-serif leading-relaxed">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black inline-block pb-1">
                  {documentName}
                </h2>
              </div>

              <p>
                This Deed/Agreement is made and entered into at Dhaka on this day of{" "}
                <strong>{new Date().toLocaleDateString()}</strong>.
              </p>

              <p>
                <strong>BETWEEN</strong>
              </p>

              <p>
                <strong>{formData.landlordName}</strong>, NID No: <strong>{formData.landlordNid}</strong>, Address:{" "}
                <strong>{formData.propertyAddress}</strong>, hereinafter referred to as the <strong>FIRST PARTY</strong>{" "}
                (which expression shall unless excluded by or repugnant to the context be deemed to include his/her
                heirs, successors, legal representatives and assigns) of the ONE PART.
              </p>

              <p>
                <strong>AND</strong>
              </p>

              <p>
                [Second Party Name], NID No: [Second Party NID], hereinafter referred to as the{" "}
                <strong>SECOND PARTY</strong> of the OTHER PART.
              </p>

              {getPreviewContent()}
            </div>
          </div>

          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-colors flex items-center justify-center">
            Generate PDF (200 BDT)
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}
