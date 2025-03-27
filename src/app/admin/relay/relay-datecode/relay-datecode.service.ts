import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LwhChangeQacardComponent } from '../relay-material-management/relay-process-recording/lwh-change-qacard/lwh-change-qacard.component';

@Injectable({
  providedIn: 'root',
})
export class RelayDateCodeService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getDateCodes(qaCard: string | null): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/DateCodeMng/DateCodes?qaCard=${qaCard}`
    );
  }

  public getAllDateCode(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/DateCodeMng/GetAllDateCode`
    );
  }

  public createDateCode(obj: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Relay/DateCodeMng/DateCode`, obj);
  }

  public deleteDateCode(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/Relay/DateCodeMng/DateCode/${id}`)
  }

  public getQACards(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/DateCodeMng/QACards`)
  }

  public getQACardByValue(qaCard: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/DateCodeMng/QACard?qaCard=${qaCard}`)
  }

  public getMaterialScanned(qaCard: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/DateCodeMng/MaterialScanned?qaCard=${qaCard}`)
  }
  
}
