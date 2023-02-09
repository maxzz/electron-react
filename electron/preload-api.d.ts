// declare namespace tmApi {
//     function sendNotification(message: string): void;
// }
// vs.
// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

type FileContent = {
    path: string;   // file full path
    cnt: string;    // file content or error message
    file?: File;    // file handle exist when loaded from web drag and drop
}

type FilesContent = {
    files?: FileContent[];
    failed?: FileContent[];
}

type TmApi = {
    sendNotification: (message: string) => void;
    invokeFilesContent: (filenames: string[]) => Promise<FilesContent>;
}

declare var tmApi: TmApi;
