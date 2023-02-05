import { atom } from "jotai";

// handle files drop

export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;
export const doDroppedFilesAtom = atom(
    null,
    async (get, set, files: FileList) => {
        const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
        if (!filenames.length) { return; }
        try {
            console.log('files', files, filenames);
        } catch (error) {
            console.log('files error', error, 'files', files);
        }
    }
);
