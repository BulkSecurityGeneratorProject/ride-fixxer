import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';
import { ServicesRideFixxerService } from './services-ride-fixxer.service';
import { ServicesRideFixxerComponent } from './services-ride-fixxer.component';
import { ServicesRideFixxerDetailComponent } from './services-ride-fixxer-detail.component';
import { ServicesRideFixxerUpdateComponent } from './services-ride-fixxer-update.component';
import { ServicesRideFixxerDeletePopupComponent } from './services-ride-fixxer-delete-dialog.component';
import { IServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';

@Injectable({ providedIn: 'root' })
export class ServicesRideFixxerResolve implements Resolve<IServicesRideFixxer> {
    constructor(private service: ServicesRideFixxerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((services: HttpResponse<ServicesRideFixxer>) => services.body));
        }
        return of(new ServicesRideFixxer());
    }
}

export const servicesRoute: Routes = [
    {
        path: 'services-ride-fixxer',
        component: ServicesRideFixxerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services-ride-fixxer/:id/view',
        component: ServicesRideFixxerDetailComponent,
        resolve: {
            services: ServicesRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services-ride-fixxer/new',
        component: ServicesRideFixxerUpdateComponent,
        resolve: {
            services: ServicesRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services-ride-fixxer/:id/edit',
        component: ServicesRideFixxerUpdateComponent,
        resolve: {
            services: ServicesRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicesPopupRoute: Routes = [
    {
        path: 'services-ride-fixxer/:id/delete',
        component: ServicesRideFixxerDeletePopupComponent,
        resolve: {
            services: ServicesRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
