'use client';

import Building from "@/lib/building";
import Combobox, {Item} from "@/components/combobox";
import React, {useMemo, useState} from "react";
import useFuse from "@/lib/use-fuse";
import {List} from "immutable";
import {useRouter} from "next/navigation";

export type BuildingsComboboxProps = {
    readonly buildings: Building[]
}

export default function BuildingsCombobox(props: BuildingsComboboxProps) {
    const {buildings} = props;
    const router = useRouter();
    const buildingsList = useMemo(() => List(buildings), [buildings]);
    const fuse = useFuse(buildingsList, {
        keys: [
            'name',
            'municipality',
            'address',
        ],
    });
    let [filterValue, setFilterValue] = useState('');
    let filteredItems = useMemo(
        () => (fuse?.search(filterValue, {
            limit: 10,
        }) ?? []).map(result => result.item),
        [fuse, filterValue]
    );

    return <Combobox<Building> items={filteredItems} onInputChange={setFilterValue}
                               inputValue={filterValue} onSelectionChange={key => {
        if (key) {
            router.push(`/buildings/${key}`)
        }
    }}>
        {
            (item) => (
                <Item textValue={item.name} className='text-stone-800 data-[focused=true]:bg-stone-200'>
                    {item.name} <span
                    className='text-xs italic text-ellipsis text-stone-600'> {item.municipality}</span>
                </Item>
            )
        }
    </Combobox>
}
