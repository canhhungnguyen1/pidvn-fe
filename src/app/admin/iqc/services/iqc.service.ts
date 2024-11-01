import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IqcRequestDto } from '../models/IqcRequestDto';
import { IqcResultDto } from '../models/IqcResultDto';
@Injectable({
  providedIn: 'root',
})
export class IqcService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getIqcRequests(searchParams: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IQC/IqcRequests`,
      searchParams
    );
  }

  public getIqcRequest(requestNo: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IQC/IqcRequest/${requestNo}`);
  }

  public getSlipNo(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IQC/SlipNo`);
  }

  public createIqcRequest(iqcRequest: IqcRequestDto): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IQC/IqcRequest`, iqcRequest);
  }

  public updateIqcRequest(iqcRequest: IqcRequestDto): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/IQC/IqcRequest`, iqcRequest);
  }

  public getIqcResults(requestNo: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IQC/IqcResults?requestNo=${requestNo}`
    );
  }

  public getIqcLevelOfControls(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IQC/IqcLevelOfControls`);
  }

  public evaluateLotNos(iqcResults: IqcResultDto []): Observable<any> { 
    return this.httpClient.post(`${this.baseUrl}/IQC/EvaluateLotNos`, iqcResults);
  }


  public getLotsInventory(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IQC/InventoryLots`);
  }


  public prepareDataCreateRequest(searchParams: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IQC/PrepareDataCreateRequest`, searchParams);
  }

  public getHistoryLevelOfControls(model: string) : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IQC/HistoryLevelOfControls?model=${model}`);
  }



}
