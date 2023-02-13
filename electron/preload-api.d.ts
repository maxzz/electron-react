// declare namespace tmApi {
//     function sendNotification(message: string): void;
// }
// vs.
// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

type FileContent = {
    path: string;           // file full path
    cnt: string;            // file content or error message
    file?: FileSystemEntry; // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    failed?: boolean;       // if failed the cnt member has error text
}

type TmApi = {
    sendNotification: (message: string) => void;
    invokeFilesContent: (filenames: string[]) => Promise<FileContent[]>;
}

declare var tmApi: TmApi;
