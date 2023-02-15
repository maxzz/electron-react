import { appWin } from "../app/main-window";
import { DarkMode } from "./menu-commands";
import {ToRendererKeys} from '../preload-enums';

export type RendererCalls = DarkMode;

export function mainToRanderer(data: RendererCalls) {
    appWin?.webContents.send(ToRendererKeys.sendToRenderer, data);
}
