import { atom } from "jotai";

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

// handle files drop

export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;
export const doDroppedFilesAtom = atom(
    null,
    async (get, set, files: FileList) => {
        mainApi?.openFiles([]);

        const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
        if (!filenames.length) { return; }
        try {
            console.log('files', files, filenames);
            mainApi?.openFiles(filenames);
        } catch (error) {
            console.log('files error', error, 'files', files);
        }
    }
);

mainApi?.gotFilesContent((event: any, content: FilesContent) => {
    console.log('content', content);
});
