import { BrowserWindow, dialog } from "electron";
import { appWin } from "../main-window";
import { M2R, M4RInvoke } from ".";
import { loadFilesContent } from "../utils/load-files";

export function mainToRanderer(data: M2R.RendererCalls) {
    const channel: PreloadChannels = 'send-to-renderer';
    appWin?.webContents.send(channel, data);
}

export async function openFileDialog(appWin: BrowserWindow | null | undefined, what: { openDirs: boolean; } = { openDirs: false }) {
    if (!appWin) {
        return;
    }
    const { canceled, filePaths } = await dialog.showOpenDialog(appWin, {
        properties: [what.openDirs ? 'openDirectory' : 'openFile', 'multiSelections'],
    });
    if (canceled) {
        return;
    }

    console.log('filePaths', filePaths);

    const filesCnt = loadFilesContent(filePaths, M4RInvoke.allowedExt);

    console.log('filesCnt', filesCnt.map((cnt) => ({ notOur: !!cnt.notOur, name: cnt.name })));
    mainToRanderer({ type: 'opened-files', filesCnt });
}
