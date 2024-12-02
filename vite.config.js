import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/recollective/',
  plugins: [react()],
  test: {
    globals: true,  // This makes 'expect' globally available
    environment: "jsdom",
  }
})
