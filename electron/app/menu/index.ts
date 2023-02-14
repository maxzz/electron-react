import { MenuItemConstructorOptions } from "electron";

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
                    label: 'Toggle DevTools',
                    accelerator: 'F12',
                    click: () => {
                        console.log('click1');
                    }
                },
                {
                    label: 'Dark Theme',
                    id: 'dark-theme',
                    type: 'checkbox',
                    click() {
                        console.log('dark');
                    },
                },
                { type: 'separator' },
                {
                    label: 'Reset Zoom',
                    accelerator: 'Control+0',
                    click: () => {
                        console.log('zoom +');
                    },
                },
                {
                    label: 'Zoom In',
                    accelerator: 'Control+=',
                    click: () => {
                        console.log('zoom +');
                    },
                },
                {
                    label: 'Zoom Out',
                    accelerator: 'Control+-',
                    click: () => {
                        console.log('zoom +');
                    },
                },
                { type: 'separator' },
                {
                    label: 'Full Screen',
                    accelerator: 'F11',
                    click: () => {
                        console.log('fullScreen');
                    },
                },
            ]
        }
    ];

    return [
        ...fileMenu,
        ...viewMenu,
    ];
}
