import { ToMainCalls } from '@/electron/main-from-renderer';

export * from './dropFiles';

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function sendToMain(data: ToMainCalls) {
    mainApi?.sendToMain(data);
}
