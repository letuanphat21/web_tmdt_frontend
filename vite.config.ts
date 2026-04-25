import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Thêm dòng import này

export default defineConfig({
  plugins: [react()],
  // Thêm block resolve này vào:
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})