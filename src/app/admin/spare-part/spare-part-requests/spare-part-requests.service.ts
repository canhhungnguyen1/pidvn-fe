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
  createRequest(partNoList: any, factoryCode: any, subsectionId: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/CreateRequest?factoryCode=${factoryCode}&subsectionId=${subsectionId}`,
      partNoList
    );
  }

  getSections(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/Sections`);
  }

  getSubsections(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/Subsections`);
  }

  getRequests(params: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/SparePart/SparePartRequestMasters`, params);
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


  deleteSparePartRequest(requestId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/SparePart/SparePartRequestMasters/${requestId}`);
  }



}
