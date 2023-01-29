import path from "path";
import fs from "fs";
import { app, BrowserWindow, Rectangle } from "electron";

const initPath = path.join(app.getPath('userData'), "init.json");

export type IniOptions = {
    bounds: Rectangle;  // x, y, width, height
    devTools: boolean;  // is devTools open
}

export function getIniOptions(): IniOptions | undefined {
    try {
        const cnt = fs.readFileSync(initPath, 'utf8');
        return JSON.parse(cnt) as IniOptions;
    }
    catch (e) {
    }
}

export function saveIniOptions(win: BrowserWindow) {
    const data = {
        bounds: win.getBounds(),
        devTools: win.webContents.isDevToolsOpened(),
    };
    fs.writeFileSync(initPath, JSON.stringify(data));
}
