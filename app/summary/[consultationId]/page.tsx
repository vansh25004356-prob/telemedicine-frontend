"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  ArrowLeft,
  FileText,
  Loader2,
  AlertCircle,
  RefreshCw,
  Download,
  Printer,
  Calendar,
  Clock,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { getSummary, generateSummary } from "@/services/summary"

interface SummaryData {
  id: string
  consultation_id: string
  summary_text: string
  status: string
  generated_at: string
  created_at: string
}

export default function SummaryPage() {
  const params = useParams()
  const consultationId = params.consultationId as string
  const [summary, setSummary] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSummary()
  }, [consultationId])

  const loadSummary = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getSummary(consultationId)
      setSummary(data)
    } catch (err: any) {
      if (err?.response?.status === 404) {
        // No summary yet, generate one
        await handleGenerate()
      } else {
        setError("Failed to load summary")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    try {
      setGenerating(true)
      setError(null)
      const data = await generateSummary(consultationId)
      setSummary(data)
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to generate summary")
    } finally {
      setGenerating(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    if (!summary?.summary_text) return
    const blob = new Blob([summary.summary_text], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `consultation-summary-${consultationId.slice(0, 8)}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href={`/chat/${consultationId}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Consultation
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Consultation Summary</h1>
              <p className="text-sm text-muted-foreground">
                ID: {consultationId.slice(0, 8)}...
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="rounded-lg"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!summary}
              className="rounded-lg"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download
            </Button>
            <Button
              size="sm"
              onClick={handleGenerate}
              disabled={generating}
              className="rounded-lg bg-emerald-500 hover:bg-emerald-600"
            >
              {generating ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-1.5" />
              )}
              Regenerate
            </Button>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Failed to Load Summary</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
              {error}
            </p>
            <Button onClick={handleGenerate} variant="outline" className="rounded-xl">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Generating State */}
        {generating && !summary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Generating Summary</h3>
            <p className="text-sm text-muted-foreground">
              Analyzing consultation conversation...
            </p>
          </motion.div>
        )}

        {/* Summary Content */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(summary.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(summary.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <Badge variant={summary.status === "completed" ? "success" : "warning"}>
                {summary.status}
              </Badge>
            </div>

            <Separator className="mb-6" />

            {/* Summary Text */}
            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {summary.summary_text}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
