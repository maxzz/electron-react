import path from "path";
import fs from "fs";
import { app, BrowserWindow, Rectangle } from "electron";

const initPath = path.join(app.getPath('userData'), "init.json");

export function getWinBounds(): Rectangle | undefined {
    try {
        const cnt = fs.readFileSync(initPath, 'utf8');
        const data = JSON.parse(cnt);
        console.log('data',data);
        return data.bounds as Rectangle;
    }
    catch (e) {
    }
}

export function saveWinBounds(bounds: Rectangle) {
    const data = {
        bounds,
    };
    fs.writeFileSync(initPath, JSON.stringify(data));
}
