import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Router
            if (id.includes('react-router')) {
              return 'router';
            }
            // UI and Animation libraries
            if (id.includes('framer-motion') || id.includes('react-icons')) {
              return 'ui-vendor';
            }
            // HTTP and utilities
            if (id.includes('axios') || id.includes('react-hot-toast')) {
              return 'utils-vendor';
            }
            // Sentry and monitoring
            if (id.includes('@sentry') || id.includes('sentry')) {
              return 'monitoring-vendor';
            }
            // Google OAuth
            if (id.includes('@react-oauth/google')) {
              return 'auth-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
          
          // App chunks
          if (id.includes('src/components')) {
            return 'components';
          }
          if (id.includes('src/context')) {
            return 'context';
          }
          if (id.includes('src/hooks')) {
            return 'hooks';
          }
        }
      }
    }
  },
  esbuild: {
    loader: 'tsx',
    include: ['src/**/*.tsx', 'src/**/*.ts']
  }
}) 