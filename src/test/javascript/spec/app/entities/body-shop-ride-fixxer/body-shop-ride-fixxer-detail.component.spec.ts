/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RideFixxerTestModule } from '../../../test.module';
import { BodyShopRideFixxerDetailComponent } from 'app/entities/body-shop-ride-fixxer/body-shop-ride-fixxer-detail.component';
import { BodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';

describe('Component Tests', () => {
    describe('BodyShopRideFixxer Management Detail Component', () => {
        let comp: BodyShopRideFixxerDetailComponent;
        let fixture: ComponentFixture<BodyShopRideFixxerDetailComponent>;
        const route = ({ data: of({ bodyShop: new BodyShopRideFixxer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [BodyShopRideFixxerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BodyShopRideFixxerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BodyShopRideFixxerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bodyShop).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
