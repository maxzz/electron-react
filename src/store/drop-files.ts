import { atom } from "jotai";
import { mainApi } from ".";
import { getElectronPathes, loadFilesContent } from "@/utils/web-load-files";

// handle files drop for web and electron environments

export const filesContentAtom = atom<FilesContent>({});

export type DoDroppedFilesAtom = typeof doInvokeLoadFilesAtom;
export const doInvokeLoadFilesAtom = atom(
    null,
    async (get, set, dropFiles: File[]) => {
        let filesCnt: FilesContent;
        if (mainApi) {
            const filenames = getElectronPathes(dropFiles);
            if (!filenames.length) { return; }

            filesCnt = await mainApi?.invokeFilesContent(filenames);
        } else {
            filesCnt = await loadFilesContent(dropFiles);
        }
        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
