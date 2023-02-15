import { appWin } from "../app/main-window";
import { DarkMode } from "./menu-commands";
export * from '../preload-enums';

export type RendererCalls = DarkMode;

export function mainToRanderer(channel: string, data: RendererCalls) {
    appWin?.webContents.send(channel, data);
}
