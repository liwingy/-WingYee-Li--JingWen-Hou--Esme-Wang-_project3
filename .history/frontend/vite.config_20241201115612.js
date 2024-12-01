import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Port for your frontend
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Your backend URL
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
