import { loadFilesContent } from "@/utils/web-load-files";
import { atom, useSetAtom } from "jotai";

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

// main process APIs

function getPathes(files: File[]): string[] {
    const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
    return filenames;
}

export type DoDroppedFilesAtom = typeof doInvokeLoadFilesAtom;

// handle files drop

export const filesContentAtom = atom<FilesContent>({});

// load files with invoke

export const doInvokeLoadFilesAtom = atom(
    null,
    async (get, set, dropFiles: File[]) => {
        if (mainApi) {
            const filenames = getPathes(dropFiles);
            if (!filenames.length) { return; }
    
            const filesCnt = await mainApi?.invokeFilesContent(filenames);
            console.log('invoke files result', filesCnt);
            if (filesCnt) {
                set(filesContentAtom, filesCnt);
            }
        } else {
            const filesCnt = await loadFilesContent(dropFiles);
            if (filesCnt) {
                set(filesContentAtom, filesCnt);
            }
        }
    }
)
