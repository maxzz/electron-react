import { appWin } from "../app/main-window";
import { DarkMode, ReloadFiles } from "./menu-commands";
import {ToRendererKeys} from '../preload-enums';

export type RendererCalls = DarkMode | ReloadFiles;

export function mainToRanderer(data: RendererCalls) {
    appWin?.webContents.send(ToRendererKeys.sendToRenderer, data);
}
