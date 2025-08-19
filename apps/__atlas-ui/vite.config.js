import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isDev = mode === 'development'
  return {
    base: isDev ? '/' : (env.VITE_BASE_PATH || '/'),
    plugins: [react()],
    server: { host: true, port: 5173 },
  }
})
