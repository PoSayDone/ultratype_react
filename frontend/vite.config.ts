import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5074,
    // proxy: {
    //   '/socket.io': {
    //     target: 'ws://localhost:5073',
    //     ws: true
    //   },
    // },
    // hmr: {
    //   path: "/socket.io",
    //   port: 9027,
    //   clientPort: 443,
    // },
  },
})