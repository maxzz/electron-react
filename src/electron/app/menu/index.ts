import { MenuItem, MenuItemConstructorOptions } from "electron";
import { mainToRanderer } from "../../main-to-renderer";

const fileMenu: MenuItemConstructorOptions[] = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Click',
                accelerator: 'CommandOrControl+Shift+L',
                click: () => { console.log('click'); }
            },
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