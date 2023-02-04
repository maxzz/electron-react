import { contextBridge, ipcRenderer } from "electron";
//import { domReady, useLoading } from "./preload_/init";


console.log('ipcRenderer', ipcRenderer);
//console.log('process.env.DIST_ELECTRON', process.env.DIST_ELECTRON);

contextBridge.exposeInMainWorld('tmApi', {
    sendNotification: (message: string) => {
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

//import { useLoading } from './preload_/init';
//console.log('useLoading', useLoading);

// const ini = require('./preload_/init.js');
// console.log('useLoading', ini);

//console.log('import.meta.url', import.meta.url);

async function confirm(option: tmApi.DialogOptions | string): Promise<number> {
    // const res = await ipcRenderer.invoke('confirm', option)
    // if (res.response === 1) {
    //     throw {
    //         message: 'Dialog: Confirm Canceled',
    //         checkboxChecked: res.checkboxChecked,
    //     }
    // }
    const res = ipcRenderer.invoke('confirm', option);
    return res;
}
