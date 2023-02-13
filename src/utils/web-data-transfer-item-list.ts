export type DropItem = {
    name: string;
    fullPath: string;
    isDir?: boolean;
    entry: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file: File;                    // File object from async entry.file() call
};

// Adapted from https://stackoverflow.com/a/53058574
// Adapted from https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/utils/directoryReader.ts
// Adapted from https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/composables/useUpload.ts

async function readEntriesPromise(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    return await new Promise((resolve, reject): void => {
        directoryReader.readEntries(resolve, reject);
    });
}

async function readAllDirectoryEntries(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    const entries: FileSystemEntry[] = [];
    let readEntries = await readEntriesPromise(directoryReader);

    while (readEntries.length > 0) {
        entries.push(...readEntries);
        readEntries = await readEntriesPromise(directoryReader);
    }

    return entries;
}

export async function getAllFileEntries(dataTransferItemList: DataTransferItemList): Promise<FileSystemFileEntry[]> {
    const fileEntries: FileSystemFileEntry[] = [];
    const queue: FileSystemEntry[] = [];

    for (let i = 0, length = dataTransferItemList.length; i < length; i++) {
        const item = dataTransferItemList[i];
        const entry = item.webkitGetAsEntry();
        entry ? queue.push(entry) : console.error('no entry for item', item);
    }

    while (queue.length > 0) {
        const entry = queue.shift();
        if (entry) {
            if (entry.isFile) {
                fileEntries.push(entry as FileSystemFileEntry);
            } else if (entry.isDirectory) {
                queue.push(...await readAllDirectoryEntries((entry as FileSystemDirectoryEntry).createReader()));
            }
        }
    }

    return fileEntries;
}

export async function fileEntryToFile(entry: FileSystemFileEntry) {
    return new Promise<File>((resolve, reject) => entry.file(resolve, reject));
}
