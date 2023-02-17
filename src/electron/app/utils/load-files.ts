import path from 'node:path';
import { readFileSync, statSync } from 'node:fs';
import { FileContent2 } from '../main-handlers';

export function loadFilesContent(filenames: string[]): FileContent2[] {
    const files: Partial<FileContent2>[] = [];
    const folders: string[] = [];

    (filenames || []).forEach((filename) => {
        try {
            const st = statSync(filename);
            if (st.isFile()) {
                files.push({
                    name: filename,
                });
            } else if (st.isDirectory()) {
                folders.push(filename);
            }
        } catch (error) {
            files.push({
                name: filename,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    });

    //TODO: load folders

    files.forEach((file) => {
        if (!file.failed) {
            try {
                file.cnt = readFileSync(file.name!).toString();
            } catch (error) {
                file.cnt = error instanceof Error ? error.message : JSON.stringify(error);
                file.failed = true;
            }
        }
    });

    return files as Required<FileContent2>[];
}
