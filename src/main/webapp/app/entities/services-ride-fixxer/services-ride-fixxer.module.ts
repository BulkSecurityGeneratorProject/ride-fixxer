import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RideFixxerSharedModule } from 'app/shared';
import {
    ServicesRideFixxerComponent,
    ServicesRideFixxerDetailComponent,
    ServicesRideFixxerUpdateComponent,
    ServicesRideFixxerDeletePopupComponent,
    ServicesRideFixxerDeleteDialogComponent,
    servicesRoute,
    servicesPopupRoute
} from './';

const ENTITY_STATES = [...servicesRoute, ...servicesPopupRoute];

@NgModule({
    imports: [RideFixxerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServicesRideFixxerComponent,
        ServicesRideFixxerDetailComponent,
        ServicesRideFixxerUpdateComponent,
        ServicesRideFixxerDeleteDialogComponent,
        ServicesRideFixxerDeletePopupComponent
    ],
    entryComponents: [
        ServicesRideFixxerComponent,
        ServicesRideFixxerUpdateComponent,
        ServicesRideFixxerDeleteDialogComponent,
        ServicesRideFixxerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RideFixxerServicesRideFixxerModule {}
