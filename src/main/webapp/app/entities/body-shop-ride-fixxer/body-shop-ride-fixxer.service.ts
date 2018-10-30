import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBodyShopRideFixxer } from 'app/shared/model/body-shop-ride-fixxer.model';

type EntityResponseType = HttpResponse<IBodyShopRideFixxer>;
type EntityArrayResponseType = HttpResponse<IBodyShopRideFixxer[]>;

@Injectable({ providedIn: 'root' })
export class BodyShopRideFixxerService {
    public resourceUrl = SERVER_API_URL + 'api/body-shops';

    constructor(private http: HttpClient) {}

    create(bodyShop: IBodyShopRideFixxer): Observable<EntityResponseType> {
        return this.http.post<IBodyShopRideFixxer>(this.resourceUrl, bodyShop, { observe: 'response' });
    }

    update(bodyShop: IBodyShopRideFixxer): Observable<EntityResponseType> {
        return this.http.put<IBodyShopRideFixxer>(this.resourceUrl, bodyShop, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBodyShopRideFixxer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBodyShopRideFixxer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
