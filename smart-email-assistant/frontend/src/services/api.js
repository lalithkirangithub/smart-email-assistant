import axios from 'axios'

// Vite proxy handles /api -> http://localhost:8080 (see vite.config.js)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

export const emailApi = {
  processEmail: async (requestData) => {
    const response = await apiClient.post('/email/process', requestData)
    return response.data
  },

  getAvailableActions: async () => {
    const response = await apiClient.get('/email/actions')
    return response.data
  },

  healthCheck: async () => {
    const response = await apiClient.get('/email/health')
    return response.data
  },
}

export default apiClient
