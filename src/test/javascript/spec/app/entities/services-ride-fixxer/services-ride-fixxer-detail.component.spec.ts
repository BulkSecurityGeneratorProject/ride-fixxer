/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RideFixxerTestModule } from '../../../test.module';
import { ServicesRideFixxerDetailComponent } from 'app/entities/services-ride-fixxer/services-ride-fixxer-detail.component';
import { ServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';

describe('Component Tests', () => {
    describe('ServicesRideFixxer Management Detail Component', () => {
        let comp: ServicesRideFixxerDetailComponent;
        let fixture: ComponentFixture<ServicesRideFixxerDetailComponent>;
        const route = ({ data: of({ services: new ServicesRideFixxer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [ServicesRideFixxerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ServicesRideFixxerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServicesRideFixxerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.services).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
