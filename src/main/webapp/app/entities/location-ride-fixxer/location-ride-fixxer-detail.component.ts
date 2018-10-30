import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';

@Component({
    selector: 'jhi-location-ride-fixxer-detail',
    templateUrl: './location-ride-fixxer-detail.component.html'
})
export class LocationRideFixxerDetailComponent implements OnInit {
    location: ILocationRideFixxer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
    }

    previousState() {
        window.history.back();
    }
}
