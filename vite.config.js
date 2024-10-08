import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173, // Use PORT from environment or default to 5173
    host: true, // Expose the app to external requests (0.0.0.0)
  },
});
