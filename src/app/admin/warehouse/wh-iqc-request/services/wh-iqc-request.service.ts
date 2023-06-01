import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WhIqcRequestService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getInvoices(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/WH/IQC/Invoices`);
  }

  public getIqcRequests(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/WH/IQC/Requests`,searchVo);
  }

  public getIqcRequestDetail(requestNo: string, searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/WH/IQC/Requests/${requestNo}`,searchVo);
  }

  public createIqcRequest(iqcRequest: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/WH/IQC/Request`, iqcRequest)
  }

  public getSlipNoByInvoice(invoice: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/WH/IQC/SlipNo?invoice=${invoice}`);
  }

  public createIqcRequestSorting(lotNos: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/WH/IQC/IqcRequestSorting`, lotNos)
  }
  
}
