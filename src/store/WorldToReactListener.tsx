import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { mainApi } from ".";
import { RendererCalls } from '../../electron/main-to-renderer';

export const worldStore = {
    listeners: new Set<(data: any) => void>(),
    update(data?: any) {
        data && this.listeners.forEach((listener) => listener(data));
    }
};

const doFromMainAtom = atom(
    null,
    (get, set, data: any) => {
        const d = data as RendererCalls;
        switch (d.type) {
            case 'dark-mode': {
                console.log('case dark-mode, active', d.active);
                break;
            }
            case 'reload-files': {
                console.log('reload-files');
                break;
            }
            default: {
                console.log('content', data);
            }
        }
    }
);

function fromMainCallback(event: any, data: unknown) {
    worldStore.update(data);
}

mainApi?.menuCommand(fromMainCallback);

type Location = {
    latitude: number;
    longitude: number;
};

export const locationAtom = atom<Location>({
    latitude: 0,
    longitude: 0,
});

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
