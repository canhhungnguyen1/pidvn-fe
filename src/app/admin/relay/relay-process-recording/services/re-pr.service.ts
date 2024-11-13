import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LotDto } from '../models/LotDto';
import { SearchDto } from '../models/SearchDto';

@Injectable({
  providedIn: 'root',
})
export class RePrService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl = environment.baseUrl;

  public getRequests(searchParam: SearchDto): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Relay/ProcessRecording/Requests`,searchParam);
  }

  public getRequestDetail(requestNo: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/ProcessRecording/Request?requestNo=${requestNo}`);
  }

  public onReceiveMaterials(lots: LotDto []): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Relay/ProcessRecording/ReceiveMaterials`, lots);
  }

  public validateLotReceive(lot: LotDto): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Relay/ProcessRecording/ValidateLotReceive`, lot);
  }

  public deleteLotReceived(lot: LotDto): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/Relay/ProcessRecording/DeleteLotReceived`, lot);
  }
  



}
