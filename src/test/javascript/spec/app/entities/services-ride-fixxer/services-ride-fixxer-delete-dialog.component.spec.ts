/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RideFixxerTestModule } from '../../../test.module';
import { ServicesRideFixxerDeleteDialogComponent } from 'app/entities/services-ride-fixxer/services-ride-fixxer-delete-dialog.component';
import { ServicesRideFixxerService } from 'app/entities/services-ride-fixxer/services-ride-fixxer.service';

describe('Component Tests', () => {
    describe('ServicesRideFixxer Management Delete Component', () => {
        let comp: ServicesRideFixxerDeleteDialogComponent;
        let fixture: ComponentFixture<ServicesRideFixxerDeleteDialogComponent>;
        let service: ServicesRideFixxerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RideFixxerTestModule],
                declarations: [ServicesRideFixxerDeleteDialogComponent]
            })
                .overrideTemplate(ServicesRideFixxerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServicesRideFixxerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesRideFixxerService);
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
