import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            react(),
            tailwindcss()
        ],
        define: {
            __doAi_MAPS_ENV__: JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY),
        }
    }
})