import React, { HTMLAttributes, useState } from 'react';
import { useAtomValue } from 'jotai';
import { filesContentAtom } from '@/store';

function SectionHeader({ children }: HTMLAttributes<HTMLElement>) {
    return (
        <div className="px-2 py-2 border-slate-900/20 border-b">
            {children}
        </div>
    );
}

export function FileDisplay() {
    const filesContent = useAtomValue(filesContentAtom);
    return (<>
        <div className="border-slate-900/20 border rounded">
            <SectionHeader>Loaded content: {!filesContent.files?.length && ' Drop It Here'}</SectionHeader>

            {filesContent.files?.map(({ path, cnt }, idx) => (
                <div className="text-xs" key={path}>
                    <div className="px-2 py-2 bg-slate-900/20">{path}</div>
                    <textarea className="w-full px-2 py-2 bg-slate-100/20 smallscroll" rows={5} value={cnt} readOnly />
                </div>
            ))}
        </div>

        {!!filesContent.failed?.length && (
            <div className="border-slate-900/20 border rounded">
                <SectionHeader>Failed to Load:</SectionHeader>

                {filesContent.failed?.map(({ path, cnt }, idx) => (
                    <div className="text-xs" key={path}>
                        <div className="px-2 py-2 bg-slate-900/20">{path}</div>
                        <textarea className="w-full px-2 py-2 bg-slate-100/20 smallscroll" rows={5} value={cnt} readOnly />
                    </div>
                ))}
            </div>
        )}
    </>);
}

// TODO: clear list
