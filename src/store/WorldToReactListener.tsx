import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

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
