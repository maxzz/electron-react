// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

type FileContent = {
    path: string;   // file full path
    cnt: string;    // file content or error message
}

type FilesContent = {
    files?: FileContent[];
    failed?: FileContent[];
}

type TmApi = {
    sendNotification: (message: string) => void;
    openFiles: (filenames: string[]) => void;
    gotFilesContent: (callback: (event: any, content: FilesContent) => void) => void;
    invokeFilesContent: (filenames: string[]) => Promise<FilesContent>;
}

declare var tmApi: TmApi;

// declare namespace tmApi {
//     function sendNotification(message: string): void;
// }
