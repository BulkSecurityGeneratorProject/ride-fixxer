import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RideFixxerBodyShopRideFixxerModule } from './body-shop-ride-fixxer/body-shop-ride-fixxer.module';
import { RideFixxerServicesRideFixxerModule } from './services-ride-fixxer/services-ride-fixxer.module';
import { RideFixxerLocationRideFixxerModule } from './location-ride-fixxer/location-ride-fixxer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        RideFixxerBodyShopRideFixxerModule,
        RideFixxerServicesRideFixxerModule,
        RideFixxerLocationRideFixxerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RideFixxerEntityModule {}
