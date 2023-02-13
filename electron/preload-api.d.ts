// declare namespace tmApi {
//     function sendNotification(message: string): void;
// }
// vs.
// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

type FileContent = {
    name: string;                   // file name
    fullPath: string;               // file full path
    cnt: string;                    // file content or error message
    entry?: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file?: File;                    // File object from async entry.file() call
    failed?: boolean;               // if failed the cnt member has error text
}

type TmApi = {
    sendNotification: (message: string) => void;
    invokeFilesContent: (filenames: string[]) => Promise<FileContent[]>;
}

declare var tmApi: TmApi;
