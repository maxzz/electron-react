import { basename, join, normalize } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { M4RInvoke } from '../ipc-main';

function collect(filenames: string[], rv: Partial<M4RInvoke.FileContent>[]) {
    (filenames || []).forEach((filename) => {
        filename = normalize(filename);
        try {
            const st = statSync(filename);
            if (st.isFile()) {
                rv.push({
                    name: basename(filename),
                    fullPath: filename,
                });
            } else if (st.isDirectory()) {
                const entries = readdirSync(filename).map((entry) => join(filename, entry));
                collect(entries, rv);
            }
        } catch (error) {
            rv.push({
                name: basename(filename),
                fullPath: filename,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    });
}

export function loadFilesContent(filenames: string[]): M4RInvoke.FileContent[] {
    const files: Partial<M4RInvoke.FileContent>[] = [];
    collect(filenames, files);

    files.forEach((file) => {
        if (!file.failed) {
            try {
                file.cnt = readFileSync(file.fullPath!).toString();
            } catch (error) {
                file.cnt = error instanceof Error ? error.message : JSON.stringify(error);
                file.failed = true;
            }
        }
    });

    return files as Required<M4RInvoke.FileContent>[];
}
