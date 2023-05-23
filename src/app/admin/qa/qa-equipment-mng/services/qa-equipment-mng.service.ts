import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QaEquipmentMngService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public downloadTemplateCreateLabel(): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Qa/EquipmentMng/TemplateCreateLabel`,{},{ responseType: 'blob' }
    );
  }

  public getQaDocDevices(deviceId: any) : Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Qa/EquipmentMng/QaDocDevices/${deviceId}`
    );
  }

  public getDocTypeDevices() : Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Entity/QaDocTypeDevices`
    );
  }

  public getQaDevices() : Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Entity/QaDevices`
    );
  }

  public getQaDeviceById(id: number) : Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Entity/QaDevices/${id}`
    );
  }

  public getByDeviceNo(deviceNo: string) : Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Entity/QaDevices/GetByDeviceNo?deviceNo=${deviceNo}`
    );
  }

  public previewFile(file: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/Qa/EquipmentMng/Preview`,
      file,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }

  
  public downloadDocument(file: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Qa/EquipmentMng/Download`,
      file,
      { responseType: 'blob' }
    );
  }

  public getDeviceInfo(controlNo: string) : Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Qa/EquipmentMng/DeviceInfo?controlNo=${controlNo}`
    );
  }

  /**
   * In tem
   */
  public printLabel(labels: any, userId: number): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Qa/EquipmentMng/PrintLabel?userId=${userId}`, labels
    );
  }
}
