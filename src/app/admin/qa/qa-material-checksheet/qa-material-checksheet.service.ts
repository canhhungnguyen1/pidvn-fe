import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QaMaterialCheckSheetService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getQACards(searchParams: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/MaterialCheckSheet/QaCards`,
      searchParams
    );
  }

  public getPsMasters(qaCard: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/MaterialCheckSheet/PsMasters?qaCard=${qaCard}`
    );
  }

  public confirmCheckSheet(obj: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/MaterialCheckSheet/Confirm`,
      obj
    );
  }

  public getCheckSheetRecords(qaCard: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/MaterialCheckSheet/CheckSheetRecords?qaCard=${qaCard}`
    );
  }

  public scanMaterial(obj: any) : Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/MaterialCheckSheet/ScanMaterial`,
      obj
    );
  }
}
