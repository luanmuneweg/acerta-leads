import { envVariables } from '@/lib/variables/env.variables'
import axios from 'axios'

export const api = axios.create({
    baseURL: envVariables.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
})
