import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServicesRideFixxer } from 'app/shared/model/services-ride-fixxer.model';

type EntityResponseType = HttpResponse<IServicesRideFixxer>;
type EntityArrayResponseType = HttpResponse<IServicesRideFixxer[]>;

@Injectable({ providedIn: 'root' })
export class ServicesRideFixxerService {
    public resourceUrl = SERVER_API_URL + 'api/services';

    constructor(private http: HttpClient) {}

    create(services: IServicesRideFixxer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(services);
        return this.http
            .post<IServicesRideFixxer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(services: IServicesRideFixxer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(services);
        return this.http
            .put<IServicesRideFixxer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IServicesRideFixxer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IServicesRideFixxer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(services: IServicesRideFixxer): IServicesRideFixxer {
        const copy: IServicesRideFixxer = Object.assign({}, services, {
            timeAprox: services.timeAprox != null && services.timeAprox.isValid() ? services.timeAprox.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.timeAprox = res.body.timeAprox != null ? moment(res.body.timeAprox) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((services: IServicesRideFixxer) => {
            services.timeAprox = services.timeAprox != null ? moment(services.timeAprox) : null;
        });
        return res;
    }
}
