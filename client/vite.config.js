import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter or other components as needed

export default defineConfig({
  plugins: [
    react(),         // Default React plugin
    tailwindcss(),   // Tailwind CSS plugin
  ],
})
