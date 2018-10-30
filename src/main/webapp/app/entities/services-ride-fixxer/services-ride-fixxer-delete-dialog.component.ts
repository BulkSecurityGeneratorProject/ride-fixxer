import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';
import { ServicesRideFixxerService } from './services-ride-fixxer.service';

@Component({
    selector: 'jhi-services-ride-fixxer-delete-dialog',
    templateUrl: './services-ride-fixxer-delete-dialog.component.html'
})
export class ServicesRideFixxerDeleteDialogComponent {
    services: IServicesRideFixxer;

    constructor(
        private servicesService: ServicesRideFixxerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.servicesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'servicesListModification',
                content: 'Deleted an services'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-services-ride-fixxer-delete-popup',
    template: ''
})
export class ServicesRideFixxerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ services }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ServicesRideFixxerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.services = services;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
