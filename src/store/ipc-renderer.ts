import { ToMainCalls } from "@/electron/main-from-renderer";
import { M4R } from "@/electron/app/ipc-main";
import { worldStore } from "./WorldToReactListener";

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

export function invokeLoadFiles(filenames: string[]): Promise<M4R.FileContent2[]> {
    const d: M4R.InvokeCalls = {
        type: 'load-files',
        filenames,
    }
    return mainApi?.invokeMain(d) as Promise<M4R.FileContent2[]>;
}
