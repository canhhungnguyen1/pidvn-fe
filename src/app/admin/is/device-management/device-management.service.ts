import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceManagementService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getDevices(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IS/DeviceManagement/Devices`,
      searchVo
    );
  }

  public getDeviceType(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IS/DeviceManagement/DeviceType`
    );
  }

  public getDeviceStatus(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IS/DeviceManagement/DeviceStatus`
    );
  }

  public createDevice(device: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IS/DeviceManagement/CreateDevice`,
      device
    );
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IS/DeviceManagement/Users`);
  }

  public handOverDevice(handOverInfo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IS/DeviceManagement/HandOverDevice`,
      handOverInfo
    );
  }

  public receiveDevice(receiveInfo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IS/DeviceManagement/ReceiveDevice`,
      receiveInfo
    );
  }

  public getHistories(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IS/DeviceManagement/Histories`,
      searchVo
    );
  }
}
