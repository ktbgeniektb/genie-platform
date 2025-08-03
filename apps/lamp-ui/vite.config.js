import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: '/gs/genie-platform/apps/lamp-ui/', // ← 本番URLのルートに一致
    plugins: [react()],
    build: {
      outDir: 'dist',
      manifest: true,
    },
  }
})
