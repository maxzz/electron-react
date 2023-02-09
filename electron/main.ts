import { app } from 'electron';
import { createWindow } from './app/main-window';
import { connectHandlers } from './app/main-handlers';

console.log('main    __dirname', __dirname);

connectHandlers();

app.whenReady().then(createWindow);
