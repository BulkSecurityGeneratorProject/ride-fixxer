/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RideFixxerTestModule } from '../../../test.module';
import { ServicesRideFixxerComponent } from 'app/entities/services-ride-fixxer/services-ride-fixxer.component';
import { ServicesRideFixxerService } from 'app/entities/services-ride-fixxer/services-ride-fixxer.service';
import { ServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';

describe('Component Tests', () => {
    describe('ServicesRideFixxer Management Component', () => {
        let comp: ServicesRideFixxerComponent;
        let fixture: ComponentFixture<ServicesRideFixxerComponent>;
        let service: ServicesRideFixxerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [ServicesRideFixxerComponent],
                providers: []
            })
                .overrideTemplate(ServicesRideFixxerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServicesRideFixxerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesRideFixxerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ServicesRideFixxer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.services[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
