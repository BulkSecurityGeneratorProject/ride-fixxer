import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';
import { Principal } from 'app/core';
import { BodyShopRideFixxerService } from './body-shop-ride-fixxer.service';

@Component({
    selector: 'jhi-body-shop-ride-fixxer',
    templateUrl: './body-shop-ride-fixxer.component.html'
})
export class BodyShopRideFixxerComponent implements OnInit, OnDestroy {
    bodyShops: IBodyShopRideFixxer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bodyShopService: BodyShopRideFixxerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.bodyShopService.query().subscribe(
            (res: HttpResponse<IBodyShopRideFixxer[]>) => {
                this.bodyShops = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBodyShops();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBodyShopRideFixxer) {
        return item.id;
    }

    registerChangeInBodyShops() {
        this.eventSubscriber = this.eventManager.subscribe('bodyShopListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
