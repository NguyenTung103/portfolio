import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: change base to '/your-repo-name/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
