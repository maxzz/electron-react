import path from 'node:path';
import { rmSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-electron-plugin';
import renderer from 'vite-plugin-electron-renderer';
import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin';
import pkg from './package.json';

function electronPlugins() {
    function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299): Fn {
        let t: NodeJS.Timeout;
        return ((...args: Parameters<Fn>) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), delay);
        }) as Fn;
    }

    function startWithOrwithoutDebug() {
        return !!process.env.VSCODE_DEBUG // Will start Electron via VSCode Debug
            ? [customStart(() => debounce(() => console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App'))),]
            : [];
    }

    return [
        ...startWithOrwithoutDebug(),
        loadViteEnv(), // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
    ];
}

function original() {
    function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299): Fn {
        let t: NodeJS.Timeout;
        return ((...args: Parameters<Fn>) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), delay);
        }) as Fn;
    }

    return [
        ...(!!process.env.VSCODE_DEBUG
            ? [
                // Will start Electron via VSCode Debug
                customStart(debounce(() => console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App'))),
            ]
            : []),
        // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
        loadViteEnv(),
    ];
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    rmSync('dist-electron', { recursive: true, force: true });

    const sourcemap = command === 'serve' || !!process.env.VSCODE_DEBUG;

    return {
        plugins: [
            react(),

            electron({
                include: ['electron'],
                transformOptions: { sourcemap, },
                //plugins: original(),
                plugins: electronPlugins(),
            }),

            renderer({ nodeIntegration: true, }), // Use Node.js API in the Renderer-process
        ],

        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            },
        },

        server: !!process.env.VSCODE_DEBUG
            ? (() => {
                const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
                return {
                    host: url.hostname,
                    port: +url.port,
                };
            })()
            : undefined,

        clearScreen: false,
    };
});
