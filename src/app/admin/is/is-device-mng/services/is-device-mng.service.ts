import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IsDeviceMngService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IS/DeviceManagement/Users`);
  }

  public getLocations(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IS/DeviceManagement/Locations`);
  }

  public getDevices(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IS/DeviceManagement/Devices`);
  }

  public getDevice(deviceName: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IS/DeviceManagement/Devices/${deviceName}`
    );
  }

  public getTransactions(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IS/DeviceManagement/Transactions`
    );
  }

  public saveTransaction(transaction: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IS/DeviceManagement/Transaction`,
      transaction
    );
  }

  public getInventoryRequests(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IS/DeviceManagement/Inventory/Requests`
    );
  }

  public createInventoryRequest(requestDto: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IS/DeviceManagement/Inventory/Request`,
      requestDto
    );
  }
}
