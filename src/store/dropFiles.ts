import { atom } from "jotai";
import { hasMain, invokeLoadFiles } from ".";
import { electronGetPathes, webLoadDataTransferContent } from "@/utils";
import { M4RInvoke } from "@/electron/app/ipc-main";

export const filesContentAtom = atom<M4RInvoke.FileContent[]>([]);

// handle files drop for web and electron environments

export const doDroppedFilesAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: M4RInvoke.FileContent[];

        const allowedExt = ['dpm', 'dpn'];

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPathes(dropFiles);
            if (!filenames.length) {
                return;
            }
            filesCnt = await invokeLoadFiles(filenames, allowedExt);
        } else {
            filesCnt = await webLoadDataTransferContent(dataTransfer.items, allowedExt);
        }

        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;
