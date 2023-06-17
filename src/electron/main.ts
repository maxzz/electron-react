import { join } from 'node:path';
import { app, Menu } from 'electron';
import { createWindow, connect_MainWindowListeners, connect_ListenersForCallFromRenderer, winApp } from './app/start-main-window/main-window';
import { buildGlobalShortcuts, buildMenuTemplate } from './app/menu';

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

console.log('........................ main __dirname', __dirname);

connect_MainWindowListeners();
connect_ListenersForCallFromRenderer();

app.whenReady().then(() => {
    const menu = buildMenuTemplate();

    const appMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(appMenu);

    createWindow();

    buildGlobalShortcuts(winApp);
});
