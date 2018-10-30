export interface ILocationRideFixxer {
    id?: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    country?: string;
}

export class LocationRideFixxer implements ILocationRideFixxer {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public country?: string
    ) {}
}
