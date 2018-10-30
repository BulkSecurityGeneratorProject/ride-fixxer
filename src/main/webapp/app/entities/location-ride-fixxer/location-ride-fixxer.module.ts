import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RideFixxerSharedModule } from 'app/shared';
import {
    LocationRideFixxerComponent,
    LocationRideFixxerDetailComponent,
    LocationRideFixxerUpdateComponent,
    LocationRideFixxerDeletePopupComponent,
    LocationRideFixxerDeleteDialogComponent,
    locationRoute,
    locationPopupRoute
} from './';

const ENTITY_STATES = [...locationRoute, ...locationPopupRoute];

@NgModule({
    imports: [RideFixxerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocationRideFixxerComponent,
        LocationRideFixxerDetailComponent,
        LocationRideFixxerUpdateComponent,
        LocationRideFixxerDeleteDialogComponent,
        LocationRideFixxerDeletePopupComponent
    ],
    entryComponents: [
        LocationRideFixxerComponent,
        LocationRideFixxerUpdateComponent,
        LocationRideFixxerDeleteDialogComponent,
        LocationRideFixxerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RideFixxerLocationRideFixxerModule {}
