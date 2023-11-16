import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VrEncPRService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getModels(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/VrEncProcessRecording/Models`
    );
  }

  public getPartsByModel(model: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/VrEncProcessRecording/Parts?model=${model}`
    );
  }

  public getShifts() {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/VrEncProcessRecording/Shifts`
    );
  }

  public getLines(productId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/VrEncProcessRecording/Lines?productId=${productId}`
    );
  }

  public getCustomers() : Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/VrEncProcessRecording/Customers`
    );
  }

  public getQaCards(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/VrEncProcessRecording/QaCards`,
      searchVo
    );
  }

  public createQaCard(qaCardVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/VrEncProcessRecording/CreateQaCard`,
      qaCardVo
    );
  }

  public getProcesses(productTypeName: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/VrEncProcessRecording/Processes?productTypeName=${productTypeName}`
    );
  }

  public getProcessesVer2(line: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/VrEncProcessRecording/ProcessesVer2?line=${line}`
    );
  }

  public getMaterials(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/VrEncProcessRecording/Materials`,
      searchVo
    );
  }

  public scanLabel(scannerVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/VrEncProcessRecording/ScanLabel`,
      scannerVo
    );
  }

  public insertMaterials(materials: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/VrEncProcessRecording/InsertMaterials`,
      materials
    );
  }

  public updateMaterial(material: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/VrEncProcessRecording/UpdateMaterial`,
      material
    );
  }

  public downloadQaCard(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/VrEncProcessRecording/DownloadQaCard`,
      searchVo,
      { responseType: 'blob' }
    );
  }

  public traceability(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/VrEncProcessRecording/Traceability`,
      searchVo
    );
  }
}
