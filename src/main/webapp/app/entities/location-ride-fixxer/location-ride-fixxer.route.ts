import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';
import { LocationRideFixxerService } from './location-ride-fixxer.service';
import { LocationRideFixxerComponent } from './location-ride-fixxer.component';
import { LocationRideFixxerDetailComponent } from './location-ride-fixxer-detail.component';
import { LocationRideFixxerUpdateComponent } from './location-ride-fixxer-update.component';
import { LocationRideFixxerDeletePopupComponent } from './location-ride-fixxer-delete-dialog.component';
import { ILocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';

@Injectable({ providedIn: 'root' })
export class LocationRideFixxerResolve implements Resolve<ILocationRideFixxer> {
    constructor(private service: LocationRideFixxerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((location: HttpResponse<LocationRideFixxer>) => location.body));
        }
        return of(new LocationRideFixxer());
    }
}

export const locationRoute: Routes = [
    {
        path: 'location-ride-fixxer',
        component: LocationRideFixxerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-ride-fixxer/:id/view',
        component: LocationRideFixxerDetailComponent,
        resolve: {
            location: LocationRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-ride-fixxer/new',
        component: LocationRideFixxerUpdateComponent,
        resolve: {
            location: LocationRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-ride-fixxer/:id/edit',
        component: LocationRideFixxerUpdateComponent,
        resolve: {
            location: LocationRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-ride-fixxer/:id/delete',
        component: LocationRideFixxerDeletePopupComponent,
        resolve: {
            location: LocationRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
