"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { UserPlus, Loader2 } from "lucide-react"

import { patientSchema, type PatientFormData } from "@/schemas/patient"
import { registerPatient } from "@/services/patient"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PatientForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  })

  const onSubmit = async (data: PatientFormData) => {
    try {
      await registerPatient(data)
      toast.success("Patient registered successfully", {
        description: `${data.name} has been registered.`,
      })
      reset()
      router.push("/patients")
    } catch (error: any) {
      console.error(error)
      const message = error?.response?.data?.detail || error?.message || "Failed to register patient"
      toast.error("Registration failed", {
        description: message,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg"
    >
      <Card className="border-border/50 shadow-xl shadow-emerald-500/5">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Patient Registration</CardTitle>
          <CardDescription>
            Register a new patient for AI-assisted medical consultation
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter patient's full name"
                className="h-10 rounded-xl border-border/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                className="h-10 rounded-xl border-border/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all"
                {...register("age")}
              />
              {errors.age && (
                <p className="text-xs text-red-500 mt-1">{errors.age.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium">
                Gender
              </Label>
              <Select
                onValueChange={(value: unknown) => setValue("gender", value as string)}
              >
                <SelectTrigger className="h-10 rounded-xl border-border/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="phone"
                placeholder="9876543210"
                className="h-10 rounded-xl border-border/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Village */}
            <div className="space-y-2">
              <Label htmlFor="village" className="text-sm font-medium">
                Village <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="village"
                placeholder="Enter village name"
                className="h-10 rounded-xl border-border/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all"
                {...register("village")}
              />
              {errors.village && (
                <p className="text-xs text-red-500 mt-1">{errors.village.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register Patient
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
