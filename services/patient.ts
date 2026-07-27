import api from "@/lib/api"
import type { PatientFormData } from "@/schemas/patient"

/**
 * Register a new patient
 */
export const registerPatient = async (data: PatientFormData) => {
  const response = await api.post("/patients/", data)
  return response.data
}

/**
 * Fetch all patients
 */
export const getPatients = async () => {
  const response = await api.get("/patients/")
  // Handle both wrapped and unwrapped responses
  return response.data.data ?? response.data
}

/**
 * Fetch a single patient by ID
 */
export const getPatientById = async (id: string) => {
  const response = await api.get(`/patients/${id}`)
  return response.data.data ?? response.data
}

/**
 * Update a patient
 */
export const updatePatient = async (id: string, data: PatientFormData) => {
  const response = await api.put(`/patients/${id}`, data)
  return response.data.data ?? response.data
}

/**
 * Delete a patient
 */
export const deletePatient = async (id: string) => {
  const response = await api.delete(`/patients/${id}`)
  return response.data.data ?? response.data
}

/**
 * Get patient summary with consultation history
 */
export const getPatientSummary = async (id: string) => {
  const response = await api.get(`/patients/${id}/summary`)
  return response.data.data ?? response.data
}

/**
 * Search patients
 */
export const searchPatients = async (query: string) => {
  const response = await api.get(`/patients/`, {
    params: { search: query },
  })
  return response.data.data ?? response.data
}
