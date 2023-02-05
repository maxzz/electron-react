import { HTMLAttributes, useState, useRef } from "react";

type UIDropContainerProps = {
    onDropped: (files: FileList) => void;
    accept?: string; // accept = '.png'
    //activeAtom: PrimitiveAtom<boolean>;
};

export function UiDropContainer({ onDropped, accept, className, children, ...rest }: UIDropContainerProps & HTMLAttributes<HTMLLabelElement>) {
    //const [dropActive, setDropActive] = useAtom(activeAtom);
    const [dropActive, setDropActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <label
            className={`inline-block`}

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
