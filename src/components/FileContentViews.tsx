import React, { HTMLAttributes } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { filesContentAtom } from '@/store';

function SectionHeader({ children, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className="px-2 py-2 border-slate-900/20 border-b" {...rest}>
            {children}
        </div>
    );
}

function ButtonClear() {
    const setFilesContent = useSetAtom(filesContentAtom);
    return (
        <button className="px-2 py-1 border-slate-900/20 border rounded shadow active:scale-[.97]" onClick={() => setFilesContent([])}>
            clear
        </button>
    );
}

function CardFilename({ path, ...rest }: { path: string; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className="px-2 py-2 bg-slate-900/20" {...rest}>
            {path}
        </div>
    );
}

export function FileContentViews() {
    const filesContent = useAtomValue(filesContentAtom);
    return (<>
        <div className="border-slate-900/20 border rounded">
            <SectionHeader>
                <div className="flex items-center justify-between">
                    <div className="">Loaded content: {!filesContent.length && ' Drop It Here'}</div>
                    <ButtonClear />
                </div>
            </SectionHeader>

            {filesContent.map(({ path, cnt }, idx) => (
                <div className="text-xs" key={path}>
                    <CardFilename path={path} />
                    <textarea className="w-full px-2 py-2 bg-slate-100/20 smallscroll" rows={5} value={cnt} readOnly />
                </div>
            ))}
        </div>
    </>);
}

// TODO: clear list
