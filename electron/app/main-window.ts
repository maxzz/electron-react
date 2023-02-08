import { join } from 'node:path';
import { release } from 'node:os';
import { app, BrowserWindow, shell } from 'electron';
import { getIniOptions, saveIniOptions } from './utils/ini-options';

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

if (release().startsWith('6.1')) app.disableHardwareAcceleration(); // Disable GPU Acceleration for Windows 7
if (process.platform === 'win32') app.setAppUserModelId(app.getName()); // Set application name for Windows 10+ notifications

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export let win: BrowserWindow | null = null;

const preload = join(__dirname, '../preload.js');
const indexHtml = join(process.env.DIST, 'index.html');
const hmrServerUrl = process.env.VITE_DEV_SERVER_URL;

export async function createWindow() {
    const iniOptions = getIniOptions();

    win = new BrowserWindow({
        title: 'Main window',
        icon: join(process.env.PUBLIC, 'favicon.ico'),
        ...(iniOptions?.bounds),
        webPreferences: {
            preload,
            nodeIntegration: false,
            contextIsolation: true, //https://www.electronjs.org/docs/latest/tutorial/context-isolation
        },
    });

    if (hmrServerUrl) { //https://github.com/electron-vite/electron-vite-vue/issues/298
        win.loadURL(hmrServerUrl);
        iniOptions?.devTools && win.webContents.openDevTools(); // Open devTool if the app is not packaged
    } else {
        win.loadFile(indexHtml);
    }

    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString());
    });

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    win.on('close', () => {
        saveIniOptions(win);
    });
}

app.on('window-all-closed', () => {
    win = null;
    if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) {
            win.restore();
        }
        win.focus();
    }
});

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});

// ipcMain handlers

// New window example arg: new windows url
// ipcMain.handle('open-win', (_, arg) => {
//     const childWindow = new BrowserWindow({
//         webPreferences: {
//             preload,
//             nodeIntegration: true,
//             contextIsolation: false,
//         },
//     });

//     if (process.env.VITE_DEV_SERVER_URL) {
//         childWindow.loadURL(`${hmrServerUrl}#${arg}`);
//     } else {
//         childWindow.loadFile(indexHtml, { hash: arg });
//     }
// });
