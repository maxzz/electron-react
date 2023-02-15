import { BrowserWindow } from "electron";

export type RendererDarkMode = {
    command: string;
};

export type RendererCalls = {
    data: RendererDarkMode;
};

export function sendToRanderer(win: BrowserWindow, channel: string, data: RendererCalls) {
    win && win.webContents.send(channel, data);
}
