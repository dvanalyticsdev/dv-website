import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          if (id.includes('coursesData') || id.includes('courseExtraContent')) {
            return 'course-detail-data';
          }

          if (id.includes('blogsData')) {
            return 'blogs-data';
          }

          if (id.includes('seoLandingPages')) {
            return 'seo-landing-data';
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '^/api/': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
