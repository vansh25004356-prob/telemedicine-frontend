import api from "@/lib/api"

/**
 * Login with email and password
 */
export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data)
  const result = response.data

  // Store token
  if (result.token) {
    localStorage.setItem("auth_token", result.token)
    if (result.refresh_token) {
      localStorage.setItem("refresh_token", result.refresh_token)
    }
  }

  return result
}

/**
 * Register a new user
 */
export const register = async (data: {
  email: string
  password: string
  name: string
  role?: string
}) => {
  const response = await api.post("/auth/register", data)
  const result = response.data

  // Store token
  if (result.token) {
    localStorage.setItem("auth_token", result.token)
    if (result.refresh_token) {
      localStorage.setItem("refresh_token", result.refresh_token)
    }
  }

  return result
}

/**
 * Logout the current user
 */
export const logout = async () => {
  try {
    await api.post("/auth/logout")
  } catch {
    // Ignore errors
  } finally {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
  }
}

/**
 * Get current user profile
 */
export const getProfile = async () => {
  const response = await api.get("/auth/me")
  return response.data.data ?? response.data
}

/**
 * Forgot password - send reset email
 */
export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email })
  return response.data
}

/**
 * Reset password with token
 */
export const resetPassword = async (token: string, newPassword: string) => {
  const response = await api.post("/auth/reset-password", {
    token,
    new_password: newPassword,
  })
  return response.data
}

/**
 * Change password for authenticated user
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const response = await api.post("/auth/change-password", {
    current_password: currentPassword,
    new_password: newPassword,
  })
  return response.data
}

/**
 * Refresh the auth token
 */
export const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token")
  if (!refresh_token) throw new Error("No refresh token")

  const response = await api.post("/auth/refresh", {
    refresh_token,
  })
  const result = response.data

  if (result.token) {
    localStorage.setItem("auth_token", result.token)
    if (result.refresh_token) {
      localStorage.setItem("refresh_token", result.refresh_token)
    }
  }

  return result
}

/**
 * Check if user is authenticated (has token)
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("auth_token")
}

/**
 * Get stored auth token
 */
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

/**
 * Setup axios interceptor to attach auth token
 */
export const setupAuthInterceptor = () => {
  api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Try to refresh token
        try {
          await refreshToken()
          // Retry original request
          const token = getToken()
          error.config.headers.Authorization = `Bearer ${token}`
          return api(error.config)
        } catch {
          // Token refresh failed - redirect to login
          localStorage.removeItem("auth_token")
          localStorage.removeItem("refresh_token")
          localStorage.removeItem("user")
          if (typeof window !== "undefined") {
            window.location.href = "/login"
          }
        }
      }
      return Promise.reject(error)
    }
  )
}

