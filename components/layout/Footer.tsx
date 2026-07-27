"use client"

import Link from "next/link"
import { Stethoscope, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                Telemed<span className="text-emerald-500">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-powered telemedicine platform providing accessible healthcare
              consultations through intelligent medical intake assistance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Patient Registration
                </Link>
              </li>
              <li>
                <Link href="/patients" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View Patients
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Medical Disclaimer</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TelemedAI. All rights reserved. Not a substitute for professional medical advice.
          </p>
          <div className="flex items-center gap-4">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-xs text-muted-foreground">Made with care for better healthcare</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
