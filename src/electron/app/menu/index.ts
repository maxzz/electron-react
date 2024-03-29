import { BrowserWindow, globalShortcut, MenuItem, MenuItemConstructorOptions } from "electron";
import { winApp } from "../start-main-window/main-window";
import { M2R } from "../ipc-main";
import { mainToRanderer, openFileDialog } from "../ipc-main/ipc-main-commands";

export function buildGlobalShortcuts(win?: BrowserWindow | null) {
    globalShortcut.register('CommandOrControl+R', () => { win?.reload(); });
    globalShortcut.register('CommandOrControl+Shift+I', () => { win?.webContents.toggleDevTools(); });
}

const fileMenu: MenuItemConstructorOptions[] = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open File...',
                accelerator: 'CommandOrControl+O',
                click: async () => { openFileDialog(winApp, {openDirs: false}); }
            },
            {
                label: 'Open Folder...',
                accelerator: 'CommandOrControl+Shift+O',
                click: async () => { openFileDialog(winApp, {openDirs: true}); }
            },
            // {
            //     label: 'Click',
            //     click: () => { console.log('click'); }
            // },
            { role: 'reload', accelerator: 'F5', },
            { type: 'separator' },
            { role: 'quit' },
        ]
    }
];

const viewMenu: MenuItemConstructorOptions[] = [
    {
        label: 'View',
        submenu: [
            { role: 'toggleDevTools', accelerator: 'F12', },
            { type: 'separator' },
            {
                label: 'Dark Theme',
                id: 'dark-theme',
                enabled: true,
                checked: true,
                type: 'checkbox',
                accelerator: 'CommandOrControl+F4',
                click(item: MenuItem) { mainToRanderer({ type: 'dark-mode', active: item.checked }); },
            },
            { type: 'separator' },
            { role: 'resetZoom', },
            { role: 'zoomIn', accelerator: 'Control+=' },
            { role: 'zoomOut', },
            { type: 'separator' },
            { role: 'togglefullscreen', },
        ]
    }
];

export function buildMenuTemplate(): MenuItemConstructorOptions[] {
    return [
        ...fileMenu,
        ...viewMenu,
        {
            label: 'Reload Files',
            id: 'reload-files',
            enabled: true,
            accelerator: 'F4',
            click() { mainToRanderer({ type: 'reload-files' }); },
        },
    ];
}
