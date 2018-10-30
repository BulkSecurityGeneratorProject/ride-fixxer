/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RideFixxerTestModule } from '../../../test.module';
import { LocationRideFixxerUpdateComponent } from 'app/entities/location-ride-fixxer/location-ride-fixxer-update.component';
import { LocationRideFixxerService } from 'app/entities/location-ride-fixxer/location-ride-fixxer.service';
import { LocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';

describe('Component Tests', () => {
    describe('LocationRideFixxer Management Update Component', () => {
        let comp: LocationRideFixxerUpdateComponent;
        let fixture: ComponentFixture<LocationRideFixxerUpdateComponent>;
        let service: LocationRideFixxerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [LocationRideFixxerUpdateComponent]
            })
                .overrideTemplate(LocationRideFixxerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationRideFixxerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationRideFixxerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocationRideFixxer(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.location = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocationRideFixxer();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.location = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
