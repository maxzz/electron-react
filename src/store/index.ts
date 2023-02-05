import { atom } from "jotai";

// handle files drop

export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;
export const doDroppedFilesAtom = atom(
    null,
    async (get, set, files: FileList) => {
        if (!files.length) { return; }
        
        try {
            console.log('files', files);
        } catch (error) {
            console.log('files error', error);
        }
    }
);
