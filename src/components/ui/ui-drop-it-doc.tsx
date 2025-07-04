import { useEffect, useRef, useState } from "react";
import { atom, PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { DoDroppedFilesAtom } from "@/store";

export function DropItDoc({ doDroppedFilesAtom }: { doDroppedFilesAtom: DoDroppedFilesAtom; }) {
    const [activeAtom] = useState(atom(false));
    const active = useAtomValue(activeAtom);
    useDragHandlers({ doSetFilesFromDropAtom: doDroppedFilesAtom, activeAtom, });
    return (<>
        {active && <div className={`fixed inset-0 grid place-items-center text-5xl font-bold text-slate-50 bg-slate-800/90 z-10`}>
            Drop it!
        </div>}
    </>);
}

export function useDragHandlers({ doSetFilesFromDropAtom, activeAtom }: DragHandlersProps) {
    const droppedFiles = useSetAtom(doSetFilesFromDropAtom);
    const setDropActive = useSetAtom(activeAtom);
    const activeListenersRef = useRef(0);

    useEffect(
        () => {
            function onDragEnter() {
                if (!activeListenersRef.current++) {
                    setDropActive(true);
                }
            }

            function onDragOver(event: DragEvent) {
                event.preventDefault();
            }

            function onDragLeave() {
                if (!--activeListenersRef.current) {
                    setDropActive(false);
                }
            }

            function onDrop(event: DragEvent) {
                event.preventDefault();
                activeListenersRef.current = 0;
                setDropActive(false);
                event.dataTransfer && droppedFiles(event.dataTransfer);
            }

            const controller = new AbortController();
            const signal = { signal: controller.signal };

            const a = document.addEventListener;
            a('dragenter', onDragEnter, signal);
            a('dragover', onDragOver, signal);
            a('dragleave', onDragLeave, signal);
            a('drop', onDrop, signal);

            return () => {
                controller.abort();
            };
        }, []
    );
}

export type DragHandlersProps = {
    doSetFilesFromDropAtom: DoDroppedFilesAtom;
    activeAtom: PrimitiveAtom<boolean>;
};
