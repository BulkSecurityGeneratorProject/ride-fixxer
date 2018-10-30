/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RideFixxerTestModule } from '../../../test.module';
import { LocationRideFixxerDetailComponent } from 'app/entities/location-ride-fixxer/location-ride-fixxer-detail.component';
import { LocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';

describe('Component Tests', () => {
    describe('LocationRideFixxer Management Detail Component', () => {
        let comp: LocationRideFixxerDetailComponent;
        let fixture: ComponentFixture<LocationRideFixxerDetailComponent>;
        const route = ({ data: of({ location: new LocationRideFixxer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [LocationRideFixxerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LocationRideFixxerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationRideFixxerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.location).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
