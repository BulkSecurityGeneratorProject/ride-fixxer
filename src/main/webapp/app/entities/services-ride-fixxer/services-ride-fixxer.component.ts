import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';
import { Principal } from 'app/core';
import { ServicesRideFixxerService } from './services-ride-fixxer.service';

@Component({
    selector: 'jhi-services-ride-fixxer',
    templateUrl: './services-ride-fixxer.component.html'
})
export class ServicesRideFixxerComponent implements OnInit, OnDestroy {
    services: IServicesRideFixxer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private servicesService: ServicesRideFixxerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.servicesService.query().subscribe(
            (res: HttpResponse<IServicesRideFixxer[]>) => {
                this.services = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IServicesRideFixxer) {
        return item.id;
    }

    registerChangeInServices() {
        this.eventSubscriber = this.eventManager.subscribe('servicesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
