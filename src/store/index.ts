import { atom, useSetAtom } from "jotai";

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

// main process APIs

export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;
export const doDroppedFilesAtom = atom(
    null,
    async (get, set, files: File[]) => {
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
    const setFilesContent = useSetAtom(filesContentAtom);
    setFilesContent(content);
});

// handle files drop

export const filesContentAtom = atom<FilesContent>({});

