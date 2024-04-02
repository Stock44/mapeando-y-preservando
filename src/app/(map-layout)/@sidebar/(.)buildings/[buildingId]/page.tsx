import React from 'react';
import getBuilding from "@/lib/get-building";
import Markdown from "@/components/markdown";

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
        <div>
            <h1 className='font-bold text-xl mb-2'>
                {building.name}
            </h1>

            <div className='flex gap-2 mb-2 flex-wrap'>
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
    )
}
