import { appWin } from "../app/main-window";
import { DarkMode, ReloadFiles } from "./menu-commands";
import {ToRendererKeys} from '../preload-enums';

export type RendererCalls = DarkMode | ReloadFiles;

export function mainToRanderer(data: RendererCalls) {
    const channel: PreloadChannels = 'send-to-renderer';
    appWin?.webContents.send(channel, data);
}
