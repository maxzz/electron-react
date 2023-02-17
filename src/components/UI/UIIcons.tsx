import { classNames } from "@/utils";
import { HTMLAttributes } from "react";

export function IconFile({ className, ...rest }: HTMLAttributes<SVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} viewBox="0 0 21 21" {...rest}>
            <g fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 15.5v-7l-5-5h-5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zm-10-5h5m-5 2h7m-7 2h3" />
                <path d="M11.5 3.5v3a2 2 0 0 0 2 2h3" />
            </g>
        </svg>
    );
}

export function IconFolderClosed({ className, ...rest }: HTMLAttributes<SVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} viewBox="0 0 21 21" {...rest}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 5.5v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-1.85-2H10.5l-2-2h-4a1 1 0 0 0-1 1zm0 1h7" />
        </svg>
    );
}

export function IconFolderOpen({ className, ...rest }: HTMLAttributes<SVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} viewBox="0 0 21 21" {...rest}>
            <g strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 8.5a2 2 0 0 0-2-2h-5l-2-2h-4a1 1 0 0 0-1 1v3" />
                <path d="M2.81 9.74 4.12 15a2 2 0 0 0 1.94 1.51h8.88A2 2 0 0 0 16.88 15l1.31-5.25a1 1 0 0 0-.97-1.24H3.78a1 1 0 0 0-.97 1.24z" />
            </g>
        </svg>
    );
}
