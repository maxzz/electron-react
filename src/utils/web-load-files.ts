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

export async function loadFilesContent(files: File[]): Promise<FileContent[]> {
    const res: FileContent[] = [];
    for (const file of files) {
        try {
            const cnt = await textFileReader(file);
            res.push({
                file,
                path: file.name,
                cnt,
            });
        } catch (error) {
            res.push({
                file,
                path: file.name,
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
