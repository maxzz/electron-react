import { FileContent2 } from '@/electron/app/main-handlers';
import { InvokeParamsLoadFiles, ToMainCalls } from '@/electron/main-from-renderer';

export * from './dropFiles';

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function hasMain(): boolean {
    return !!mainApi;
}

export function sendToMain(data: ToMainCalls): void {
    mainApi?.callMain(data);
}

export function invokeMain(data: any): void {
    return mainApi?.invokeMain(data);
}

export function invokeLoadFiles(filenames: string[]): Promise<FileContent2[]> {
    const d: InvokeParamsLoadFiles = {
        type: 'load-files',
        filenames,
    }
    return mainApi?.invokeMain(d) as Promise<FileContent2[]>;
}
