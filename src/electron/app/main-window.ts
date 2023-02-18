import { join } from 'node:path';
import { release } from 'node:os';
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent, shell } from 'electron';
import { getIniOptions, saveIniOptions } from './utils/app-ini-options';
import { callFromRendererToMain } from './ipc-main/ipc-calls';
import { invokeFromRendererToMain } from './ipc-main/ipc-invoke';
import { M4R, M4RInvoke } from './ipc-main';

export let appWin: BrowserWindow | null | undefined = null;

export async function createWindow() {
    const iniOptions = getIniOptions();

    const preload = join(__dirname, '../preload.js');
    const indexHtml = join(process.env.DIST || '', 'index.html');
    const hmrServerUrl = process.env.VITE_DEV_SERVER_URL;

    appWin = new BrowserWindow({
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
        appWin.loadURL(hmrServerUrl);
        iniOptions?.devTools && appWin.webContents.openDevTools(); // Open devTool if the app is not packaged
    } else {
        appWin.loadFile(indexHtml);
    }

    appWin.once('ready-to-show', () => appWin?.show());

    // Test actively push message to the Electron-Renderer
    appWin.webContents.on('did-finish-load', () => {
        appWin?.webContents.send('main-process-message', new Date().toLocaleString());
    });

    // Make all links open with the browser, not with the application
    appWin.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    appWin.on('close', () => {
        appWin && saveIniOptions(appWin);
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
        appWin = null;
        if (process.platform !== 'darwin') app.quit();
    });

    app.on('second-instance', () => {
        if (appWin) {
            // Focus on the main window if the user tried to open another
            if (appWin.isMinimized()) {
                appWin.restore();
            }
            appWin.focus();
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
