import axios from "axios"
import { config } from "@/config"

// Validar que la URL base sea absoluta
const baseURL = config.EMAIL_MS.startsWith("http") ? config.EMAIL_MS : `https://${config.EMAIL_MS}`

export const emailInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})
