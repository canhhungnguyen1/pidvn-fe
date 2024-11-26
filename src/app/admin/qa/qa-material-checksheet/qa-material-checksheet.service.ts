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

  public getQACards(): Observable<any> {
    return this.httpClient.get(
        `${this.baseUrl}/QA/MaterialCheckSheet/QaCards`
      );
  }

  public getPsMasters(qaCard: string): Observable<any> {
    return this.httpClient.get(
        `${this.baseUrl}/QA/MaterialCheckSheet/PsMasters?qaCard=${qaCard}`
      );
  }

}