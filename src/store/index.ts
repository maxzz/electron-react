import { FileContent2 } from '@/electron/app/main-handlers';
import { InvokeParamsLoadFiles, ToMainCalls } from '@/electron/main-from-renderer';
import { worldStore } from './WorldToReactListener';

export * from './dropFiles';

// main process APIs

var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function hasMain(): boolean {
    return !!mainApi;
}

// call

export function sendToMain(data: ToMainCalls): void {
    mainApi?.callMain(data);
}

// Subscribe to main process calls

mainApi?.setCbCallFromMain((_event: unknown, data: unknown) => worldStore.update(data));

// invoke

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
