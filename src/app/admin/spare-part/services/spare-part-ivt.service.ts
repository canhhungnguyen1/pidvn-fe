import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SparePartIvtService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getInventoryRequests(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePartInventory/Requests`);
  }

  createInventoryRequest(ivtReq: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePartInventory/Request`,
      ivtReq
    );
  }

  getInventoryData(requestId: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/SparePartInventory/InventoryData?requestId=${requestId}`
    );
  }

  saveInventoryData(data: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePartInventory/InventoryData`,
      data
    );
  }

  updateInventoryData(obj: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/SparePartInventory/InventoryData`,
      obj
    );
  }
}
