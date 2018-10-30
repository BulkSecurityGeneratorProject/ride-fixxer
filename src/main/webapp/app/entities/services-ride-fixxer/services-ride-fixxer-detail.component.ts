import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';

@Component({
    selector: 'jhi-services-ride-fixxer-detail',
    templateUrl: './services-ride-fixxer-detail.component.html'
})
export class ServicesRideFixxerDetailComponent implements OnInit {
    services: IServicesRideFixxer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ services }) => {
            this.services = services;
        });
    }

    previousState() {
        window.history.back();
    }
}
