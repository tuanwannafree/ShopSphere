import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://shopsphere-backend-u9fq.onrender.com",
      "/uploads/": "https://shopsphere-backend-u9fq.onrender.com",
    }
  }
})
