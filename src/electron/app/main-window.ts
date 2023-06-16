import { join } from 'node:path';
import { release } from 'node:os';
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent, shell } from 'electron';
import { getIniOptions, saveIniOptions } from './utils/app-ini-options';
import { callFromRendererToMain } from './ipc-main/ipc-calls';
import { invokeFromRendererToMain } from './ipc-main/ipc-invoke';
import { M4R, M4RInvoke } from './ipc-main';

export let winApp: BrowserWindow | null | undefined = null;

export async function createWindow() {
    const iniOptions = getIniOptions();

    const preload = join(__dirname, '../preload.js');
    const indexHtml = join(process.env.DIST || '', 'index.html');
    const hmrServerUrl = process.env.VITE_DEV_SERVER_URL;

    winApp = new BrowserWindow({
        title: 'Main window',
        icon: join(process.env.PUBLIC || '', 'favicon.ico'),
        ...(iniOptions?.bounds),
        show: false,
        backgroundColor: 'rgb(20 83 45)',
        //transparent: true,
        webPreferences: {
            preload,
            nodeIntegration: false, //https://www.electronjs.org/docs/latest/tutorial/security process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
            contextIsolation: true, //https://www.electronjs.org/docs/latest/tutorial/context-isolation
        },
    });

    if (hmrServerUrl) { //https://github.com/electron-vite/electron-vite-vue/issues/298
        winApp.loadURL(hmrServerUrl);
        iniOptions?.devTools && winApp.webContents.openDevTools(); // Open devTool if the app is not packaged
    } else {
        winApp.loadFile(indexHtml);
    }

    winApp.once('ready-to-show', () => winApp?.show());

    winApp.webContents.setWindowOpenHandler(({ url }) => { // Make all links open with the browser, not with the application
        if (url.startsWith('https:')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    winApp.on('close', () => {
        winApp && saveIniOptions(winApp);
    });

    winApp.webContents.on('did-finish-load', () => {
        winApp?.webContents.send('main-process-message', new Date().toLocaleString()); // Test actively push message to the Electron-Renderer
    });
}

export function connect_MainWindowListeners() {
    if (release().startsWith('6.1')) app.disableHardwareAcceleration(); // Disable GPU Acceleration for Windows 7
    if (process.platform === 'win32') app.setAppUserModelId(app.getName()); // Set application name for Windows 10+ notifications

    if (!app.requestSingleInstanceLock()) {
        app.quit();
        process.exit(0);
    }

    app.on('window-all-closed', () => {
        winApp = null;
        if (process.platform !== 'darwin') app.quit();
    });

    app.on('second-instance', () => {
        if (winApp) {
            // Focus on the main window if the user tried to open another
            if (winApp.isMinimized()) {
                winApp.restore();
            }
            winApp.focus();
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
}

export function connect_ListenersForCallFromRenderer() {
    // call
    function cc(_event: IpcMainEvent, data: any) {
        callFromRendererToMain(data as M4R.ToMainCalls);
    }
    function connect_CallMain(channel: PreloadChannels, handler: (event: IpcMainEvent, data: any) => void) {
        ipcMain.on(channel, handler);
    }
    connect_CallMain('call-main', cc);

    // invoke
    function ii(_event: IpcMainInvokeEvent, data: any): any {
        return invokeFromRendererToMain(data as M4RInvoke.InvokeCalls);
    }
    function connect_InvokeMain(channel: PreloadChannels, handler: (event: IpcMainInvokeEvent, data: any) => any) {
        ipcMain.handle(channel, handler);
    }
    connect_InvokeMain('invoke-main', ii);
}
