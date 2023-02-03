const { ipcRenderer } = require('electron');

console.log('ipcRenderer', ipcRenderer);

window.sendNotification = (message) => {
    ipcRenderer.send('notify', message);
};