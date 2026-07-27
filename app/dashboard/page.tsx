"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  Activity,
  Clock,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Stethoscope,
  MessageSquare,
  FileText,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { getPatients } from "@/services/patient"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone?: string
  village?: string
  created_at?: string
}

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getPatients()
      setPatients(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error("Error loading dashboard:", err)
      setError("Failed to load dashboard data")
      setPatients([])
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      trend: "+12%",
    },
    {
      title: "Active Consultations",
      value: 0,
      icon: Activity,
      gradient: "from-blue-500 to-cyan-600",
      trend: "0",
    },
    {
      title: "Completed",
      value: 0,
      icon: FileText,
      gradient: "from-purple-500 to-violet-600",
      trend: "0",
    },
    {
      title: "Avg. Duration",
      value: "—",
      icon: Clock,
      gradient: "from-amber-500 to-orange-600",
      trend: "N/A",
    },
  ]

  const recentPatients = patients.slice(0, 5)

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h3 className="font-semibold text-lg">{error}</h3>
          <Button onClick={loadDashboardData} variant="outline" className="rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Overview of your practice
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadDashboardData}
            className="rounded-lg"
          >
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 hover:border-emerald-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Patients & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Patients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent Patients</CardTitle>
                  <Link href="/patients">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View All
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {recentPatients.length === 0 ? (
                  <div className="flex flex-col items-center py-8">
                    <Stethoscope className="w-8 h-8 text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No patients registered yet
                    </p>
                    <Link href="/register">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 rounded-lg"
                      >
                        Register First Patient
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentPatients.map((patient, index) => (
                      <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            {patient.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {patient.age} yrs · {patient.gender}
                              {patient.village && ` · ${patient.village}`}
                            </p>
                          </div>
                        </div>
                        <Link href={`/chat/${patient.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-600 dark:text-emerald-400"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/register">
                  <Button className="w-full justify-start rounded-xl bg-emerald-500 hover:bg-emerald-600 h-11">
                    <Users className="w-4 h-4 mr-2" />
                    Register Patient
                  </Button>
                </Link>
                <Link href="/patients">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl h-11"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    View All Patients
                  </Button>
                </Link>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Quick Stats
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Patients</span>
                    <span className="font-semibold">{patients.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg Age</span>
                    <span className="font-semibold">
                      {patients.length > 0
                        ? Math.round(
                            patients.reduce((sum, p) => sum + p.age, 0) /
                              patients.length
                          )
                        : "—"}{" "}
                      yrs
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Gender Ratio</span>
                    <span className="font-semibold">
                      {patients.length > 0
                        ? `${Math.round(
                            (patients.filter((p) => p.gender === "male").length /
                              patients.length) *
                              100
                          )}% M`
                        : "—"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
