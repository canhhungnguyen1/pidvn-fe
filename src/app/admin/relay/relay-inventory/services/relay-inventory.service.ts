import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelayInventoryService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getInventoryRequests(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/Inventory/Requests`);
  }

  public getInventoryRequest(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/Inventory/Request/${id}`);
  }

  public scanMaterial(materialVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Inventory/ScanMaterial`,
      materialVo
    );
  }

  public getRelayInventories(reqNo: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Inventory/RelayInventories?reqNo=${reqNo}`
    );
  }

  public createInventoryRequest(requestVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Inventory/Request`,
      requestVo
    );
  }

  public saveRelayInventory(relayInventory: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Inventory/RelayInventory`,
      relayInventory
    );
  }

  public getBalances(reqId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Inventory/Balances?reqId=${reqId}`
    );
  }
  
}
