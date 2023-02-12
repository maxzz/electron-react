import path from 'node:path';
import { readFileSync, statSync } from 'node:fs';

export function loadFilesContent(filenames: string[]): FileContent[] {
    console.log('node filenames to load', filenames);

    const files: Partial<FileContent>[] = [];
    const folders: string[] = [];

    (filenames || []).forEach((filename) => {
        try {
            const st = statSync(filename);
            if (st.isFile()) {
                files.push({
                    path: filename,
                });
            } else if (st.isDirectory()) {
                folders.push(filename);
            }
        } catch (error) {
            files.push({
                failed: true,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                path: filename,
            });
        }
    });

    files.forEach((file) => {
        if (!file.failed) {
            try {
                file.cnt = readFileSync(file.path).toString();
            } catch (error) {
                file.cnt = error instanceof Error ? error.message : JSON.stringify(error);
                file.failed = true;
            }
        }
    });

    return files as Required<FileContent>[];
}
