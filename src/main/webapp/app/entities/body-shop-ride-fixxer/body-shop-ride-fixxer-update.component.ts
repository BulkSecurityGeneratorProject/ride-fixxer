import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';
import { BodyShopRideFixxerService } from './body-shop-ride-fixxer.service';
import { ILocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';
import { LocationRideFixxerService } from 'app/entities/location-ride-fixxer';

@Component({
    selector: 'jhi-body-shop-ride-fixxer-update',
    templateUrl: './body-shop-ride-fixxer-update.component.html'
})
export class BodyShopRideFixxerUpdateComponent implements OnInit {
    bodyShop: IBodyShopRideFixxer;
    isSaving: boolean;

    locations: ILocationRideFixxer[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private bodyShopService: BodyShopRideFixxerService,
        private locationService: LocationRideFixxerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bodyShop }) => {
            this.bodyShop = bodyShop;
        });
        this.locationService.query({ filter: 'bodyshop-is-null' }).subscribe(
            (res: HttpResponse<ILocationRideFixxer[]>) => {
                if (!this.bodyShop.location || !this.bodyShop.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.bodyShop.location.id).subscribe(
                        (subRes: HttpResponse<ILocationRideFixxer>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bodyShop.id !== undefined) {
            this.subscribeToSaveResponse(this.bodyShopService.update(this.bodyShop));
        } else {
            this.subscribeToSaveResponse(this.bodyShopService.create(this.bodyShop));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBodyShopRideFixxer>>) {
        result.subscribe((res: HttpResponse<IBodyShopRideFixxer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocationRideFixxer) {
        return item.id;
    }
}
