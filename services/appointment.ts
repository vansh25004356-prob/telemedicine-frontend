import api from "@/lib/api"

/**
 * Get all appointments, optionally filtered by status
 */
export const getAppointments = async (status?: string) => {
  const params = status ? { status } : {}
  const response = await api.get("/appointments/", { params })
  return response.data.data ?? response.data
}

/**
 * Get upcoming appointments
 */
export const getUpcomingAppointments = async (limit: number = 10) => {
  const response = await api.get("/appointments/upcoming", {
    params: { limit },
  })
  return response.data.data ?? response.data
}

/**
 * Book a new appointment
 */
export const bookAppointment = async (data: {
  patient_id: string
  doctor_id: string
  scheduled_date: string
  reason: string
  notes?: string
}) => {
  const response = await api.post("/appointments/", data)
  return response.data.data ?? response.data
}

/**
 * Get appointment details
 */
export const getAppointmentById = async (id: string) => {
  const response = await api.get(`/appointments/${id}`)
  return response.data.data ?? response.data
}

/**
 * Cancel an appointment
 */
export const cancelAppointment = async (id: string) => {
  const response = await api.post(`/appointments/${id}/cancel`)
  return response.data.data ?? response.data
}

/**
 * Reschedule an appointment
 */
export const rescheduleAppointment = async (id: string, newDate: string) => {
  const response = await api.post(`/appointments/${id}/reschedule`, {
    new_date: newDate,
  })
  return response.data.data ?? response.data
}

/**
 * Confirm an appointment (doctor only)
 */
export const confirmAppointment = async (id: string) => {
  const response = await api.post(`/appointments/${id}/confirm`)
  return response.data.data ?? response.data
}

/**
 * Complete an appointment (doctor only)
 */
export const completeAppointment = async (id: string) => {
  const response = await api.post(`/appointments/${id}/complete`)
  return response.data.data ?? response.data
}

