import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';
import { BodyShopRideFixxerService } from './body-shop-ride-fixxer.service';
import { BodyShopRideFixxerComponent } from './body-shop-ride-fixxer.component';
import { BodyShopRideFixxerDetailComponent } from './body-shop-ride-fixxer-detail.component';
import { BodyShopRideFixxerUpdateComponent } from './body-shop-ride-fixxer-update.component';
import { BodyShopRideFixxerDeletePopupComponent } from './body-shop-ride-fixxer-delete-dialog.component';
import { IBodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';

@Injectable({ providedIn: 'root' })
export class BodyShopRideFixxerResolve implements Resolve<IBodyShopRideFixxer> {
    constructor(private service: BodyShopRideFixxerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bodyShop: HttpResponse<BodyShopRideFixxer>) => bodyShop.body));
        }
        return of(new BodyShopRideFixxer());
    }
}

export const bodyShopRoute: Routes = [
    {
        path: 'body-shop-ride-fixxer',
        component: BodyShopRideFixxerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.bodyShop.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'body-shop-ride-fixxer/:id/view',
        component: BodyShopRideFixxerDetailComponent,
        resolve: {
            bodyShop: BodyShopRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.bodyShop.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'body-shop-ride-fixxer/new',
        component: BodyShopRideFixxerUpdateComponent,
        resolve: {
            bodyShop: BodyShopRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.bodyShop.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'body-shop-ride-fixxer/:id/edit',
        component: BodyShopRideFixxerUpdateComponent,
        resolve: {
            bodyShop: BodyShopRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.bodyShop.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bodyShopPopupRoute: Routes = [
    {
        path: 'body-shop-ride-fixxer/:id/delete',
        component: BodyShopRideFixxerDeletePopupComponent,
        resolve: {
            bodyShop: BodyShopRideFixxerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rideFixxerApp.bodyShop.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
