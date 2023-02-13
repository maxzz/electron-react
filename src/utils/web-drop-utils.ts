import { DropItem, fileEntryToFile, getAllFileEntries } from "./web-data-transfer-item-list";

export async function getFilesFromList(dataTransferItemList: DataTransferItemList): Promise<DropItem[]> {
    const entries = await getAllFileEntries(dataTransferItemList);
    let rv: DropItem[] = [];
    try {
        rv = await Promise.all(entries.map(async (entry) => ({
            name: entry.name,
            fullPath: entry.fullPath,
            isDir: entry.isDirectory,
            entry,
            file: await fileEntryToFile(entry),
        })));
    } catch (error) {
        console.error('cannot read from dataTransferItemList', dataTransferItemList);
    }
    return rv;
}
