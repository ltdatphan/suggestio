import axios, { AxiosInstance, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import { decode } from '../helper/decode'
import { sanitize } from '../helper/sanitize'
import { useAuthStore } from '../stores/authStore'
import { logoutUser, refreshToken } from './auth'

const getCsrfToken = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; CSRF-TOKEN=`)
  if (parts.length === 2) {
    const token = parts.pop()
    if (token) {
      console.log(token)
      return token ? decodeURIComponent(token.split(';').shift() ?? '') : null
    }
  }
  return null
}

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleSessionExpireLogOut = () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn

  if (isLoggedIn) {
    useAuthStore.getState().clearUser()
    toast('Your session has expired. Please log in again.', {
      icon: '⚠️',
    })
  }
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    config.headers['X-CSRF-TOKEN'] = getCsrfToken()

    // Check if request data exists and is an object
    if (config.data && typeof config.data === 'object') {
      // Sanitize the request data
      config.data = sanitize(config.data)
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Decode and sanitize incoming data
    response.data = decode(response.data)
    response.data = sanitize(response.data)

    return response
  },
  async (error) => {
    if (!error.response) {
      // Handle network errors
      return Promise.reject(new Error('Network error'))
    }

    const originalConfig = error.config

    if (error.response.status === 500) {
      return Promise.reject(new Error('Server error'))
    }

    if (error.response.status === 401 && !originalConfig._retry) {
      // Check if the error is a 401 Unauthorized and the request is not already retried
      if (error.response.data.includes('Authentication required')) {
        handleSessionExpireLogOut()
        return Promise.reject(error)
      }

      originalConfig._retry = true // Mark the request as retried

      try {
        // Attempt to refresh the token
        await refreshToken()

        // Update the Authorization header with the new token
        // Assuming your `refreshToken` function handles updating the token in the `api` instance
        return api(originalConfig) // Retry the original request with the new token
      } catch (refreshError) {
        // Handle token refresh failure
        handleSessionExpireLogOut()
        return Promise.reject(refreshError)
      }
    }

    // If csrf token is invalid, log the user out.
    if (
      error.response.status == 403 &&
      error.response.data == 'CSRF token validation failed'
    ) {
      try {
        await logoutUser()
        handleSessionExpireLogOut()
      } catch (logoutError) {
        return Promise.reject(logoutError)
      }
    }
    // If the error is not 401 or the request has already been retried, reject the promise with the error
    return Promise.reject(error)
  },
)

export function extractErrorMessages(
  errorResponse: AxiosResponse<any>,
  genericResponse: string = 'An unknown error occurred',
) {
  // Check the structure of the error response from your API
  if (errorResponse.data?.errors) {
    const errorsArray = Object.values(errorResponse.data.errors)
    const concatenatedErrors = errorsArray.flat().join(' ')
    return concatenatedErrors
  }

  // Fallback for other types of error responses
  return genericResponse
}

export default api
