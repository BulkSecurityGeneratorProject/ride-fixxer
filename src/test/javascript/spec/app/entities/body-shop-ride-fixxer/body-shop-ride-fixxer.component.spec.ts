/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RideFixxerTestModule } from '../../../test.module';
import { BodyShopRideFixxerComponent } from 'app/entities/body-shop-ride-fixxer/body-shop-ride-fixxer.component';
import { BodyShopRideFixxerService } from 'app/entities/body-shop-ride-fixxer/body-shop-ride-fixxer.service';
import { BodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';

describe('Component Tests', () => {
    describe('BodyShopRideFixxer Management Component', () => {
        let comp: BodyShopRideFixxerComponent;
        let fixture: ComponentFixture<BodyShopRideFixxerComponent>;
        let service: BodyShopRideFixxerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [BodyShopRideFixxerComponent],
                providers: []
            })
                .overrideTemplate(BodyShopRideFixxerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BodyShopRideFixxerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BodyShopRideFixxerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BodyShopRideFixxer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bodyShops[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
