import React, { HTMLAttributes } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { filesContentAtom } from '@/store';

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
        <button className="px-2 py-1 text-green-900 bg-neutral-100/10 border-neutral-900/20 border rounded shadow-sm active:scale-[.97]" onClick={() => setFilesContent([])}>
            clear
        </button>
    );
}

function CardFilename({ path, failed, ...rest }: { path: string; failed?: boolean; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={`px-2 py-2 ${failed ? 'bg-red-600':'bg-neutral-900/20'}`} {...rest}>
            {path}
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

            {filesContent.map(({ name, cnt, failed }, idx) => (
                <div className="text-xs" key={name}>
                    <CardFilename path={name} failed={failed} />
                    <div className="flex bg-neutral-100/20">
                        <textarea className="w-full px-2 py-2 bg-neutral-100/20 smallscroll" rows={5} value={cnt} readOnly />
                    </div>
                </div>
            ))}
        </div>
    </>);
}
