import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MeasurementXbarService {
    constructor(private httpClient: HttpClient) { }

    private baseUrl = environment.baseUrl;

    public getXbarData(searchVo: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/Relay/Measurement/XbarR`, searchVo);
    }
}