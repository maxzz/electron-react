//import { DarkMode, NotifyMessage } from './main-handlers-types';
//import { mainApi } from '../../src/store/index';
//export * from './main-handlers-types';

export type ToMainCalls = NotifyMessage | DarkMode;

export type InvokeParamsLoadFiles = {
    type: 'load-files',
    filenames: string[];
}

export type InvokeCalls = InvokeParamsLoadFiles;
