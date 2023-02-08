import { atom, useSetAtom } from "jotai";

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

// main process APIs

function getPathes(files: File[]): string[] {
    const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
    return filenames;
}

export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;
export const doDroppedFilesAtom = atom(
    null,
    async (get, set, dropFiles: File[]) => {
        const filenames = getPathes(dropFiles);
        if (!filenames.length) { return; }
        try {
            console.log('files', dropFiles, filenames);
            mainApi?.openFiles(filenames);
        } catch (error) {
            console.log('files error', error, 'files', dropFiles);
        }
    }
);

mainApi?.gotFilesContent((event: any, content: FilesContent) => {
    console.log('content', content);
    
    const setFilesContent = useSetAtom(filesContentAtom);
    setFilesContent(content);
});

// handle files drop

export const filesContentAtom = atom<FilesContent>({});

// load files with invoke

export const doInvokeLoadFilesAtom = atom(
    null,
    async (get, set, dropFiles: File[]) => {
        const filenames = getPathes(dropFiles);
        if (!filenames.length) { return; }

        const filesCnt = await mainApi?.invokeFilesContent(filenames);
        console.log('invoke files result', filesCnt);

        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
)
