import { Moment } from 'moment';
import { IBodyShopRideFixxer } from 'app/shared/model//body-shop-ride-fixxer.model';

export interface IServicesRideFixxer {
    id?: number;
    name?: string;
    price?: number;
    timeAprox?: Moment;
    bodyShop?: IBodyShopRideFixxer;
}

export class ServicesRideFixxer implements IServicesRideFixxer {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public timeAprox?: Moment,
        public bodyShop?: IBodyShopRideFixxer
    ) {}
}
