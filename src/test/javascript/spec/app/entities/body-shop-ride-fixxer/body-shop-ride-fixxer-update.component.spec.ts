/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RideFixxerTestModule } from '../../../test.module';
import { BodyShopRideFixxerUpdateComponent } from 'app/entities/body-shop-ride-fixxer/body-shop-ride-fixxer-update.component';
import { BodyShopRideFixxerService } from 'app/entities/body-shop-ride-fixxer/body-shop-ride-fixxer.service';
import { BodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';

describe('Component Tests', () => {
    describe('BodyShopRideFixxer Management Update Component', () => {
        let comp: BodyShopRideFixxerUpdateComponent;
        let fixture: ComponentFixture<BodyShopRideFixxerUpdateComponent>;
        let service: BodyShopRideFixxerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [BodyShopRideFixxerUpdateComponent]
            })
                .overrideTemplate(BodyShopRideFixxerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BodyShopRideFixxerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BodyShopRideFixxerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BodyShopRideFixxer(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bodyShop = entity;
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
                    const entity = new BodyShopRideFixxer();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bodyShop = entity;
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
