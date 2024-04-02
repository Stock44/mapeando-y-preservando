import {createContext, useContext} from 'react';
import {Map} from 'mapbox-gl'

const mapContext = createContext<Map | null>(null);

export const MapProvider = mapContext.Provider;

export function useMap() {
    const map = useContext(mapContext);

    if (!map) {
        throw new Error('this component must be used within a map');
    }

    return map;
}

