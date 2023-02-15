import { atom } from "jotai";
import { mainApi } from ".";
import { DropItem, electronGetPathes, webGetFilesTransferItems, webLoadFilesContent } from "@/utils";

// handle files drop for web and electron environments

export const filesContentAtom = atom<FileContent[]>([]);

export type DoDroppedFilesAtom = typeof doInvokeLoadFilesAtom;

export const doInvokeLoadFilesAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: FileContent[];

        if (mainApi) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPathes(dropFiles);
            if (!filenames.length) { return; }

            filesCnt = await mainApi?.invokeFilesContent(filenames);
        } else {
            const items: DropItem[] = await webGetFilesTransferItems(dataTransfer.items);
            filesCnt = await webLoadFilesContent(items);
        }

        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);

//TODO: drop zone 100% of document not view port
//TODO: filter files by valid types
//TODO: show errors in UI
