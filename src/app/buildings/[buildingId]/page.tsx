import React from 'react';
import getBuilding from "@/lib/get-building";
import Markdown from "@/components/markdown";
import Map from "@/components/map";

export type BuildingSidebarProps = {
    readonly params: {
        readonly buildingId: string;
    }
}

export default async function BuildingSidebar(props: BuildingSidebarProps) {
    const {params} = props;
    const {buildingId} = params;

    const building = await getBuilding(buildingId);

    return (
        <main className='max-w-screen-md mx-auto h-full'>
            {
                building.coordinates && (
                    <Map center={[building.coordinates.lon, building.coordinates.lat]} className='h-96 mb-4'/>
                )
            }
            <div className='px-2 h-full'>
                <h1 className='font-bold text-4xl mb-4'>
                    {building.name}
                </h1>

                <div className='flex gap-2 mb-4 flex-wrap'>
                    {
                        building.buildingType && (
                            <div className='bg-stone-200 rounded-2xl px-2 text-sm'>
                                {building.buildingType}
                            </div>
                        )
                    }
                    {
                        building.century && (
                            <div className='bg-stone-200 rounded-2xl px-2 text-sm'>
                                Siglo {building.century}
                            </div>
                        )
                    }
                    {
                        building.municipality && (
                            <div className='bg-stone-200 rounded-2xl px-2 text-sm'>
                                {building.municipality}
                            </div>
                        )
                    }
                </div>

                {
                    building.address && (
                        <p className='mb-2'>
                            {building.address}
                        </p>
                    )
                }

                {
                    building.history && (
                        <>
                            <h2 className='font-bold text-lg mt-4'>
                                Historia
                            </h2>
                            <Markdown markdown={building.history}/>
                        </>

                    )
                }
            </div>

        </main>
    )
}
