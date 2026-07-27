"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmergencyBannerProps {
  message: string
  onDismiss: () => void
}

export default function EmergencyBanner({ message, onDismiss }: EmergencyBannerProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4"
      >
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-red-800 dark:text-red-300 text-sm mb-1">
              🚨 Emergency Detected
            </h4>
            <p className="text-sm text-red-700 dark:text-red-400">
              {message}
            </p>
            <p className="text-xs text-red-600 dark:text-red-500 mt-2 font-medium">
              Please call emergency services immediately. Do not wait for this consultation.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
