"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, MapPin, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Video,
    title: "Video Consultation",
    description:
      "Connect with verified lawyers instantly through secure video calls. Get legal advice from the comfort of your home.",
    features: ["Instant booking", "Secure & private", "Recorded sessions"],
    color: "bg-blue-500",
    href: "/book-lawyer",
  },
  {
    icon: MapPin,
    title: "Chamber Appointment",
    description:
      "Book in-person appointments at lawyer chambers across Bangladesh. Choose your preferred time and location.",
    features: ["64 districts", "Flexible scheduling", "Confirmed bookings"],
    color: "bg-green-500",
    href: "/book-lawyer",
  },
  {
    icon: FileText,
    title: "Legal Document Automation",
    description:
      "Generate court-ready legal documents in minutes. Rent agreements, affidavits, power of attorney, and more.",
    features: ["Bilingual documents", "Court-compliant", "Instant download"],
    color: "bg-purple-500",
    href: "/document-generator",
  },
]

export function ServicesGrid() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access legal services digitally with complete transparency and verified professionals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="bg-white border-gray-200 shadow-sm rounded-lg hover:border-primary transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="text-base text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full group bg-slate-900 text-white hover:bg-slate-800 border-none">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
