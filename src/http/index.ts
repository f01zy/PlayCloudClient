"use client"

import axios from 'axios';
import { API_URL } from "@/config"

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("token") : ""}`
  return config
})

$api.interceptors.response.use(
  (response) => {
    return response
  },
  async error => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
      try {
        originalRequest._isRetry = true
        const res = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true })
        localStorage.setItem("token", res.data.accessToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.log("Не авторизован");
      }
    }
    throw error
  }
)