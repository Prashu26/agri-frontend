import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    host: true, // This makes the server accessible on your local network
    port: 3000,
    open: true,
    strictPort: true // Exit if port 3000 is in use
  },
  preview: {
    port: 3000,
    strictPort: true
  }
});
