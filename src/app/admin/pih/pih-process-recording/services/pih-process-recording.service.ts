import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PihProcessRecordingService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getLines(productId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/ProcessRecording/Lines?productId=${productId}`
    );
  }

  public insertCoil(scannerVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/ProcessRecording/InsertCoil`,
      scannerVo
    );
  }

  public getMaterials(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/ProcessRecording/Materials`,
      searchVo
    );
  }

  public changeLabel(scannerVo: any) {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/ProcessRecording/ChangeLabel`,
      scannerVo
    );
  }

  public changeModel(scannerVo: any) {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/ProcessRecording/ChangeModel`,
      scannerVo
    );
  }

  public scanCoil(params: any) {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/ProcessRecording/ScanCoil`,
      params
    );
  }

  public insertCoilManual(scannerVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/ProcessRecording/InsertCoilManual`,
      scannerVo
    );
  }
}
