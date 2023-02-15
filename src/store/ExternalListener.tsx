import { atom, useAtom } from "jotai";
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

const locationAtom = atom<Location>({
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

    return (
        <div className="flex items-center space-x-4">
            <div className="text-sm">{location.latitude}</div>
            <div className="text-sm">{location.longitude}</div>
        </div>
    );
};
