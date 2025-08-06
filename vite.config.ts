import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 3100,
    open: true,
    host: true,
  },
  // Use root-relative paths
  base: '/',
  css: {
    devSourcemap: true,
    // Ensure CSS is properly extracted in production
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/global.css";`
      }
    }
  },
  build: {
    // Ensure CSS is included in the build
    cssCodeSplit: false, // This ensures all CSS is in a single file
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
});
