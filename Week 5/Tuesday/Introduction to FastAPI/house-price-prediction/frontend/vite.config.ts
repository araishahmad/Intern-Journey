import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Vite config — https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5173'),
    // Proxy API requests to the FastAPI backend during development.
    // The frontend uses relative URLs (e.g. fetch('/estimate')),
    // Vite intercepts them here and forwards to http://localhost:8000.
    proxy: {
      '/estimate': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // Only proxy POST requests (fetch from the form).
        // GET /estimate should be served by Vite so the React page loads.
        bypass(req) {
          if (req.method === 'GET') return req.url
        },
      },
      '/home': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5173'),
  },
})
