import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindCSS from '@tailwindcss/vite'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindCSS(),],
// })

export default defineConfig({
  plugins: [react(),tailwindCSS()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})