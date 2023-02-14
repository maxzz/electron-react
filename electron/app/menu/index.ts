import { BrowserWindow, MenuItem, MenuItemConstructorOptions } from "electron";
import { ToRendererKeys } from "../../preload-types";

const fileMenu: MenuItemConstructorOptions[] = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Click',
                accelerator: 'CommandOrControl+Shift+L',
                click: () => {
                    console.log('click');
                }
            },
            { type: 'separator' },
            { role: 'quit' },
        ]
    }
];

const viewMenu: MenuItemConstructorOptions[] = [
    {
        label: 'View',
        submenu: [
            {
                role: 'toggleDevTools',
                accelerator: 'F12',
            },
            { type: 'separator' },
            {
                label: 'Dark Theme',
                id: 'dark-theme',
                enabled: true,
                type: 'checkbox',
                accelerator: 'F4',
                click(item: MenuItem, focusedWindow: BrowserWindow) {
                    console.log('send', item.id);
                    focusedWindow && focusedWindow.webContents.send(ToRendererKeys.menuCommand, item.id);
                },
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
    ];
}
