import api from "@/lib/api"

/**
 * Get complete dashboard data
 */
export const getCompleteDashboard = async () => {
  const response = await api.get("/dashboard/complete")
  return response.data.data ?? response.data
}

/**
 * Get platform statistics
 */
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats")
  return response.data.data ?? response.data
}

/**
 * Get recent activity
 */
export const getRecentActivity = async (limit: number = 10) => {
  const response = await api.get("/dashboard/recent-activity", {
    params: { limit },
  })
  return response.data.data ?? response.data
}

/**
 * Get consultation trends
 */
export const getConsultationTrends = async (days: number = 7) => {
  const response = await api.get("/dashboard/trends", {
    params: { days },
  })
  return response.data.data ?? response.data
}

/**
 * Get AI usage statistics
 */
export const getAIUsageStats = async () => {
  const response = await api.get("/dashboard/ai-usage")
  return response.data.data ?? response.data
}

/**
 * Get user notifications
 */
export const getNotifications = async (limit: number = 20) => {
  const response = await api.get("/dashboard/notifications", {
    params: { limit },
  })
  return response.data.data ?? response.data
}

/**
 * Mark a notification as read
 */
export const markNotificationRead = async (notificationId: string) => {
  const response = await api.post(`/dashboard/notifications/${notificationId}/read`)
  return response.data
}

