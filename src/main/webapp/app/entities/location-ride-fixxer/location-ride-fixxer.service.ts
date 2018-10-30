import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILocationRideFixxer } from 'app/shared/model/location-ride-fixxer.model';

type EntityResponseType = HttpResponse<ILocationRideFixxer>;
type EntityArrayResponseType = HttpResponse<ILocationRideFixxer[]>;

@Injectable({ providedIn: 'root' })
export class LocationRideFixxerService {
    public resourceUrl = SERVER_API_URL + 'api/locations';

    constructor(private http: HttpClient) {}

    create(location: ILocationRideFixxer): Observable<EntityResponseType> {
        return this.http.post<ILocationRideFixxer>(this.resourceUrl, location, { observe: 'response' });
    }

    update(location: ILocationRideFixxer): Observable<EntityResponseType> {
        return this.http.put<ILocationRideFixxer>(this.resourceUrl, location, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILocationRideFixxer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILocationRideFixxer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
