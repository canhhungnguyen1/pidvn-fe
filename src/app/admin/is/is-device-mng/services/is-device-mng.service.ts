import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeviceDto } from '../models/DeviceDto';

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

  public saveInventoryData(ivtData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IS/DeviceManagement/Inventory/Data`,
      ivtData
    );
  }

  public getInventoryData(requestId: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IS/DeviceManagement/Inventory/Data?requestId=${requestId}`
    );
  }

  public createDevice(device: DeviceDto): Observable<DeviceDto> {
    return this.httpClient.post<DeviceDto>(
      `${this.baseUrl}/IS/DeviceManagement/Device`,
      device
    );
  }

  public updateDevice(device: DeviceDto): Observable<DeviceDto> {
    return this.httpClient.put<DeviceDto>(
      `${this.baseUrl}/IS/DeviceManagement/Device`,
      device
    );
  }

  public getLicenses(deviceName: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IS/DeviceManagement/Licenses?deviceName=${deviceName}`
    );
  }
}
