import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QaIcpDataService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getModels(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/QA/ICP/Models`);
  }

  public getIcpData(parentModel: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/QA/ICP/IcpData?parentModel=${parentModel}`);
  }


  /**
   * Xem file Drawing
   * @param file
   * @returns
   */
  public previewFile(params: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/QA/ICP/Preview`,
      params,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }
}
