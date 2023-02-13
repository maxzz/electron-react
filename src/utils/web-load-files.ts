import { DropItem } from "./web-drop-utils";

function textFileReader(file: FileSystemEntry): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`File (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

export async function loadWebFilesContent(dropItems: DropItem[]): Promise<FileContent[]> {
    const res: FileContent[] = [];
    for (const item of dropItems) {
        const file = item.item;
        try {
            const cnt = await textFileReader(item.item);
            res.push({
                file: item.item,
                path: item.name,
                cnt,
            });
        } catch (error) {
            res.push({
                file: item.item,
                path: item.name,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    }
    return res;
}

export function getElectronPathes(files: File[]): string[] {
    const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
    return filenames;
}
