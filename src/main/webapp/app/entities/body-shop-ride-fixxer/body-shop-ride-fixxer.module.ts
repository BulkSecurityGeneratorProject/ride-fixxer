import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RideFixxerSharedModule } from 'app/shared';
import {
    BodyShopRideFixxerComponent,
    BodyShopRideFixxerDetailComponent,
    BodyShopRideFixxerUpdateComponent,
    BodyShopRideFixxerDeletePopupComponent,
    BodyShopRideFixxerDeleteDialogComponent,
    bodyShopRoute,
    bodyShopPopupRoute
} from './';

const ENTITY_STATES = [...bodyShopRoute, ...bodyShopPopupRoute];

@NgModule({
    imports: [RideFixxerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BodyShopRideFixxerComponent,
        BodyShopRideFixxerDetailComponent,
        BodyShopRideFixxerUpdateComponent,
        BodyShopRideFixxerDeleteDialogComponent,
        BodyShopRideFixxerDeletePopupComponent
    ],
    entryComponents: [
        BodyShopRideFixxerComponent,
        BodyShopRideFixxerUpdateComponent,
        BodyShopRideFixxerDeleteDialogComponent,
        BodyShopRideFixxerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RideFixxerBodyShopRideFixxerModule {}
