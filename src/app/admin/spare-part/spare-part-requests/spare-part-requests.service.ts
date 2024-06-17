import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SparePartRequestsService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  /**
   *
   * @param partNoList
   * @returns
   */
  createRequest(partNoList: any, factoryCode: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/CreateRequest?factoryCode=${factoryCode}`,
      partNoList
    );
  }

  getSections(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/Sections`);
  }

  getRequests(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SparePartRequestMasters`);
  }

  getRequestDetail(requestId: any) : Observable<any> { 
    return this.httpClient.get(`${this.baseUrl}/SparePart/SparePartRequestDetail/${requestId}`);
  }

  public downloadM4M8Request(requestId: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/DownloadM4M8Request?requestId=${requestId}`,
      {},
      { responseType: 'blob' }
    );
  }
}
