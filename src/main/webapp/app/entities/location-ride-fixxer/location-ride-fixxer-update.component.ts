import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';
import { LocationRideFixxerService } from './location-ride-fixxer.service';

@Component({
    selector: 'jhi-location-ride-fixxer-update',
    templateUrl: './location-ride-fixxer-update.component.html'
})
export class LocationRideFixxerUpdateComponent implements OnInit {
    location: ILocationRideFixxer;
    isSaving: boolean;

    constructor(private locationService: LocationRideFixxerService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocationRideFixxer>>) {
        result.subscribe((res: HttpResponse<ILocationRideFixxer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
