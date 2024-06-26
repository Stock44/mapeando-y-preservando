'use client';

import {
    forwardRef,
    ReactElement,
    ReactNode, Ref,
    SyntheticEvent,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import {Map as MapboxMap} from 'mapbox-gl';
import {MapProvider} from "@/lib/map-context";
import 'mapbox-gl/dist/mapbox-gl.css';
import {twMerge} from "tailwind-merge";
import {Simulate} from "react-dom/test-utils";
import resize = Simulate.resize;

type NullReactComponent = ReactElement<any, () => null>

export type MapProps = {
    readonly className?: string;
    readonly children?: NullReactComponent | Iterable<NullReactComponent>;
    readonly center?: [number, number];
    readonly mapRef?: Ref<MapRef>;
}

export type MapRef = {
    readonly resize: () => void;
    readonly flyTo: (coordinates: [number, number]) => void;
}

const Map = function Map(props: MapProps) {
    const {mapRef: externalMapRef} = props;
    const {className, children, center} = props;

    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<MapboxMap>()

    const [mapLoaded, setMapLoaded] = useState(false);

    useImperativeHandle(externalMapRef, () => ({
        resize() {
            mapRef.current?.resize();
        },
        flyTo(coordinates) {
            mapRef.current?.flyTo({
                center: coordinates,
                zoom: 18,
            })
        }
    }))

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        mapRef.current = new MapboxMap({
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: center ?? [-100.16294587016685, 25.61285664191611],
            zoom: 12
        });

        mapRef.current.on('load', () => {
            setMapLoaded(true);
        })
    }, []);

    return (
        <MapProvider value={mapRef.current ?? null}>
            {
                mapLoaded && children
            }
            <div className={twMerge('', className)} ref={mapContainerRef}/>
        </MapProvider>
    )
}

export default Map;
