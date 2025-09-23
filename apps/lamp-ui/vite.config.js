import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rawBase = env.VITE_BASE_PATH || '/gs/genie-platform/apps/lamp-ui'
  const base = (rawBase.replace(/\/+$/, '') || '') + '/'
  return {
    base,
    plugins: [react()],
    build: { outDir: 'dist', manifest: true },
  }
})