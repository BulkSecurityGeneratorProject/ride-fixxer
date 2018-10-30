import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';
import { BodyShopRideFixxerService } from './body-shop-ride-fixxer.service';

@Component({
    selector: 'jhi-body-shop-ride-fixxer-delete-dialog',
    templateUrl: './body-shop-ride-fixxer-delete-dialog.component.html'
})
export class BodyShopRideFixxerDeleteDialogComponent {
    bodyShop: IBodyShopRideFixxer;

    constructor(
        private bodyShopService: BodyShopRideFixxerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bodyShopService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bodyShopListModification',
                content: 'Deleted an bodyShop'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-body-shop-ride-fixxer-delete-popup',
    template: ''
})
export class BodyShopRideFixxerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bodyShop }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BodyShopRideFixxerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.bodyShop = bodyShop;
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
