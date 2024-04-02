import type Building from '@/lib/building';
import {omit} from 'next/dist/shared/lib/router/utils/omit';
import {type FeatureCollection} from "geojson";


export default function buildingsAsGeoJSON(buildings: Building[]) {
    return ({
        type: 'FeatureCollection' as const,
        features: buildings.filter(building => building.coordinates).map(building => ({
            type: 'Feature' as const,
            geometry: {
                type: 'Point' as const,
                coordinates: [building.coordinates!.lon, building.coordinates!.lat],
            },
            properties: {
                ...omit(building, ['coordinates'])
            },
        }))
    });
}

export type BuildingFeatureCollection = ReturnType<typeof buildingsAsGeoJSON>
