import type Building from "@/lib/building";
import contentful from "@/lib/contentful";
import {cache} from "react";

const getAllBuildings = cache(async (): Promise<Building[]> => {
    const entries = await contentful.getEntries({
        content_type: 'building',
    });

    return entries.items.map(entry => ({
        ...entry.fields,
        id: entry.sys.id,
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
    })) as Building[];
})

export default getAllBuildings;
