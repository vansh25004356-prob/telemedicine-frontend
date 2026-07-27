import api from "@/lib/api"

/**
 * Get medical records for a patient
 */
export const getMedicalRecords = async (
  patientId: string,
  fileType?: string,
  consultationId?: string
) => {
  const params: Record<string, string> = { patient_id: patientId }
  if (fileType) params.file_type = fileType
  if (consultationId) params.consultation_id = consultationId

  const response = await api.get("/medical-records/", { params })
  return response.data.data ?? response.data
}

/**
 * Upload a medical file
 */
export const uploadMedicalRecord = async (
  patientId: string,
  file: File,
  consultationId?: string,
  uploadedBy: string = "patient"
) => {
  const formData = new FormData()
  formData.append("patient_id", patientId)
  formData.append("file", file)
  formData.append("uploaded_by", uploadedBy)
  if (consultationId) formData.append("consultation_id", consultationId)

  const response = await api.post("/medical-records/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data.data ?? response.data
}

/**
 * Get file details
 */
export const getFileDetails = async (fileId: string) => {
  const response = await api.get(`/medical-records/${fileId}`)
  return response.data.data ?? response.data
}

/**
 * Download a file
 */
export const downloadFile = async (fileId: string) => {
  const response = await api.get(`/medical-records/${fileId}/download`, {
    responseType: "blob",
  })
  return response
}

/**
 * Delete a file
 */
export const deleteMedicalRecord = async (fileId: string) => {
  const response = await api.delete(`/medical-records/${fileId}`)
  return response.data.data ?? response.data
}

