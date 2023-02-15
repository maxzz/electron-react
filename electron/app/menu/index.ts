import { BrowserWindow, MenuItem, MenuItemConstructorOptions } from "electron";
import { mainToRanderer, ToRendererKeys } from "../../main-to-renderer";

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
            { role: 'toggleDevTools', accelerator: 'F12', },
            { type: 'separator' },
            {
                label: 'Dark Theme',
                id: 'dark-theme',
                enabled: true,
                type: 'checkbox',
                accelerator: 'F4',
                click(item: MenuItem, _focusedWindow: BrowserWindow) {
                    mainToRanderer(ToRendererKeys.menuCommand, { type: 'dark-mode', active: item.checked });
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
