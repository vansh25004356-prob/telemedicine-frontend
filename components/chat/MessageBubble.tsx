"use client"

import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface MessageBubbleProps {
  message: string
  sender: "user" | "assistant"
  timestamp?: string
}

export default function MessageBubble({ message, sender, timestamp }: MessageBubbleProps) {
  const isUser = sender === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex items-start gap-3 px-4 py-2",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
          isUser
            ? "bg-emerald-100 dark:bg-emerald-900/50"
            : "bg-blue-100 dark:bg-blue-900/50"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn("flex flex-col max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-emerald-500 text-white rounded-tr-sm"
              : "bg-muted/50 text-foreground rounded-tl-sm"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-code:text-emerald-600 dark:prose-code:text-emerald-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message}
              </ReactMarkdown>
            </div>
          )}
        </div>
        {timestamp && (
          <span className="text-[10px] text-muted-foreground mt-1 px-1">
            {timestamp}
          </span>
        )}
      </div>
    </motion.div>
  )
}
