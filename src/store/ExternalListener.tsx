import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const store = {
    latitude: 0,
    longitude: 0,
    listeners: new Set<Function>(),

    update: (nextLatitude: number, nextLongitude: number) => {
        store.latitude = nextLatitude;
        store.longitude = nextLongitude;
        listeners.forEach((listener) => listener());
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

const Component = () => {
    const [location, setLocation] = useAtom(locationAtom);

    useEffect(
        () => {
            const callback = () => {
                setLocation({
                    latitude: store.latitude,
                    longitude: store.longitude,
                });
            };
            
            store.listners.add(callback);
            callback();

            return () => {
                store.listeners.delete(callback)
            };
        },
        [setLocation]
    );

    return (
        <>{location.latitude} {location.longitude}</>
    );
};
