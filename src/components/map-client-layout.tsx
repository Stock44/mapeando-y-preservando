'use client';

import React, {forwardRef, ReactNode, useCallback, useContext, useEffect, useRef, useState} from "react";
import {motion, frame} from "framer-motion";
import {Button} from "react-aria-components";
import NavigateBefore from "@material-design-icons/svg/round/navigate_before.svg";
import NavigateNext from "@material-design-icons/svg/round/navigate_next.svg";
import {twMerge} from "tailwind-merge";
import BuildingsLayer from "@/components/buildings-layer";
import {type MapRef} from "@/components/map";
import {BuildingFeatureCollection} from "@/lib/get-all-buildings-geojson";
import dynamic from "next/dynamic";
import {useSelectedLayoutSegment, useSelectedLayoutSegments} from "next/navigation";
import getBuilding from "@/lib/get-building";

const Map = dynamic(() => import('@/components/map'), {
    ssr: false,
});

export type MainLayoutProps = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly buildingsGeoJSON: BuildingFeatureCollection;
}

export default function MapClientLayout(props: MainLayoutProps) {
    const {children, className, buildingsGeoJSON} = props;
    const [isOpen, setIsOpen] = useState(true);

    const layoutSegments = useSelectedLayoutSegments('sidebar');

    const buildingKey = layoutSegments.length >= 2 ? layoutSegments[2] : null;

    const mapRef = useRef<MapRef>(null);

    const onBuildingOpened = useCallback(() => {
        setIsOpen(true);
    }, []);

    useEffect(() => {
        if (!buildingKey) {
            return;
        }

        const building = buildingsGeoJSON.features.find(building => building.properties.id === buildingKey);

        if (!building?.geometry) {
            return;
        }

        mapRef.current?.flyTo(building.geometry.coordinates as [number, number])
    }, [buildingKey, buildingsGeoJSON.features])

    return (
        <motion.main layout className={twMerge('flex relative w-screen max-w-screen', className)}>
            <motion.div layout className='absolute left-0 top-0 bottom-0 z-50 bg-stone-50'
                        onAnimationComplete={mapRef.current?.resize} animate={{
                width: isOpen ? 'fit-content' : 0,
            }}>
                <Button className='absolute left-full z-50 bg-stone-50 py-2 rounded-r top-4'
                        onPress={() => setIsOpen(!isOpen)}>
                    {
                        isOpen
                            ? <NavigateBefore/>
                            : <NavigateNext/>
                    }
                </Button>
                <div className='overflow-hidden h-full'>
                    <div className='w-96 p-4 overflow-y-auto h-full'>
                        {children}
                    </div>
                </div>
            </motion.div>

            <motion.div layout className='flex-1 w-full' onAnimationIteration={onBuildingOpened}>
                <Map className='outline-none border-0 h-full w-full' mapRef={mapRef}>
                    <BuildingsLayer name='buildings' buildings={buildingsGeoJSON}
                                    onBuildingOpened={onBuildingOpened}/>
                </Map>
            </motion.div>
        </motion.main>
    )
}
