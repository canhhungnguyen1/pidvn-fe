import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LotDto } from '../models/LotDto';
import { Observable } from 'rxjs';
import { MaterialControlDto } from '../models/MaterialControlDto';

@Injectable({
  providedIn: 'root',
})
export class RePrScanToLineService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl = environment.baseUrl;

  public scanMaterial(lotDto: LotDto): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/ProcessRecording/ScanToLine/ScanMaterial`,
      lotDto
    );
  }

  public insertToLine(data: MaterialControlDto []): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/ProcessRecording/ScanToLine/InsertToLine`,
      data
    );
  }

  public getMaterialsInsertToLine(qaCard: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/ProcessRecording/ScanToLine/MaterialsInsertToLine?qaCard=${qaCard}`,
    );
  }


}
