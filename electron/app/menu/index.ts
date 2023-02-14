import { BrowserWindow, MenuItem, MenuItemConstructorOptions } from "electron";

export function buildMenuTemplate(): MenuItemConstructorOptions[] {
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
                    type: 'checkbox',
                    click(item: MenuItem, focusedWindow: BrowserWindow) {
                        console.log('%c-------------- dark item', 'color:red', item);
                        console.log('%c-------------- dark window', 'color:orange', focusedWindow);
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

    return [
        ...fileMenu,
        ...viewMenu,
    ];
}
