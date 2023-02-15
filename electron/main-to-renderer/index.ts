import { appWin } from "../app/main-window";
import { RendererDarkMode } from "./menu-commands";
export * from '../preload-enums';

export type RendererCalls = {
    data: RendererDarkMode;
};

export function mainToRanderer(channel: string, data: RendererCalls) {
    appWin?.webContents.send(channel, data);
}
