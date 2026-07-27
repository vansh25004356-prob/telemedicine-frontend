"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Stethoscope,
  Shield,
  Brain,
  MessageSquare,
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intake",
    description: "Intelligent medical assistant that collects patient information systematically.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: MessageSquare,
    title: "Smart Conversation",
    description: "Natural, empathetic dialogue that adapts to each patient's needs.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with end-to-end encryption for patient data.",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    icon: FileText,
    title: "Auto-Generated Summaries",
    description: "Structured medical summaries ready for doctor review.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Users,
    title: "Patient Management",
    description: "Comprehensive dashboard for managing patient records and consultations.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Data-driven insights to improve patient care and operational efficiency.",
    gradient: "from-indigo-500 to-purple-600",
  },
]

const stats = [
  { icon: Clock, value: "24/7", label: "Availability" },
  { icon: Users, value: "500+", label: "Patients Served" },
  { icon: CheckCircle2, value: "98%", label: "Satisfaction Rate" },
  { icon: Brain, value: "AI", label: "Powered Assistant" },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-transparent to-transparent dark:from-emerald-950/20" />
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/4 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/4 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                AI-Powered Healthcare Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl"
            >
              The Future of
              <span className="block mt-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Medical Intake
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              Transform your healthcare practice with AI-powered patient intake.
              Collect medical histories, symptoms, and vital information through
              intelligent conversations.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center gap-4 mt-10"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all duration-300"
                >
                  Start Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/patients">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base rounded-xl"
                >
                  View Patients
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full max-w-3xl"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50"
                >
                  <stat.icon className="w-5 h-5 text-emerald-500" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Everything You Need for
              <span className="block mt-2 text-emerald-500">Modern Healthcare</span>
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="mt-4 text-muted-foreground max-w-2xl mx-auto"
            >
              Our platform combines AI technology with medical expertise to streamline
              the patient intake process.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group h-full border-border/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5">
                  <CardContent className="p-6">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 border-t border-border/40 bg-gradient-to-b from-emerald-50/30 to-transparent dark:from-emerald-950/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto mb-6 shadow-xl shadow-emerald-500/20">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of healthcare providers using TelemedAI to streamline
              their patient intake process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base rounded-xl"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
