import { app } from 'electron';
import { createWindow } from './app/main-window';
import { initHandlers } from './app/main-handlers';

console.log('main    __dirname', __dirname);

initHandlers();
app.whenReady().then(createWindow);
