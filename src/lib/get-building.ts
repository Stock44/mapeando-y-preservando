import type Building from "@/lib/building";
import contentful from "@/lib/contentful";

export default async function getBuilding(buildingId: string): Promise<Building> {
    const entry = await contentful.getEntry(buildingId);

    return {
        ...entry.fields,
        id: entry.sys.id,
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
    } as Building
}
