"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ChatBox from "@/components/chat/ChatBox"

export default function ChatPage() {
  const params = useParams()
  const consultationId = params.consultationId as string

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Back Navigation */}
      <div className="border-b border-border/40 bg-background/50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-3">
          <Link
            href="/patients"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Patients
          </Link>
        </div>
      </div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col max-w-5xl mx-auto w-full"
      >
        <div className="flex-1 flex flex-col border-x border-border/40 bg-card/30">
          <ChatBox consultationId={consultationId} />
        </div>
      </motion.div>
    </div>
  )
}
