import { appWin } from "../app/main-window";
import { DarkMode, ReloadFiles } from "./menu-commands";

export type RendererCalls = DarkMode | ReloadFiles;

export function mainToRanderer(data: RendererCalls) {
    const channel: PreloadChannels = 'send-to-renderer';
    appWin?.webContents.send(channel, data);
}
