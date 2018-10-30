/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RideFixxerTestModule } from '../../../test.module';
import { LocationRideFixxerComponent } from 'app/entities/location-ride-fixxer/location-ride-fixxer.component';
import { LocationRideFixxerService } from 'app/entities/location-ride-fixxer/location-ride-fixxer.service';
import { LocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';

describe('Component Tests', () => {
    describe('LocationRideFixxer Management Component', () => {
        let comp: LocationRideFixxerComponent;
        let fixture: ComponentFixture<LocationRideFixxerComponent>;
        let service: LocationRideFixxerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [LocationRideFixxerComponent],
                providers: []
            })
                .overrideTemplate(LocationRideFixxerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationRideFixxerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationRideFixxerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LocationRideFixxer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
