import { BrowserWindow, dialog } from "electron";

export async function openFileDialog(appWin?: BrowserWindow | null) {
    if (!appWin) {
        return;
    }
    const {canceled, filePaths} = await dialog.showOpenDialog(appWin, {
        properties: ['openFile', 'openDirectory', 'multiSelections'],
    });
    console.log('filePaths', filePaths);

}