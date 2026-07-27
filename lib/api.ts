import axios from "axios"


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`)
    }
    return config
  },
  (error) => {
    console.error("[API] Request error:", error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      console.error(`[API] Error ${status}:`, data)

      // Handle specific status codes
      switch (status) {
        case 401:
          console.warn("[API] Unauthorized access")
          break
        case 429:
          console.warn("[API] Rate limited")
          break
        case 500:
          console.error("[API] Server error")
          break
      }
    } else if (error.request) {
      console.error("[API] Network error - no response received")
    }
    return Promise.reject(error)
  }
)



export default api

