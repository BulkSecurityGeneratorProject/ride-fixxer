import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';
import { ServicesRideFixxerService } from './services-ride-fixxer.service';
import { IBodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';
import { BodyShopRideFixxerService } from 'app/entities/body-shop-ride-fixxer';

@Component({
    selector: 'jhi-services-ride-fixxer-update',
    templateUrl: './services-ride-fixxer-update.component.html'
})
export class ServicesRideFixxerUpdateComponent implements OnInit {
    services: IServicesRideFixxer;
    isSaving: boolean;

    bodyshops: IBodyShopRideFixxer[];
    timeAprox: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private servicesService: ServicesRideFixxerService,
        private bodyShopService: BodyShopRideFixxerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ services }) => {
            this.services = services;
            this.timeAprox = this.services.timeAprox != null ? this.services.timeAprox.format(DATE_TIME_FORMAT) : null;
        });
        this.bodyShopService.query().subscribe(
            (res: HttpResponse<IBodyShopRideFixxer[]>) => {
                this.bodyshops = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.services.timeAprox = this.timeAprox != null ? moment(this.timeAprox, DATE_TIME_FORMAT) : null;
        if (this.services.id !== undefined) {
            this.subscribeToSaveResponse(this.servicesService.update(this.services));
        } else {
            this.subscribeToSaveResponse(this.servicesService.create(this.services));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServicesRideFixxer>>) {
        result.subscribe((res: HttpResponse<IServicesRideFixxer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBodyShopById(index: number, item: IBodyShopRideFixxer) {
        return item.id;
    }
}
