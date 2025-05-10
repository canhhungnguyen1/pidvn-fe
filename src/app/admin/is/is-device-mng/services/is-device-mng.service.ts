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

  public getDevices(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IS/DeviceManagement/Devices`);
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IS/DeviceManagement/Users`);
  }
}
