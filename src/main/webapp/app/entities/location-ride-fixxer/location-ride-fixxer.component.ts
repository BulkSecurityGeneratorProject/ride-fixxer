import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';
import { Principal } from 'app/core';
import { LocationRideFixxerService } from './location-ride-fixxer.service';

@Component({
    selector: 'jhi-location-ride-fixxer',
    templateUrl: './location-ride-fixxer.component.html'
})
export class LocationRideFixxerComponent implements OnInit, OnDestroy {
    locations: ILocationRideFixxer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private locationService: LocationRideFixxerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.locationService.query().subscribe(
            (res: HttpResponse<ILocationRideFixxer[]>) => {
                this.locations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILocationRideFixxer) {
        return item.id;
    }

    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
