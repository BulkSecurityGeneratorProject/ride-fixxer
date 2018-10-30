import { ILocationRideFixxer } from 'app/shared/model//location-ride-fixxer.model';
import { IServicesRideFixxer } from 'app/shared/model//services-ride-fixxer.model';

export interface IBodyShopRideFixxer {
    id?: number;
    owner?: string;
    name?: string;
    phone?: string;
    email?: string;
    location?: ILocationRideFixxer;
    services?: IServicesRideFixxer[];
}

export class BodyShopRideFixxer implements IBodyShopRideFixxer {
    constructor(
        public id?: number,
        public owner?: string,
        public name?: string,
        public phone?: string,
        public email?: string,
        public location?: ILocationRideFixxer,
        public services?: IServicesRideFixxer[]
    ) {}
}
