import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        base: '',
        plugins: [
            react(),
            svgr(),
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
