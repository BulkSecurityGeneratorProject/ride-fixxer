import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';

@Component({
    selector: 'jhi-body-shop-ride-fixxer-detail',
    templateUrl: './body-shop-ride-fixxer-detail.component.html'
})
export class BodyShopRideFixxerDetailComponent implements OnInit {
    bodyShop: IBodyShopRideFixxer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bodyShop }) => {
            this.bodyShop = bodyShop;
        });
    }

    previousState() {
        window.history.back();
    }
}
