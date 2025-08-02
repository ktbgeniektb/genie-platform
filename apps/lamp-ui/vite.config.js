import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE_PATH || '/build/',
    plugins: [react()],
    publicDir: 'public',
    build: {
      outDir: 'public/build',
      manifest: true,
      rollupOptions: {
        input: 'src/main.jsx',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
