import { join } from 'node:path';
import { app, Menu } from 'electron';
import { createWindow, connectMainHandlers } from './app/main-window';
import { connectRendererHandlers } from './app/main-handlers';
import { buildMenuTemplate } from './app/menu';

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

console.log('........................ main __dirname', __dirname);

connectMainHandlers();
connectRendererHandlers();

app.whenReady().then(() => {
    const menu = buildMenuTemplate();

    const appMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(appMenu);

    createWindow();
});
