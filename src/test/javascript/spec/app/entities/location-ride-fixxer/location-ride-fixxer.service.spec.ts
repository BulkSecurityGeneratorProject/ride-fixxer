/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { LocationRideFixxerService } from 'app/entities/location-ride-fixxer/location-ride-fixxer.service';
import { ILocationRideFixxer, LocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';

describe('Service Tests', () => {
    describe('LocationRideFixxer Service', () => {
        let injector: TestBed;
        let service: LocationRideFixxerService;
        let httpMock: HttpTestingController;
        let elemDefault: ILocationRideFixxer;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(LocationRideFixxerService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new LocationRideFixxer(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a LocationRideFixxer', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new LocationRideFixxer(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a LocationRideFixxer', async () => {
                const returnedFromService = Object.assign(
                    {
                        streetAddress: 'BBBBBB',
                        postalCode: 'BBBBBB',
                        city: 'BBBBBB',
                        stateProvince: 'BBBBBB',
                        country: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of LocationRideFixxer', async () => {
                const returnedFromService = Object.assign(
                    {
                        streetAddress: 'BBBBBB',
                        postalCode: 'BBBBBB',
                        city: 'BBBBBB',
                        stateProvince: 'BBBBBB',
                        country: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a LocationRideFixxer', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
