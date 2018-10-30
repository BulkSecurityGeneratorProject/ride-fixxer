/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RideFixxerTestModule } from '../../../test.module';
import { LocationRideFixxerDeleteDialogComponent } from 'app/entities/location-ride-fixxer/location-ride-fixxer-delete-dialog.component';
import { LocationRideFixxerService } from 'app/entities/location-ride-fixxer/location-ride-fixxer.service';

describe('Component Tests', () => {
    describe('LocationRideFixxer Management Delete Component', () => {
        let comp: LocationRideFixxerDeleteDialogComponent;
        let fixture: ComponentFixture<LocationRideFixxerDeleteDialogComponent>;
        let service: LocationRideFixxerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [LocationRideFixxerDeleteDialogComponent]
            })
                .overrideTemplate(LocationRideFixxerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationRideFixxerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationRideFixxerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
