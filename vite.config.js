import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import envFile from "vite-plugin-env-file";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    envFile({
      filename: ".env",
      encrypt: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})
