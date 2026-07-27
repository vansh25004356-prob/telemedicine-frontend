"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Users, Search, Plus, RefreshCw, Loader2, AlertCircle,
  Stethoscope, Filter, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SkeletonCard } from "@/components/ui/skeleton"
import PatientCard from "@/components/patients/PatientCard"
import { getPatients } from "@/services/patient"
import { cn } from "@/lib/utils"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone?: string
  village?: string
  created_at?: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [filterGender, setFilterGender] = useState<string | null>(null)

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getPatients()
      setPatients(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error("Error fetching patients:", err)
      setError(
        err?.response?.data?.message ||
          "Failed to load patients. Make sure the backend is running."
      )
      setPatients([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone?.toLowerCase().includes(search.toLowerCase()) ||
      p.village?.toLowerCase().includes(search.toLowerCase())
    const matchesGender =
      !filterGender || p.gender.toLowerCase() === filterGender.toLowerCase()
    return matchesSearch && matchesGender
  })

  const genders = [...new Set(patients.map((p) => p.gender))]

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Patients</h1>
              <p className="text-sm text-muted-foreground">
                {patients.length} registered patient
                {patients.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchPatients}
              disabled={loading}
              className="rounded-lg"
            >
              <RefreshCw
                className={cn("w-4 h-4 mr-1.5", loading && "animate-spin")}
              />
              Refresh
            </Button>
            <Link href="/register">
              <Button
                size="sm"
                className="rounded-lg bg-emerald-500 hover:bg-emerald-600"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                New Patient
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or village..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 rounded-xl"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {genders.map((gender) => (
              <Button
                key={gender}
                variant={filterGender === gender ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setFilterGender(filterGender === gender ? null : gender)
                }
                className="rounded-lg capitalize"
              >
                {gender}
              </Button>
            ))}
            {filterGender && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterGender(null)}
                className="rounded-lg text-muted-foreground"
              >
                <Filter className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Failed to Load Patients</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
              {error}
            </p>
            <Button onClick={fetchPatients} variant="outline" className="rounded-xl">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        ) : filteredPatients.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 mb-4">
              <Stethoscope className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {search ? "No Patients Found" : "No Patients Yet"}
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
              {search
                ? `No patients matching "${search}"`
                : "Register your first patient to get started with AI consultations."}
            </p>
            {!search && (
              <Link href="/register">
                <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Register Patient
                </Button>
              </Link>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PatientCard patient={patient} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
