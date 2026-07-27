"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Phone, MapPin, Activity, ArrowRight, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { startConsultation } from "@/services/chat"
import { useState } from "react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone?: string
  village?: string
}

interface PatientCardProps {
  patient: Patient
}

export default function PatientCard({ patient }: PatientCardProps) {
  const router = useRouter()
  const [isStarting, setIsStarting] = useState(false)

  const handleStartConsultation = async () => {
    try {
      setIsStarting(true)
      const response = await startConsultation(patient.id)
      router.push(`/chat/${response.consultation_id}`)
    } catch (error) {
      console.error(error)
      alert("Failed to start consultation.")
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="group h-full border-border/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                {patient.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-base leading-tight">{patient.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Patient ID: {patient.id.slice(0, 8)}...
                </p>
              </div>
            </div>
            <Badge variant="outline" className="capitalize text-xs">
              {patient.gender}
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>{patient.age} years old</span>
            </div>
            {patient.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>{patient.phone}</span>
              </div>
            )}
            {patient.village && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>{patient.village}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>No active consultation</span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all duration-300"
            onClick={handleStartConsultation}
            disabled={isStarting}
          >
            {isStarting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                Start Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
