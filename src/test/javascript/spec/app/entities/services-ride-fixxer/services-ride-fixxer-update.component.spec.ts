/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RideFixxerTestModule } from '../../../test.module';
import { ServicesRideFixxerUpdateComponent } from 'app/entities/services-ride-fixxer/services-ride-fixxer-update.component';
import { ServicesRideFixxerService } from 'app/entities/services-ride-fixxer/services-ride-fixxer.service';
import { ServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';

describe('Component Tests', () => {
    describe('ServicesRideFixxer Management Update Component', () => {
        let comp: ServicesRideFixxerUpdateComponent;
        let fixture: ComponentFixture<ServicesRideFixxerUpdateComponent>;
        let service: ServicesRideFixxerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [ServicesRideFixxerUpdateComponent]
            })
                .overrideTemplate(ServicesRideFixxerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServicesRideFixxerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesRideFixxerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ServicesRideFixxer(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.services = entity;
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
                    const entity = new ServicesRideFixxer();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.services = entity;
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
