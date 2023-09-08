import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PihInventoryService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getInventoryRequests(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/Requests`
    );
  }

  createInventoryRequest(request: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/Inventory/Request`,
      request
    );
  }


  saveListInventoryData(inventoryDataList: any) {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/Inventory/SaveListInventoryData`,
      inventoryDataList
    );
  }

  saveInventoryData(inventoryData: any) {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/Inventory/InventoryData`,
      inventoryData
    );
  }


  getInventoryData(requestId: any) {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/InventoryData?requestId=${requestId}`
    );
  }


  scanLabel(lotNo: any) {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/ScanLabel?lotNo=${lotNo}`
    );
  }
}
