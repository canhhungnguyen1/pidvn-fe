import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RePrService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl = environment.baseUrl;

  public getRequests(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/ProcessRecording/Requests`);
  }

  public getRequestDetail(requestNo: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/ProcessRecording/Request?requestNo=${requestNo}`);
  }
}
