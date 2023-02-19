import { BrowserWindow, dialog } from "electron";

export async function openFileDialog(appWin: BrowserWindow | null | undefined, what: { openDirs: boolean; } = { openDirs: false }) {
    if (!appWin) {
        return;
    }
    const { canceled, filePaths } = await dialog.showOpenDialog(appWin, {
        properties: [ what.openDirs ? 'openDirectory' : 'openFile', 'multiSelections'],
    });
    console.log('filePaths', filePaths);

}
