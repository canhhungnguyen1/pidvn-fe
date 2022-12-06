import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MeasurementReportService {
    constructor(private httpClient: HttpClient) { }

    private baseUrl = environment.baseUrl;

    public AmountByLine(searchParams: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/Relay/Measurement/Report/AmountByLine`, searchParams);
    }
}