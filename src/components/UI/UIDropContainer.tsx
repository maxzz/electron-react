import { HTMLAttributes, useRef } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { classNames } from "@/utils/classnames";

type UIDropContainerProps = {
    onDropped: (files: FileList) => void;
    accept?: string; // accept = '.png'
    activeAtom: PrimitiveAtom<boolean>;
};

export function UIDropContainer({ onDropped, accept, className, children, activeAtom, ...rest }: UIDropContainerProps & HTMLAttributes<HTMLLabelElement>) {
    const [dropActive, setDropActive] = useAtom(activeAtom);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <label
            className={classNames(`inline-block`, className)}

            onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
                !dropActive && setDropActive(true);
            }}

            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setDropActive(false);
                onDropped(event.dataTransfer.files);
            }}

            onDragEnter={(event) => setDropActive(true)}
            onDragLeave={(event) => setDropActive(false)}

            {...rest}
        >
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={accept}
                onChange={() => inputRef.current?.files && onDropped(inputRef.current?.files)}
            />
            {children}
        </label>
    );
}