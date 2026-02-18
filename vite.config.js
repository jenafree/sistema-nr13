import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/sistema-nr13/', // Comentado para desenvolvimento local
  // Descomente a linha acima apenas para build de produção (GitHub Pages)
  server: {
    port: 5173,
    open: true
  }
})
