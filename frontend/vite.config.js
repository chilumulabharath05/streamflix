import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // All /movies and /auth requests → backend on port 5000
      '/movies': 'http://localhost:5000',
      '/auth': 'http://localhost:5000',
    }
  }
})
