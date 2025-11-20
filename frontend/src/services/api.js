import axios from 'axios'
import { authHelpers } from './supabase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7860'

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to add auth token
api.interceptors.request.use(
    async (config) => {
        const token = await authHelpers.getAuthToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized - please log in')
        }
        return Promise.reject(error)
    }
)

// API methods
export const phoneAPI = {
    // Get all phones with optional filters
    async getAllPhones(filters = {}) {
        const params = new URLSearchParams()

        if (filters.availableOnly !== undefined) {
            params.append('available_only', filters.availableOnly)
        }
        if (filters.dealsOnly !== undefined) {
            params.append('deals_only', filters.dealsOnly)
        }
        if (filters.brand) {
            params.append('brand', filters.brand)
        }
        if (filters.minPrice) {
            params.append('min_price', filters.minPrice)
        }
        if (filters.maxPrice) {
            params.append('max_price', filters.maxPrice)
        }

        const response = await api.get(`/phones?${params.toString()}`)
        return response.data
    },

    // Get all unique brands
    async getAllBrands(availableOnly = true) {
        const params = new URLSearchParams()
        params.append('available_only', availableOnly)
        const response = await api.get(`/phones/brands?${params.toString()}`)
        return response.data
    },

    // Get single phone by ID
    async getPhoneById(id) {
        const response = await api.get(`/phones/${id}`)
        return response.data
    },

    // Create new phone (admin only)
    async createPhone(phoneData) {
        const response = await api.post('/phones', phoneData)
        return response.data
    },

    // Update phone (admin only)
    async updatePhone(id, phoneData) {
        const response = await api.put(`/phones/${id}`, phoneData)
        return response.data
    },

    // Mark phone as sold (admin only)
    async markAsSold(id) {
        const response = await api.delete(`/phones/${id}`)
        return response.data
    },
}

export default api
