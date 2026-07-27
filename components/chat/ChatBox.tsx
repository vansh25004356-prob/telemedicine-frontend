"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, AlertTriangle, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput"
import TypingIndicator from "./TypingIndicator"
import EmergencyBanner from "./EmergencyBanner"
import { sendMessage, endConsultation, getChat } from "@/services/chat"
import { cn } from "@/lib/utils"

interface ChatBoxProps {
  consultationId: string
  patientName?: string
}

interface Message {
  id: string
  message: string
  sender: "user" | "assistant"
  created_at: string
}

export default function ChatBox({ consultationId, patientName }: ChatBoxProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEnding, setIsEnding] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [emergency, setEmergency] = useState<string | null>(null)
  const [consultationEnded, setConsultationEnded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Load chat history
  useEffect(() => {
    loadChatHistory()
  }, [consultationId])

  const loadChatHistory = async () => {
    try {
      setIsInitialLoading(true)
      const data = await getChat(consultationId)
      setMessages(data || [])
    } catch (err) {
      console.error("Failed to load chat:", err)
      setError("Failed to load chat history")
    } finally {
      setIsInitialLoading(false)
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = useCallback(async (message: string) => {
    if (isLoading || consultationEnded) return

    // Optimistically add user message
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      message,
      sender: "user",
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, tempUserMsg])
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendMessage(consultationId, message)
      const aiReply = response.reply

      // Check for emergency
      if (aiReply.includes("EMERGENCY_ALERT")) {
        setEmergency(aiReply)
      }

      // Check for end consultation
      if (aiReply.includes("END_CONSULTATION")) {
        setConsultationEnded(true)
      }

      // Add AI response
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        message: aiReply.replace("END_CONSULTATION", "").trim(),
        sender: "assistant",
        created_at: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch (err: any) {
      console.error("Failed to send message:", err)
      setError(err?.response?.data?.detail || "Failed to send message. Please try again.")
      // Remove temp message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id))
    } finally {
      setIsLoading(false)
    }
  }, [consultationId, isLoading, consultationEnded])

  const handleEndConsultation = async () => {
    try {
      setIsEnding(true)
      await endConsultation(consultationId)
      setConsultationEnded(true)
      // Navigate to summary after brief delay
      setTimeout(() => {
        router.push(`/summary/${consultationId}`)
      }, 1500)
    } catch (err) {
      console.error("Failed to end consultation:", err)
      setError("Failed to end consultation")
    } finally {
      setIsEnding(false)
    }
  }

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
          <p className="text-sm text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border/40 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">AI Medical Consultation</h2>
              {patientName && (
                <p className="text-xs text-muted-foreground">Patient: {patientName}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={consultationEnded ? "secondary" : "success"}>
              {consultationEnded ? "Completed" : "Active"}
            </Badge>
            {!consultationEnded && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEndConsultation}
                disabled={isEnding}
                className="text-xs"
              >
                {isEnding ? (
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                ) : null}
                End Consultation
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="py-4">
          {/* Emergency Banner */}
          <AnimatePresence>
            {emergency && (
              <div className="px-4">
                <EmergencyBanner
                  message={emergency}
                  onDismiss={() => setEmergency(null)}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-4 mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 mb-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">
                Start Your Consultation
              </h3>
              <p className="text-xs text-muted-foreground/60 text-center max-w-sm">
                Describe your symptoms and the AI medical assistant will help collect your information for the doctor.
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg.message}
                  sender={msg.sender}
                  timestamp={new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              ))}
            </AnimatePresence>
          )}

          {/* Typing Indicator */}
          {isLoading && <TypingIndicator />}

          {/* Consultation Ended Message */}
          {consultationEnded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-8 px-4"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-3">
                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
              </div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Consultation Complete
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Redirecting to summary...
              </p>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
        disabled={consultationEnded}
        placeholder={
          consultationEnded
            ? "Consultation has ended"
            : "Describe your symptoms..."
        }
      />
    </div>
  )
}
