import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { mainApi } from ".";
import { RendererCalls } from '../../electron/main-to-renderer';

export const worldStore = {
    latitude: 0,
    longitude: 0,
    listeners: new Set<Function>(),

    update(nextLatitude: number, nextLongitude: number) {
        worldStore.latitude = nextLatitude;
        worldStore.longitude = nextLongitude;
        this.listeners.forEach((listener) => listener());
    },
};

let num = 5;

function fromMainCallback(event: any, data: unknown) {
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
    worldStore.update(num++, num + 5);
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
    const [location, setLocation] = useAtom(locationAtom);

    useEffect(
        () => {
            function callback() {
                setLocation({
                    latitude: worldStore.latitude,
                    longitude: worldStore.longitude,
                });
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
