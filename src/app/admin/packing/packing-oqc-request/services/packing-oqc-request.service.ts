import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackingOqcRequestService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public createOqcRequest(oqcReq: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Packing/OqcRequest/Request`, oqcReq)
  }

  public updateOqcRequest(oqcReq: any) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/Packing/OqcRequest/Request`, oqcReq)
  }

  public getOqcRequestStatus(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Api/OqcRequestStatus/All`)
  }

  public summaryData(searchParam: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Packing/OqcRequest/DataSummary`,searchParam)
  }


  public systemValidate(qaCard: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Packing/OqcRequest/SystemValidate?qaCard=${qaCard}`)
  }



}
