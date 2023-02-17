export namespace M4R {
    type DoLoadfiles = {
        type: 'load-files';
        filenames: string[];
    };
    
    type DoLoadfiles2 = {
        type: 'load-files2';
        filenames: string[];
    };
    
    type DoLoadfiles3 = {
        type: 'load-files3';
        filenames: string[];
    };
    
    export type InvokeCalls = DoLoadfiles | DoLoadfiles2/* | DoLoadfiles3*/;

    export type FileContent2 = {
        name: string;                   // file name
        fullPath: string;               // file full path
        cnt: string;                    // file content or error message
        failed?: boolean;               // if failed the cnt member has error text
    
        entry?: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
        file?: File;                    // File object from async entry.file() call
    };
}
