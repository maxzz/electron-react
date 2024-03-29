import { HTMLAttributes } from 'react';
import { IconFile, IconFolderClosed } from "@/components/ui/icons";
import { M4RInvoke } from '@/electron/app/ipc-main';
import { Textarea, fixTextareaResizeClasses } from '@/components/ui/shadcn';

function CardTitle({ fileContent: { name, fullPath, failed, notOur }, ...rest }: { fileContent: M4RInvoke.FileContent; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={`px-2 py-2 ${notOur ? 'bg-accent' : failed ? 'bg-red-600' : 'bg-accent'} text-muted-foreground row-span-2 grid-rows-subgrid grid gap-2`} {...rest}>
            <div className="flex items-center space-x-1">
                <IconFile className="size-5 flex-none" />

                <div className="text-xs font-semibold">
                    {name}
                </div>
            </div>

            <div className="ml-5 flex items-start space-x-1">
                <IconFolderClosed className="size-4 flex-none" />

                <div className="pt-0.5 text-[.5rem] leading-[.75rem]">
                    {fullPath}
                </div>
            </div>
        </div>
    );
}

function CardBody({ fileContent: { cnt, notOur } }: { fileContent: M4RInvoke.FileContent; }) {
    return (
        <div className="flex">
            <Textarea
                className={`w-full px-2 py-1 text-[.5rem] bg-background border-none outline-none focus-visible:ring-0 rounded-none cursor-default ${fixTextareaResizeClasses}`}
                value={notOur ? 'Not our file' : cnt}
                rows={5}
                readOnly
            />
        </div>
    );
}

export function Card({ fileContent }: { fileContent: M4RInvoke.FileContent; }) {
    return (
        <div className="ring-muted-foreground border rounded focus-within:ring-1 focus-within:shadow overflow-hidden grid grid-rows-[auto,1fr]">
            <CardTitle fileContent={fileContent} />
            <CardBody fileContent={fileContent} />
        </div>
    );
}
