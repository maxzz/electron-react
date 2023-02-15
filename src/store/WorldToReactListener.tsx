import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { mainApi } from ".";
import { doFromMainAtom } from "./doFromMain";

export const worldStore = {
    listeners: new Set<(data: any) => void>(),
    update(data?: any) {
        data && this.listeners.forEach((listener) => listener(data));
    }
};

export const WorldToReactListener = () => {
    const setLocation = useSetAtom(doFromMainAtom);

    useEffect(
        () => {
            function callback(data?: any) {
                data && setLocation(data);
            }

            worldStore.listeners.add(callback);
            callback();

            return () => {
                worldStore.listeners.delete(callback);
            };
        },
        [setLocation]
    );

    return null;
};

// Subscribe to main process calls

function fromMainCallback(event: any, data: unknown) {
    worldStore.update(data);
}

mainApi?.menuCommand(fromMainCallback);
