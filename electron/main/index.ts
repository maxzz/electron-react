import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { release } from 'node:os';
import { join } from 'node:path';
import { getWinBounds, saveWinBounds } from './window-pos';

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;

// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js');
const indexHtml = join(process.env.DIST, 'index.html');
const url = process.env.VITE_DEV_SERVER_URL;

async function createWindow() {
    const bounds = getWinBounds();

    win = new BrowserWindow({
        title: 'Main window',
        icon: join(process.env.PUBLIC, 'favicon.ico'),
        ...(bounds && bounds),
        webPreferences: {
            preload,
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
        win.loadURL(url);
        win.webContents.openDevTools(); // Open devTool if the app is not packaged
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
        saveWinBounds(win.getBounds());
    });
}

app.whenReady().then(createWindow);

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

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${url}#${arg}`);
    } else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});



// app.on('ready', function () {
//     const path = require("path");
//     const fs = require("fs");
//     const initPath = path.join(app.getPath('userData'), "init.json");

//     console.log(`app name ${app.getName()}`); // 'electron-vite-react'

//     //https://www.electronjs.org/docs/latest/api/app#appsetpathname-path
//     console.log(`data path ${initPath}`); // C:\Users\maxzz\AppData\Roaming\electron-vite-react\init.json

//     let data: any;
//     try {
//         data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
//     }
//     catch (e) {
//     }

//     // // Create the browser window.
//     // win = new BrowserWindow((data && data.bounds) ? data.bounds : {width: 800, height: 600});
//     // ...

//     win.on("close", function () {
//         console.log('win', win);
//         const data = {
//             bounds: win.getBounds()
//         };
//         fs.writeFileSync(initPath, JSON.stringify(data));
//     });
//     // ...
// });
