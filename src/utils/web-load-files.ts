import { DropItem } from "./web-drop-utils";

function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`File (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

export async function webLoadFilesContent(dropItems: DropItem[]): Promise<FileContent[]> {
    const res: FileContent[] = [];
    for (const item of dropItems) {
        try {
            if (!item.entry || !item.file) {
                throw new Error('Empty entry or file');
            }
            const cnt = await textFileReader(item.file);
            res.push({
                entry: item.entry,
                file: item.file,
                name: item.name,
                fullPath: item.fullPath,
                cnt,
            });
        } catch (error) {
            res.push({
                entry: item.entry,
                file: item.file,
                name: item.name,
                fullPath: item.fullPath,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    }
    return res;
}

export function electronGetPathes(files: File[]): string[] {
    const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
    return filenames;
}
