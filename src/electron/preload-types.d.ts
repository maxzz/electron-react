// declare namespace tmApi {
//     function sendNotification(message: string): void;
// }
// vs.
// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

//import type { IpcRendererEvent } from "electron";

type FileContent = {
    name: string;                   // file name
    fullPath: string;               // file full path
    cnt: string;                    // file content or error message
    failed?: boolean;               // if failed the cnt member has error text

    entry?: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file?: File;                    // File object from async entry.file() call
}

type TmApi = {
    // sendNotification: (message: string) => void;
    // invokeFilesContent: (filenames: string[]) => Promise<FileContent[]>;

    // sendToMain: (data: any) => void;

    callMain: (data: any) => void;
    invokeMain: (data: any) => any;
    setCbCallFromMain: (callback: (event: /*IpcRendererEvent*/any, data: any) => void) => void;

    // setRendererCbToMain: (callback: (event: /*IpcRendererEvent*/any, data: unknown) => void) => void;
}

declare var tmApi: TmApi;
