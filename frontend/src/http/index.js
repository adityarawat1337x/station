const axios = require("axios")

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export const sentOtp = (data) => api.post("/api/send-otp", data)
export const verifyOtp = (data) => api.post("/api/verify-otp", data)
export default api
