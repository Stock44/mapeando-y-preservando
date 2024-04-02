type Building = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    documentationDate: string | null;
    address: string | null;
    coordinates: {
        lat: number;
        lon: number;
    } | null;
    municipality: string | null;
    century: string | null;
    buildingType: string | null;
    constructionYear: number | null;
    builder: string | null;
    architecturalStyle: string | null;
    history: string | null;
    currentUser: string | null;
    currentState: string | null;
    conservationMeasures: string | null;
    milestones: string | null;
    testimonies: string | null;
    authorName: string | null;
}

export default Building;
