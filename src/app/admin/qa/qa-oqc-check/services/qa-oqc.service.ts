import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QaOqcService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getOqcMasterData(reqNo: string, qaCard: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/OqcCheck/MasterData?reqNo=${reqNo}&qaCard=${qaCard}`
    );
  }

  public getOqcRequests(filter: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filter).forEach(
      (key) => filter[key] && (params = params.append(key, filter[key]))
    );

    return this.httpClient.get(`${this.baseUrl}/QA/OqcCheck/Requests`, {
      params: params,
    });
  }

  public updateOqcRequest(oqcReqVo: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/QA/OqcCheck/Request`, oqcReqVo);
  }

  public getOqcDataFiles(filter: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filter).forEach(
      (key) => filter[key] && (params = params.append(key, filter[key]))
    );

    return this.httpClient.get(`${this.baseUrl}/QA/OqcCheck/OqcDataFiles`, {
      params: params,
    });
  }

  public downloadOqcDataFile(master: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/OqcCheck/DownloadOqcDataFile`,
      master,
      { responseType: 'blob' }
    );
  }

}
