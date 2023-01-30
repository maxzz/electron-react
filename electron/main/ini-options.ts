import path from "path";
import fs from "fs";
import { app, BrowserWindow, Rectangle, screen } from "electron";

const initPath = path.join(app.getPath('userData'), "init.json");

export type IniOptions = {
    bounds: Rectangle;  // x, y, width, height
    devTools: boolean;  // is devTools open
};

function fixBounds(bounds: Rectangle): Rectangle | undefined {
    if (bounds) {
        const area = screen.getDisplayMatching(bounds).workArea;

        const isInsideRect = (bounds: Rectangle, area: Rectangle) =>
            bounds.x >= area.x &&
            bounds.y >= area.y &&
            bounds.x + bounds.width <= area.x + area.width &&
            bounds.y + bounds.height <= area.y + area.height;

        const isInsideWidth = (bounds: Rectangle, area: Rectangle) =>
            bounds.width <= area.width ||
            bounds.height <= area.height;

        if (isInsideRect(bounds, area)) {
            return bounds;
        }

        // const options: Partial<Rectangle> = {};

        // // If the saved position still valid (the window is entirely inside the display area), use it.
        // if (isInsideRect(bounds, area)) {
        //     options.x = bounds.x;
        //     options.y = bounds.y;
        // }

        // // If the saved size is still valid, use it. //https://github.com/electron/electron/issues/526
        // if (isInsideWidth(bounds, area)) {
        //     options.width = bounds.width;
        //     options.height = bounds.height;
        // }

        // return options;
    }
}

export function getIniOptions(): IniOptions | undefined {
    try {
        const cnt = fs.readFileSync(initPath, 'utf8');
        const data = JSON.parse(cnt) as IniOptions;
        const bounds = fixBounds(data?.bounds); // it seems like windows is doing this as well
        bounds && (data.bounds = bounds);
        return data;
    }
    catch (e) {
    }
}

export function saveIniOptions(win: BrowserWindow) {
    const data = {
        bounds: win.getNormalBounds(),
        devTools: win.webContents.isDevToolsOpened(),
    };
    fs.writeFileSync(initPath, JSON.stringify(data));
}
