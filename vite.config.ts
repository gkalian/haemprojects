import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url'
import path from 'path'

export default defineConfig({
  base: "",
  publicDir: path.resolve(__dirname, 'public'),
  root: path.resolve(__dirname),
  plugins: [react()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3100,
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
