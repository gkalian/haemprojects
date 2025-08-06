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
  base: '/',
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
    // Don't inline assets to ensure external URLs work correctly
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
