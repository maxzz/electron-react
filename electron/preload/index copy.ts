//import { useLoading, domReady } from "./init";

import { join } from 'node:path';
const us = join(__dirname, '../preload/init.js');

const { useLoading, domReady } = require(us);

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
    ev.data.payload === 'removeLoading' && removeLoading();
};

setTimeout(removeLoading, 4999);

//
const { ipcRenderer } = require('electron');

window.sendNotification = (message) => {
    ipcRenderer.send('notify', message);
};