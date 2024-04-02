'use client';

import {useMap} from "@/lib/map-context";
import {useCallback, useEffect, useId, useMemo} from "react";
import RoundLocationCityBlack from '../../public/round_location_city_black_24dp_2x.png'
import {BuildingFeatureCollection} from "@/lib/get-all-buildings-geojson";
import {MapMouseEvent, Popup} from "mapbox-gl";
import {Feature, Point} from "geojson";
import Building from "@/lib/building";
import {useRouter} from "next/navigation";

export type BuildingsLayerProps = {
    readonly name: string;
    readonly buildings: BuildingFeatureCollection;
    readonly onBuildingOpened?: () => void;
}

export default function BuildingsLayer(props: BuildingsLayerProps) {
    const {buildings, onBuildingOpened} = props;
    const map = useMap();
    const id = useId();

    const router = useRouter();

    const popup = useMemo(() => new Popup({
        closeButton: false,
        closeOnClick: false,
    }), []);

    const onMapHover = useCallback((event: MapMouseEvent & { features?: Feature[] }) => {
        map.getCanvas().style.cursor = 'pointer';

        const features = event.features!;
        const geometry = features[0].geometry as Point;
        const properties = features[0].properties as Omit<Building, 'coordinates'>;

        const coordinates = geometry.coordinates.slice() as [number, number];
        const name = properties.name;

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(`<strong>${name}</strong>`).addTo(map);

    }, [map, popup])

    const onMapLeave = useCallback(() => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    }, [map, popup])

    const onMapClick = useCallback((event: MapMouseEvent & { features?: Feature[] }) => {
        const building = event.features![0].properties as Omit<Building, 'coordinates'>;
        map.flyTo({
            center: event.lngLat,
        });
        router.push(`/buildings/${building.id}`);
        if (onBuildingOpened) {
            onBuildingOpened();
        }
    }, [map, onBuildingOpened, router])


    useEffect(() => {
        map.addSource(`${id}-building-source`, {
            type: 'geojson',
            data: buildings,
        })

        let loadedImage = false;
        let loadImage = true;

        map.loadImage(RoundLocationCityBlack.src, (error, image) => {
            if (!loadImage || error || !image) {
                return;
            }

            map.addImage(`${id}-building-icon`, image, {sdf: true});
            map.addLayer({
                id: `${id}-building-layer`,
                source: `${id}-building-source`,
                type: 'symbol',
                interactive: true,
                layout: {
                    'icon-image': `${id}-building-icon`,
                    'icon-size': 0.7,
                    'icon-padding': 0.1,
                },
                paint: {
                    'icon-color': '#0c0a09',
                }
            });


            map.on('mouseenter', `${id}-building-layer`, onMapHover)
            map.on('mouseleave', `${id}-building-layer`, onMapLeave)
            map.on('click', `${id}-building-layer`, onMapClick)

            loadedImage = true;
        })

        return () => {
            loadImage = false;
            if (loadedImage) {
                map.removeImage(`${id}-building-icon`);
                map.removeLayer(`${id}-building-layer`);
                map.off('mouseenter', `${id}-building-layer`, onMapHover)
                map.off('mouseleave', `${id}-building-layer`, onMapLeave)
                map.off('click', `${id}-building-layer`, onMapClick)
            }
            map.removeSource(`${id}-building-source`);
        }
    }, [buildings, id, map, onMapClick, onMapHover, onMapLeave]);

    return null;
}
