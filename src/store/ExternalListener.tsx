import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export const store = {
    latitude: 0,
    longitude: 0,
    listeners: new Set<Function>(),

    update(nextLatitude: number, nextLongitude: number) {
        store.latitude = nextLatitude;
        store.longitude = nextLongitude;
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

export const ExternalListener = () => {
    const [location, setLocation] = useAtom(locationAtom);

    useEffect(
        () => {
            function callback() {
                setLocation({
                    latitude: store.latitude,
                    longitude: store.longitude,
                });
            }

            store.listeners.add(callback);
            callback();

            return () => {
                store.listeners.delete(callback);
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
