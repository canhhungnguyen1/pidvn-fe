import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PurchaseDataService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrlPhp;

  public getBalanceSheet(factory: any, date: Date[]): Observable<any> {
    //console.log(this.baseUrl);
    // return this.httpClient.get(`${this.baseUrl}/api/purchase_datas.balance_sheet?factory=` 
    // + factory + '&fr_date=' + date[0] + '&to_date=' + date[1]);
     let fr_date = formatDate(date[0],'yyyy-MM-dd', "en-US");
     let to_date = formatDate(date[1], 'yyyy-MM-dd', 'en-US');

    return this.httpClient.get(`${this.baseUrl}/api/purchase_datas.balance_sheet?factory=${factory}&fr_date=${fr_date}&to_date=${to_date}`); 
  }

  public getPsiByMonth(factory: any, date: Date[]): Observable<any> {
    let fr_date = formatDate(date[0],'yyyy-MM', "en-US");
    let to_date = formatDate(date[1], 'yyyy-MM', 'en-US');

   return this.httpClient.get(`${this.baseUrl}/api/purchase_datas.psi_by_month?factory=${factory}&fr_month=${fr_date}&to_month=${to_date}`); 
 }

  public getFactories(): Observable<any> {
    //console.log(this.baseUrl);
    return this.httpClient.get(`${this.baseUrl}/api/purchase_datas.get_factories`);

  }
}
