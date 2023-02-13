import { atom } from "jotai";
import { mainApi } from ".";
import { getElectronPathes, loadWebFilesContent } from "@/utils/web-load-files";
import { DropItem, getFilesFromList } from "@/utils/web-drop-utils";

// handle files drop for web and electron environments

export const filesContentAtom = atom<FileContent[]>([]);

export type DoDroppedFilesAtom = typeof doInvokeLoadFilesAtom;

export const doInvokeLoadFilesAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: FileContent[];

        if (mainApi) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = getElectronPathes(dropFiles);
            if (!filenames.length) { return; }

            filesCnt = await mainApi?.invokeFilesContent(filenames);
        } else {
            const items: DropItem[] = await getFilesFromList(dataTransfer.items);



            const fileEntryToFile = async (entry: FileSystemEntry) => new Promise<File>(resolve => entry.file(resolve));

            const files = await Promise.all(items.map(async (entry) => await fileEntryToFile(entry.item)));
            
            console.log('handles', files);


            console.log('items arr', items);

            //filesCnt = await loadWebFilesContent(items);
        }

        // if (filesCnt) {
        //     set(filesContentAtom, filesCnt);
        // }
    }
);
