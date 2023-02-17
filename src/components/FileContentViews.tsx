import { HTMLAttributes } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { filesContentAtom } from '@/store';
import { IconFile, IconFolderClosed, IconFolderOpen } from './UI/UIIcons';

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

function CardFilename({ path, fullPath, failed, ...rest }: { path: string; fullPath: string; failed?: boolean; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={`px-2 py-2 ${failed ? 'bg-red-600' : 'bg-neutral-900/20'}`} {...rest}>
            <div className="flex items-center space-x-1">
                <IconFile className="w-5 h-5" />
                <div className="">{path}</div>
            </div>
            <div className="flex items-center space-x-1">
                <IconFolderClosed className="w-5 h-5" />
                {/* <IconFolderOpen className="w-5 h-5" /> */}
                <div className="text-[.55rem]">{fullPath}</div>
            </div>
            <div className="w-24 h-24 border-gray-900 border" style={{backgroundImage: `linear-gradient(135deg, 
                transparent 50%, 50%, #2a7137 54%, 54%, 
                transparent 54%, 54%, #42bc58 58%, 58%, 

                transparent 66%, 66%, #2a7137 70%, 70%, 
                transparent 70%, 70%, #42bc58 74%, 74%, 

                transparent 83%, 83%, #2a7137 87%, 87%,
                transparent 87%, 87%, #42bc58 91%, 91%, 
                transparent)`}}></div>
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

            {filesContent.map(({ name, fullPath, cnt, failed }, idx) => (
                <div className="text-xs" key={name}>
                    <CardFilename path={name} fullPath={fullPath} failed={failed} />
                    <div className="flex bg-neutral-100/20">
                        <textarea className="w-full px-2 py-2 bg-neutral-100/20 smallscroll" rows={5} value={cnt} readOnly />
                    </div>
                </div>
            ))}
        </div>
    </>);
}
