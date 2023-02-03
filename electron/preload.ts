import { contextBridge, ipcRenderer } from "electron";
import { domReady, useLoading } from "./preload_/init";


console.log('ipcRenderer', ipcRenderer);

contextBridge.exposeInMainWorld('tmApi', {
    sendNotification: (message) => {
        ipcRenderer.send('notify', message);
    },
    confirm,
});

//const { appendLoading, removeLoading } = useLoading();
// domReady().then(appendLoading);

// window.onmessage = (ev) => {
//     ev.data.payload === 'removeLoading' && removeLoading();
// };

// setTimeout(removeLoading, 4999);

export async function confirm(option: tmApi.DialogOptions | string): Promise<void> {
    const res = await ipcRenderer.invoke('confirm', option)
    if (res.response === 1) {
        throw {
            message        : 'Dialog: Confirm Canceled',
            checkboxChecked: res.checkboxChecked,
        }
    }
}
