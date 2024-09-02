import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local',

    }
  },
  server: {
    proxy: {
      "/graphql": "http://localhost:4000",
    },
  },
});
