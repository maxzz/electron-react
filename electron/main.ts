import { join } from 'node:path';
import { app } from 'electron';
import { createWindow, connectMainHandlers } from './app/main-window';
import { connectRendererHandlers } from './app/main-handlers';

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

console.log('main    __dirname', __dirname);

connectMainHandlers();
connectRendererHandlers();

app.whenReady().then(createWindow);
