import api from "@/lib/api"

/**
 * Get the summary for a consultation
 */
export const getSummary = async (consultationId: string) => {
  const response = await api.get(`/summaries/${consultationId}`)
  return response.data.data ?? response.data
}

/**
 * Generate an AI summary for a consultation
 */
export const generateSummary = async (consultationId: string) => {
  const response = await api.post(`/summaries/${consultationId}/generate`)
  return response.data.data ?? response.data
}
