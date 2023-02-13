import { atom } from "jotai";
import { mainApi } from ".";
import { getElectronPathes, loadWebFilesContent } from "@/utils/web-load-files";

// handle files drop for web and electron environments

export const filesContentAtom = atom<FileContent[]>([]);

export type DoDroppedFilesAtom = typeof doInvokeLoadFilesAtom;

export const doInvokeLoadFilesAtom = atom(
    null,
    async (get, set, dropFiles: File[]) => {
        let filesCnt: FileContent[];

        if (mainApi) {
            const filenames = getElectronPathes(dropFiles);
            if (!filenames.length) { return; }

            filesCnt = await mainApi?.invokeFilesContent(filenames);
        } else {
            filesCnt = await loadWebFilesContent(dropFiles);
        }
        
        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
