import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StkPaymentService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl = environment.baseUrl;

  public getStkPayments(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Accounting/StkPayment/StkPayments`);
  }

  public createStkPayment(stkPayment: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Accounting/StkPayment/StkPayment`, stkPayment);
  }

  public updateStkPayment(stkPayment: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/Accounting/StkPayment/StkPayment`, stkPayment);
  }

}