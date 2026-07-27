import api from "@/lib/api"

/**
 * Start a new consultation for a patient
 */
export const startConsultation = async (patientId: string) => {
  const response = await api.post("/chat/start", {
    patient_id: patientId,
  })
  return response.data
}

/**
 * Send a message in a consultation and get AI response
 */
export const sendMessage = async (consultationId: string, message: string) => {
  const response = await api.post("/chat/message", {
    consultation_id: consultationId,
    message,
  })
  return response.data
}

/**
 * Get chat history for a consultation
 */
export const getChat = async (consultationId: string) => {
  const response = await api.get(`/chat/${consultationId}`)
  return response.data.messages
}

/**
 * End an active consultation
 */
export const endConsultation = async (consultationId: string) => {
  const response = await api.post("/chat/end", {
    consultation_id: consultationId,
  })
  return response.data
}

/**
 * Test the AI service connection
 */
export const testAIConnection = async () => {
  const response = await api.post("/chat/test")
  return response.data
}
