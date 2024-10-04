import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WhIqcRecheckService {

    constructor(private httpClient: HttpClient) {}

    private baseUrl = environment.baseUrl;

    
    public scanLabel(labelDto: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/WH/IQC-Recheck/ScanLabel`, labelDto);
    }

}