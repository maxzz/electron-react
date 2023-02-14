import { MenuItemConstructorOptions } from "electron";

export function buildMenu(): MenuItemConstructorOptions[] {
    const rv: MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Click',
                    accelerator: 'CommandOrControl+L',
                    click: () => {
                        console.log('click');
                    }
                },
                { type: 'separator' },
                { role: 'quit' },
            ]
        }
    ];
    return rv;
}
