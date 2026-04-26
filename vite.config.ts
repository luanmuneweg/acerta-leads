import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react(), tailwindcss()],
        server: {
            port: parseInt(env.PORT) || 3001,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    }
})
