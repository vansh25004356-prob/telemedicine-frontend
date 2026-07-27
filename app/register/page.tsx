"use client"

import { motion } from "framer-motion"
import { UserPlus, Stethoscope, ArrowRight } from "lucide-react"
import Link from "next/link"
import PatientForm from "@/components/forms/PatientForm"

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-background to-blue-50/50 dark:from-emerald-950/20 dark:via-background dark:to-blue-950/20" />
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/4 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/4 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-start gap-12"
        >
          {/* Left - Info */}
          <div className="flex-1 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Patient Registration</h1>
                  <p className="text-sm text-muted-foreground">Register a new patient for consultation</p>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                {[
                  "Quick registration process",
                  "Secure data collection",
                  "Ready for AI consultation",
                  "Medical history tracking",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 shrink-0">
                      <ArrowRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50">
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  <strong>Medical Disclaimer:</strong> This platform is for medical intake purposes only.
                  It does not provide medical diagnosis or treatment recommendations.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/patients"
                  className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  View registered patients →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-[480px]"
          >
            <PatientForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
