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
  // Use absolute paths for production to ensure correct asset loading on GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/haemprojects/' : '/',
  build: {
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
  },
  css: {
    devSourcemap: true,
  }
});
