import { HTMLAttributes } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { filesContentAtom } from '@/store';
import { IconFile, IconFolderClosed, IconFolderOpen } from './UI/UIIcons';
import { M4RInvoke } from '@/electron/app/ipc-main';

function SectionHeader({ children, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className="px-2 py-2 border-neutral-900/20 border-b shadow" {...rest}>
            {children}
        </div>
    );
}

function ButtonClear() {
    const setFilesContent = useSetAtom(filesContentAtom);
    return (
        <button
            className="px-2 py-1 text-green-900 bg-neutral-100/10 border-neutral-900/20 border rounded shadow-sm active:scale-[.97]"
            onClick={() => setFilesContent([])}
        >
            clear
        </button>
    );
}

function CardTitle({ fileContent: { name, fullPath, failed, notOur }, ...rest }: { fileContent: M4RInvoke.FileContent; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={`px-2 py-2 ${notOur ? 'bg-violet-600 text-violet-100' : failed ? 'bg-red-600' : 'bg-neutral-900/20'}`} {...rest}>
            <div className="flex items-center space-x-1">
                <IconFile className="w-5 h-5 flex-none" />
                <div className="text-xs font-semibold">{name}</div>
            </div>
            <div className="flex items-center space-x-1">
                <IconFolderClosed className="w-5 h-3 flex-none" />
                {/* <IconFolderOpen className="w-5 h-5" /> */}
                <div className="text-[.5rem]">{fullPath}</div>
            </div>
        </div>
    );
}

function CardBody({ fileContent: { cnt, notOur } }: { fileContent: M4RInvoke.FileContent; }) {
    return (
        <div className="flex bg-neutral-100/20">
            <textarea
                className="w-full px-2 py-1 text-[.5rem] bg-neutral-100/20 outline-none cursor-default smallscroll"
                rows={5} value={notOur ? 'Not our file' : cnt} readOnly
            />
        </div>
    );
}

function Card({ fileContent }: { fileContent: M4RInvoke.FileContent; }) {
    return (
        <div className="border-neutral-900/20 border rounded shadow overflow-hidden grid grid-rows-2">
            <CardTitle fileContent={fileContent} />
            <CardBody fileContent={fileContent} />
        </div>

    );
}

export function FileContentViews() {
    const filesContent = useAtomValue(filesContentAtom);
    return (<>
        <div className="border-neutral-900/20 border rounded shadow-sm">
            <SectionHeader>
                <div className="flex items-center justify-between">
                    <div className="">Loaded content: {!filesContent.length && ' Drop It Here'}</div>
                    {!!filesContent.length && <ButtonClear />}
                </div>
            </SectionHeader>

            <div className="p-2 grid gap-2 grid-cols-[repeat(auto-fill,minmax(20ch,1fr))]">
                {filesContent.map((fileContent, idx) => (
                    <Card fileContent={fileContent} key={`${idx}=${fileContent.name}`} />
                ))}
            </div>
        </div>
    </>);
}
