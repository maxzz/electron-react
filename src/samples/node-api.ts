import { ipcRenderer } from 'electron';
import { lstat } from 'node:fs/promises';
import { cwd } from 'node:process';

ipcRenderer.on('main-process-message', (_event, ...args) => {
    console.log('tm:[Receive Main-process message]:', ...args);
});

lstat(cwd())
    .then(stats => {
        console.log('tm:[fs.lstat] on cwd()', stats);
    })
    .catch(err => {
        console.error(err);
    });
