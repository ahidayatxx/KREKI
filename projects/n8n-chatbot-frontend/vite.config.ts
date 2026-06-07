import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/webhook': {
        target: 'https://n8n-j9lhpdfos8lh.perak.sumopod.my.id',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/webhook/, '/webhook'),
      },
    },
  },
})
