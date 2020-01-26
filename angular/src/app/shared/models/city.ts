import { Area } from "./area";

export class City {
    CityAreaId?: Number;
    CityId?: number;
    CityName?: string;
    Area?: Area;
    constructor(CityAreaId, CityId, CityName, Area) {
        this.CityAreaId = CityAreaId;
        this.CityId = CityId;
        this.CityName = CityName;
        this.Area = Area;

    }
}


