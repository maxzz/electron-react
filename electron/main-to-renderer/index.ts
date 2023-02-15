import { BrowserWindow } from "electron";
import { RendererDarkMode } from "./menu-commands";

export type RendererCalls = {
    data: RendererDarkMode;
};

export function mainToRanderer(w: BrowserWindow, channel: string, data: RendererCalls) {
    w?.webContents.send(channel, data);
}
