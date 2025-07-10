import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE_PATH || '/',
    define: {
      // （必要なら）process.env へのマッピング
    },
    plugins: [react()],
  }
})