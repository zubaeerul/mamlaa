"use client"

import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">mamlaa.com</span>
            </div>
            <p className="text-gray-600 text-sm">Digitizing legal space of Bangladesh.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/find-lawyer" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Find a Lawyer
                </a>
              </li>
              <li>
                <a href="/document-generator" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Generate Document
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  mamlaa SaaS
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>support@mamlaa.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Mamlaa.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
