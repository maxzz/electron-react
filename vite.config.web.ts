import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        base: '',
        plugins: [
            react(),
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            },
        },
        server: {
            port: 3000,
        },
    };
});
